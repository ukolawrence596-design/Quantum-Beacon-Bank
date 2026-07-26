import { useEffect, useRef, useState } from "react";
import { ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";

export interface OTPInputProps {
  length?: number;
  loading?: boolean;
  resending?: boolean;
  error?: string;
  success?: string;
  countdown?: number;
  canResend?: boolean;
  onVerify?: (code: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
}

export default function OTPInput({ length = 6, loading = false, resending = false, error = "", success = "", countdown = 0, canResend = false, onVerify, onResend }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      const digits = value.slice(0, length).split("");
      digits.forEach((digit, offset) => {
        if (index + offset < length) newOtp[index + offset] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
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
    if (event.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="rounded-3xl p-8 sm:p-10" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)", boxShadow: "var(--shadow-elevated)" }}>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center animate-float" style={{ background: "rgba(204,255,0,0.1)", border: "1px solid rgba(204,255,0,0.2)" }}>
          <ShieldCheck size={40} style={{ color: "#ccff00" }} />
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-black mb-2" style={{ color: "#ccff00" }}>
          Verify OTP
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          We&apos;ve sent a {length}-digit verification code to your email address. Please enter it below to verify your account.
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl text-sm text-center" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 px-4 py-3 rounded-xl text-sm text-center" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
          {success}
        </div>
      )}

      <div className="flex items-center justify-center gap-3 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            className="w-12 h-14 text-center text-xl font-black rounded-2xl transition-all duration-200"
            style={{
              background: "var(--bg-input)",
              border: digit ? "2px solid #ccff00" : "1px solid var(--border-primary)",
              color: "var(--text-primary)",
              outline: "none",
              boxShadow: digit ? "0 0 10px rgba(204,255,0,0.2)" : "none",
            }}
            onFocus={(event) => {
              event.target.style.borderColor = "#ccff00";
              event.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.15)";
            }}
            onBlur={(event) => {
              event.target.style.borderColor = digit ? "#ccff00" : "var(--border-primary)";
              event.target.style.boxShadow = digit ? "0 0 10px rgba(204,255,0,0.2)" : "none";
            }}
          />
        ))}
      </div>

      <button onClick={() => void onVerify?.(otp.join(""))} disabled={loading || !isComplete} className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4" style={{ background: "#ccff00", color: "#0d0d0d", boxShadow: isComplete ? "0 0 20px rgba(204,255,0,0.3)" : "none" }}>
        {loading ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: "#0d0d0d", borderTopColor: "transparent" }} />
            Verifying...
          </>
        ) : (
          <>
            Verify OTP
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <div className="text-center">
        <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
          Didn&apos;t receive the code?
        </p>
        <button onClick={() => void onResend?.()} disabled={!canResend || resending} className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" style={{ color: canResend ? "#ccff00" : "var(--text-muted)" }}>
          <RefreshCw size={14} className={resending ? "animate-spin" : ""} />
          {canResend ? (resending ? "Sending..." : "Resend OTP") : `Resend in ${countdown}s`}
        </button>
      </div>

      <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
        This OTP expires in <span style={{ color: "#ccff00" }}>10 minutes</span>
      </p>
    </div>
  );
}
