import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (values: { email: string; password: string }) => {
    setError("");

    if (!values.email || !values.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { loginUser } = await import("../../services/auth.service");

      const data = await loginUser({ email: values.email, password: values.password });

      console.log("login response:", data);

      if (data?.user) {
        try {
          const { getUserProfile } = await import("../../services/auth.service");
          const profile = await getUserProfile(data.user.id);

          if (profile?.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        } catch (profileErr) {
          console.error("Failed to load profile after login:", profileErr);
          navigate("/dashboard");
        }
      } else {
        setError("Login failed: no user returned from authentication.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed'
      if (message.includes('timed out') || message.includes('abort') || message.includes('network')) {
        setError('Connection timed out. Your Supabase project may be paused. Please visit supabase.com to restore it, then try again.')
      } else if (message.includes('Invalid login') || message.includes('invalid_credentials')) {
        setError('Invalid email or password')
      } else if (message.includes('Email not confirmed')) {
        setError('Please verify your email before logging in')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#ccff00" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-5 blur-3xl"
          style={{ background: "#ccff00" }}
        />
        <div
          className="absolute top-20 right-20 w-64 h-64 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
            maskImage:
              "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Navbar top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <img src="/logo.png" alt="QB" className="w-7 h-7 object-contain" />
          </div>
          <span
            className="font-heading font-bold text-base hidden sm:block"
            style={{ color: "var(--text-primary)" }}
          >
            Quantum <span style={{ color: "#ccff00" }}>Beacon</span> Bank
          </span>
        </Link>

        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold hover:underline"
            style={{ color: "#ccff00" }}
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div
            className="rounded-3xl p-8 sm:p-10"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1
                className="text-3xl font-heading font-black mb-2"
                style={{ color: "#ccff00" }}
              >
                Login
              </h1>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Welcome back! Please log in to access your account.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="mb-6 px-4 py-3 rounded-xl text-sm text-center"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#ef4444",
                }}
              >
                {error}
              </div>
            )}

            <LoginForm onSubmit={handleLoginSubmit} loading={loading} error={error} />

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div
                className="flex-1 h-px"
                style={{ background: "var(--border-primary)" }}
              />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                Or Continue with
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "var(--border-primary)" }}
              />
            </div>

            {/* Social Login */}
            <div className="flex items-center justify-center gap-4">
              <button
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>

              <button
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              <button
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-primary)",
                  color: "var(--text-primary)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
