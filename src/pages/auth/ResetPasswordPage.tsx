import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";

const PASSWORD_CHECKS = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  {
    label: "One special character",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const allPassed = PASSWORD_CHECKS.every((c) => c.test(password));
    if (!allPassed) {
      setError("Password does not meet all requirements");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    }, 1500);
  };

  const inputStyle = {
    background: "var(--bg-input)",
    border: "1px solid var(--border-primary)",
    color: "var(--text-primary)",
    outline: "none",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#ccff00";
    e.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.1)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "var(--border-primary)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#ccff00" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-5 blur-3xl"
          style={{ background: "#ccff00" }}
        />
        <div
          className="absolute top-20 left-20 w-64 h-64 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
            maskImage:
              "radial-gradient(ellipse at top left, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top left, black 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Top Bar */}
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

        <Link
          to="/login"
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--text-secondary)" }}
        >
          Back to Login
        </Link>
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
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center animate-float"
                style={{
                  background: "rgba(204,255,0,0.1)",
                  border: "1px solid rgba(204,255,0,0.2)",
                }}
              >
                <Lock size={40} style={{ color: "#ccff00" }} />
              </div>
            </div>

            {/* Success State */}
            {success ? (
              <div className="text-center flex flex-col items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(34,197,94,0.1)" }}
                >
                  <Check size={32} style={{ color: "#22c55e" }} />
                </div>
                <h2
                  className="text-2xl font-heading font-black"
                  style={{ color: "#22c55e" }}
                >
                  Password Reset!
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Your password has been successfully reset. Redirecting you to
                  login...
                </p>
                <div
                  className="w-8 h-8 rounded-full border-2 animate-spin mt-2"
                  style={{
                    borderColor: "#ccff00",
                    borderTopColor: "transparent",
                  }}
                />
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <h1
                    className="text-3xl font-heading font-black mb-2"
                    style={{ color: "#ccff00" }}
                  >
                    Reset Password
                  </h1>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Create a new strong password for your account
                  </p>
                </div>

                {/* Error */}
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* New Password */}
                  <div className="relative">
                    <div
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Lock size={15} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className="w-full pl-11 pr-12 py-3.5 rounded-full text-sm"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Password Checklist */}
                  {password.length > 0 && (
                    <div
                      className="rounded-2xl p-4 flex flex-col gap-2"
                      style={{
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-primary)",
                      }}
                    >
                      {PASSWORD_CHECKS.map((check) => (
                        <div
                          key={check.label}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                            style={{
                              background: check.test(password)
                                ? "#ccff00"
                                : "var(--bg-elevated)",
                              border: check.test(password)
                                ? "none"
                                : "1px solid var(--border-secondary)",
                            }}
                          >
                            {check.test(password) && (
                              <Check
                                size={10}
                                color="#0d0d0d"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                          <span
                            style={{
                              color: check.test(password)
                                ? "var(--text-primary)"
                                : "var(--text-muted)",
                            }}
                          >
                            {check.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Confirm Password */}
                  <div className="relative">
                    <div
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Lock size={15} />
                    </div>
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      className="w-full pl-11 pr-12 py-3.5 rounded-full text-sm"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Password Match */}
                  {confirmPassword.length > 0 && (
                    <p
                      className="text-xs flex items-center gap-1"
                      style={{
                        color:
                          password === confirmPassword ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {password === confirmPassword
                        ? "✓ Passwords match"
                        : "✗ Passwords do not match"}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                    style={{
                      background: "#ccff00",
                      color: "#0d0d0d",
                      boxShadow: "0 0 20px rgba(204,255,0,0.3)",
                    }}
                  >
                    {loading ? (
                      <>
                        <div
                          className="w-4 h-4 rounded-full border-2 animate-spin"
                          style={{
                            borderColor: "#0d0d0d",
                            borderTopColor: "transparent",
                          }}
                        />
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
