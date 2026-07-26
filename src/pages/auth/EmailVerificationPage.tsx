import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyOTP, getCurrentUser } from "../../services/auth.service";
import { APP_CONFIG } from "../../constants/config";

export default function EmailVerificationPage() {
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email") || undefined;
  const token = searchParams.get("token") || undefined;

  useEffect(() => {
    // If token+email provided in query, attempt to verify automatically
    if (token && email) {
      setLoading(true);
      setError("");
      void verifyOTP(email, token)
        .then(() => setVerified(true))
        .catch((err) => setError(err?.message || "Verification failed"))
        .finally(() => setLoading(false));
    }
  }, [token, email]);

  // cooldown countdown for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const handleCheckStatus = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await getCurrentUser();
      if (user && (user.email_confirmed_at || user.confirmed_at)) {
        setVerified(true);
      } else {
        setError("Email not verified yet. Please check your inbox.");
      }
    } catch (err: any) {
      setError(err?.message || "Unable to check verification status");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("No email available to resend to.");
      return;
    }
    if (cooldown > 0) return;
    setLoading(true);
    setError("");
    try {
      await (await import("../../services/auth.service")).resendVerification(email);
      setResent(true);
      setCooldown(60);
    } catch (err: any) {
      setError(err?.message || "Unable to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 p-8" style={{ color: "var(--text-primary)" }}>
      <div className="max-w-md mx-auto rounded-2xl p-8" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)" }}>
        <h1 className="text-2xl font-heading font-black mb-2">Verify your email</h1>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          We sent a verification link to your email. Click the link to confirm your address and complete registration.
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm text-center" style={{ background: "rgba(239,68,68,0.06)", color: "#ef4444" }}>
            {error}
          </div>
        )}

        {/* Show target email */}
        {email && (
          <div className="mb-3 text-sm text-center" style={{ color: "var(--text-secondary)" }}>
            We sent the link to <strong>{maskEmail(email)}</strong>
          </div>
        )}

        {verified ? (
          <div className="p-4 rounded-lg text-center" style={{ background: "rgba(34,197,94,0.06)", color: "#16a34a" }}>
            <p className="font-semibold">Your email is verified.</p>
            <div className="mt-4 flex gap-3">
              <button onClick={() => navigate("/login")} className="px-4 py-2 rounded-full font-bold w-full" style={{ background: "#ccff00" }}>
                Continue to login
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button onClick={handleCheckStatus} disabled={loading} className="px-4 py-2 rounded-full font-bold w-full" style={{ background: "#ef4444", color: "#fff" }}>
              {loading ? "Checking..." : "I clicked the verification link"}
            </button>

            <div>
              <button onClick={handleResend} disabled={loading || cooldown > 0} className="px-4 py-2 rounded-full w-full" style={{ background: "transparent", border: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}>
                {loading ? "Sending..." : cooldown > 0 ? `Resend available in ${cooldown}s` : "Resend verification email"}
              </button>
              {resent && (
                <div className="mt-3 p-3 rounded-lg text-center text-sm" style={{ background: "rgba(34,197,94,0.04)", color: "#16a34a" }}>
                  We sent a magic sign-in link to <strong>{email}</strong>. Check your inbox and spam folder. The link expires in {APP_CONFIG.otpExpiryMinutes} minutes.
                </div>
              )}
            </div>

            <button onClick={() => navigate('/')} className="px-4 py-2 rounded-full w-full" style={{ background: "transparent", border: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}>
              Back to home
            </button>
            <div className="text-center text-xs mt-3" style={{ color: "var(--text-muted)" }}>
              If you still don't receive an email, contact <a href={`mailto:${APP_CONFIG.supportEmail}`} className="underline">{APP_CONFIG.supportEmail}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.length <= 2 ? local : `${local.slice(0, 1)}${"*".repeat(Math.max(0, local.length - 2))}${local.slice(-1)}`;
  return `${visible}@${domain}`;
}
