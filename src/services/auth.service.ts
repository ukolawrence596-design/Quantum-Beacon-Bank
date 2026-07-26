import { supabase } from "./api";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const SUPABASE_TIMEOUT = Number(import.meta.env.VITE_SUPABASE_TIMEOUT) || 30000;

function isRetryableError(error: unknown) {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return (
    message.includes("timed out") ||
    message.includes("network") ||
    message.includes("abort") ||
    message.includes("failed to fetch")
  );
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(
      () => reject(new Error(`${label} timed out. Please try again.`)),
      timeoutMs,
    );
  });

  try {
    return await Promise.race([promise, timeoutPromise]) as T;
  } finally {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  }
}

// ─── REGISTER ───────────────────────────────────────────────
export async function registerUser(data: RegisterData) {
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        role: "customer",
      },
    },
  });

  if (error) throw error;

  // Create profile record in the profiles table
  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: authData.user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        role: "customer",
        status: "active",
        balance: 0,
        avatar_url: "",
      },
    ]);

    if (profileError) {
      console.error("Profile creation error:", profileError);
      throw profileError;
    }
  }

  return authData;
}

// ─── LOGIN ──────────────────────────────────────────────────
export async function loginUser(data: LoginData) {
  const attemptLogin = () =>
    supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

  let result = (await withTimeout(attemptLogin(), SUPABASE_TIMEOUT, "Login")) as any;

  if (result?.error && isRetryableError(result.error)) {
    result = (await withTimeout(attemptLogin(), SUPABASE_TIMEOUT, "Login retry")) as any;
  }

  if (result?.error) throw result.error;
  if (!result?.data) throw new Error("Login failed. Please try again.");

  return result.data;
}

// ─── LOGOUT ─────────────────────────────────────────────────
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ─── GET CURRENT USER ────────────────────────────────────────
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// ─── GET PROFILE ─────────────────────────────────────────────
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

// ─── UPDATE PROFILE ──────────────────────────────────────────
export async function updateUserProfile(
  userId: string,
  updates: Record<string, unknown>,
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── FORGOT PASSWORD ─────────────────────────────────────────
export async function sendPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

// ─── RESET PASSWORD ──────────────────────────────────────────
export async function resetPassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
}

// ─── VERIFY OTP ──────────────────────────────────────────────
export async function verifyOTP(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });
  if (error) throw error;
  return data;
}

// ─── RESEND VERIFICATION / MAGIC LINK ───────────────────────
// Supabase doesn't expose a client-side "resend verification" for signup emails.
// As a practical alternative we send a magic link (OTP) to the user's email.
// This lets the user confirm ownership of the email and sign in.
export async function resendVerification(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });
  if (error) throw error;
  return data;
}
