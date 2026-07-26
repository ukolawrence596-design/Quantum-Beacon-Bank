import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export interface LoginFormProps {
  onSubmit?: (values: { email: string; password: string }) => Promise<void> | void;
  loading?: boolean;
  error?: string;
}

export default function LoginForm({ onSubmit, loading = false, error = "" }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit?.({ email, password });
  };

  return (
    <div
      className="rounded-3xl p-8 sm:p-10"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-primary)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-black mb-2" style={{ color: "#ccff00" }}>
          Login
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Welcome back! Please log in to access your account.
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl text-sm text-center" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
            <Mail size={16} />
          </div>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm transition-all duration-200"
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)", outline: "none" }}
            onFocus={(event) => {
              event.target.style.borderColor = "#ccff00";
              event.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.1)";
            }}
            onBlur={(event) => {
              event.target.style.borderColor = "var(--border-primary)";
              event.target.style.boxShadow = "none";
            }}
            required
          />
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
            <Lock size={16} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full pl-11 pr-12 py-3.5 rounded-full text-sm transition-all duration-200"
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)", outline: "none" }}
            onFocus={(event) => {
              event.target.style.borderColor = "#ccff00";
              event.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.1)";
            }}
            onBlur={(event) => {
              event.target.style.borderColor = "var(--border-primary)";
              event.target.style.boxShadow = "none";
            }}
            required
          />
          <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: "var(--text-muted)" }}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs font-medium underline underline-offset-2 transition-colors duration-200 hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
            Forgot Password?
          </Link>
        </div>

        <button type="submit" disabled={loading} className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ background: "#ccff00", color: "#0d0d0d", boxShadow: "0 0 20px rgba(204,255,0,0.3)" }}>
          {loading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#0d0d0d", borderTopColor: "transparent" }} />
              Logging in...
            </>
          ) : (
            <>
              Login
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <Link to="/register" className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 text-center" style={{ background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-primary)" }}>
          Sign Up
        </Link>
      </form>
    </div>
  );
}
