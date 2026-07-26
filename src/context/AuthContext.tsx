import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "../services/api";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  account_number: string;
  balance: number;
  role: string;
  status: string;
  avatar_url: string;
  account_type?: string;
  created_at?: string;
  address?: string;
  date_of_birth?: string;
  occupation?: string;
  nationality?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  profileLoading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      setProfileLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('fetchProfile error:', error.message)
        return
      }

      console.log('✅ Profile loaded — Balance:', data?.balance, '| Role:', data?.role)
      setProfile(data)
    } catch (e) {
      console.error('fetchProfile exception:', e)
    }
    finally {
      setProfileLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  }, []);

  useEffect(() => {
    let ignore = false;
    let profileChannel: any;

    const subscribeToProfile = async (userId: string) => {
      if (profileChannel) {
        supabase.removeChannel(profileChannel);
      }
      profileChannel = supabase
        .channel(`profile-changes-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${userId}`,
          },
          async () => {
            if (!ignore) await fetchProfile(userId);
          },
        )
        .subscribe();
    };

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (ignore) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
        await subscribeToProfile(session.user.id);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (ignore) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
        await subscribeToProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    const timer = setTimeout(() => {
      if (!ignore) setLoading(false);
    }, 5000);

    return () => {
      ignore = true;
      subscription.unsubscribe();
      if (profileChannel) supabase.removeChannel(profileChannel);
      clearTimeout(timer);
    };
  }, [fetchProfile]);

  const isAdmin = profile?.role === "admin";

  console.log(
    "Auth state → isAdmin:",
    isAdmin,
    "| role:",
    profile?.role,
    "| loading:",
    loading,
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        profileLoading,
        isAdmin,
        isAuthenticated: !!user && !!profile,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
