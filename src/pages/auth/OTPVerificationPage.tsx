import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";

const OTP_LENGTH = 6;

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setError("");

    const newOtp = [...otp];

    // Handle paste
    if (value.length > 1) {
      const digits = value.slice(0, OTP_LENGTH).split("");
      digits.forEach((d, i) => {
        if (index + i < OTP_LENGTH) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Auto advance to next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }
    setError("");
    setLoading(true);
    // Real verification connected when Supabase is set up
    setTimeout(() => {
      setLoading(false);
      setSuccess("Account verified successfully!");
      setTimeout(() => navigate("/reset-password"), 1500);
    }, 1500);
  };

  const handleResend = async () => {
    if (!canResend) return;
    setResending(true);
    setError("");
    setSuccess("");
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    setTimeout(() => {
      setResending(false);
      setCountdown(60);
      setCanResend(false);
      setSuccess("A new OTP has been sent to your email!");
      setTimeout(() => setSuccess(""), 3000);
    }, 1000);
  };

  const isComplete = otp.every((d) => d !== "");

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
                <ShieldCheck size={40} style={{ color: "#ccff00" }} />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1
                className="text-3xl font-heading font-black mb-2"
                style={{ color: "#ccff00" }}
              >
                Verify OTP
              </h1>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                We've sent a 6-digit verification code to your email address.
                Please enter it below to verify your account.
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

            {/* Success Message */}
            {success && (
              <div
                className="mb-6 px-4 py-3 rounded-xl text-sm text-center"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  color: "#22c55e",
                }}
              >
                {success}
              </div>
            )}

            {/* OTP Input Boxes */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-black rounded-2xl transition-all duration-200"
                  style={{
                    background: "var(--bg-input)",
                    border: digit
                      ? "2px solid #ccff00"
                      : "1px solid var(--border-primary)",
                    color: "var(--text-primary)",
                    outline: "none",
                    boxShadow: digit ? "0 0 10px rgba(204,255,0,0.2)" : "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ccff00";
                    e.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = digit
                      ? "#ccff00"
                      : "var(--border-primary)";
                    e.target.style.boxShadow = digit
                      ? "0 0 10px rgba(204,255,0,0.2)"
                      : "none";
                  }}
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={loading || !isComplete}
              className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
              style={{
                background: "#ccff00",
                color: "#0d0d0d",
                boxShadow: isComplete ? "0 0 20px rgba(204,255,0,0.3)" : "none",
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
                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Resend OTP */}
            <div className="text-center">
              <p
                className="text-sm mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={!canResend || resending}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: canResend ? "#ccff00" : "var(--text-muted)" }}
              >
                <RefreshCw
                  size={14}
                  className={resending ? "animate-spin" : ""}
                />
                {canResend
                  ? resending
                    ? "Sending..."
                    : "Resend OTP"
                  : `Resend in ${countdown}s`}
              </button>
            </div>

            {/* Expiry note */}
            <p
              className="text-center text-xs mt-6"
              style={{ color: "var(--text-muted)" }}
            >
              This OTP expires in{" "}
              <span style={{ color: "#ccff00" }}>10 minutes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
