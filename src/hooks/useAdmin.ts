import { useAuth } from "../context/AuthContext";

export default function useAdmin() {
  const { isAdmin, isAuthenticated, loading, profile, signOut } = useAuth();

  return {
    isAdmin,
    isAuthenticated,
    loading,
    profile,
    signOut,
  };
}
