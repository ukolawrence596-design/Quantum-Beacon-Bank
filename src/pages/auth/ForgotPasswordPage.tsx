import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowRight, KeyRound } from "lucide-react";
import { sendPasswordReset } from "../../services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to send reset email";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = () => {
    navigate("/otp-verification");
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
                <KeyRound size={40} style={{ color: "#ccff00" }} />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1
                className="text-3xl font-heading font-black mb-2"
                style={{ color: "#ccff00" }}
              >
                Forgot Password
              </h1>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {sent
                  ? `We've sent a password reset OTP to ${email}. Please check your inbox.`
                  : "Enter your registered email address and we'll send you a one-time password to reset your account."}
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

            {/* BEFORE SENT — Email Form */}
            {!sent && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Email Input */}
                <div className="relative">
                  <div
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm transition-all duration-200"
                    style={{
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#ccff00";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(204,255,0,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-primary)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

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
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                {/* Back to login */}
                <Link
                  to="/login"
                  className="w-full py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center"
                  style={{
                    background: "transparent",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  Back to Login
                </Link>
              </form>
            )}

            {/* AFTER SENT — Success State */}
            {sent && (
              <div className="flex flex-col gap-4">
                {/* Success Card */}
                <div
                  className="rounded-2xl p-5 flex flex-col items-center gap-3 text-center"
                  style={{
                    background: "rgba(34,197,94,0.05)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(34,197,94,0.1)" }}
                  >
                    <Mail size={22} style={{ color: "#22c55e" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ color: "#22c55e" }}
                    >
                      OTP Sent Successfully!
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Check your inbox at{" "}
                      <span
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {email}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Steps */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  <p
                    className="text-xs font-semibold mb-3 uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Next Steps
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      "Check your email inbox for the OTP",
                      "Enter the 6-digit code on the next page",
                      "Create your new password",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{
                            background: "#ccff00",
                            color: "#0d0d0d",
                          }}
                        >
                          {i + 1}
                        </div>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verify OTP Button */}
                <button
                  onClick={handleVerifyOTP}
                  className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{
                    background: "#ccff00",
                    color: "#0d0d0d",
                    boxShadow: "0 0 20px rgba(204,255,0,0.3)",
                  }}
                >
                  Enter OTP
                  <ArrowRight size={16} />
                </button>

                {/* Resend & change email */}
                <div className="flex items-center justify-center gap-4 text-xs">
                  <button
                    onClick={() => setSent(false)}
                    className="hover:underline transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Change Email
                  </button>
                  <span style={{ color: "var(--border-secondary)" }}>|</span>
                  <button
                    onClick={handleSubmit as any}
                    className="hover:underline transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom note */}
          <p
            className="text-center text-xs mt-6"
            style={{ color: "var(--text-muted)" }}
          >
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold hover:underline"
              style={{ color: "#ccff00" }}
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
