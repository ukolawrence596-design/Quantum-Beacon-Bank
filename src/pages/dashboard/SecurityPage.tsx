import { useState } from "react";
import {
  Shield,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  LogOut,
} from "lucide-react";

export default function DashboardSecurityPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSaved(false), 3000);
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

  const ACTIVE_SESSIONS = [
    {
      device: "Chrome on Windows",
      location: "New York, US",
      time: "Active now",
      current: true,
    },
    {
      device: "Safari on iPhone",
      location: "New York, US",
      time: "2 hours ago",
      current: false,
    },
    {
      device: "Firefox on MacOS",
      location: "Chicago, US",
      time: "3 days ago",
      current: false,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-heading font-black"
          style={{ color: "var(--text-primary)" }}
        >
          Account <span style={{ color: "#ccff00" }}>Security</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage your security settings and active sessions
        </p>
      </div>

      {/* Security Score */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: `radial-gradient(
            ellipse at top right,
            rgba(204,255,0,0.08) 0%,
            transparent 60%
          ), var(--bg-elevated)`,
          border: "1px solid rgba(204,255,0,0.15)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Security Score
            </p>
            <h2
              className="text-4xl font-heading font-black mt-1"
              style={{ color: "#ccff00" }}
            >
              85<span className="text-2xl">/100</span>
            </h2>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Good — Enable 2FA for maximum security
            </p>
          </div>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(204,255,0,0.1)",
              border: "3px solid #ccff00",
            }}
          >
            <Shield size={36} style={{ color: "#ccff00" }} />
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="mt-4 w-full h-2 rounded-full overflow-hidden"
          style={{ background: "var(--bg-hover)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: "85%",
              background: "linear-gradient(90deg, #ccff00, #a0cc00)",
            }}
          />
        </div>
      </div>

      {/* Change Password */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-5"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(204,255,0,0.1)" }}
          >
            <Lock size={18} style={{ color: "#ccff00" }} />
          </div>
          <div>
            <h3
              className="font-heading font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Change Password
            </h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Last changed 3 months ago
            </p>
          </div>
        </div>

        {saved && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm animate-fade-in-down"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#22c55e",
            }}
          >
            <Check size={14} />
            Password changed successfully!
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          {[
            {
              field: "currentPassword",
              label: "Current Password",
              show: showCurrent,
              toggle: setShowCurrent,
            },
            {
              field: "newPassword",
              label: "New Password",
              show: showNew,
              toggle: setShowNew,
            },
            {
              field: "confirmPassword",
              label: "Confirm Password",
              show: showConfirm,
              toggle: setShowConfirm,
            },
          ].map(({ field, label, show, toggle }) => (
            <div key={field} className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type={show ? "text" : "password"}
                  value={form[field as keyof typeof form]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [field]: e.target.value }))
                  }
                  placeholder={label}
                  className="w-full pl-11 pr-12 py-3.5 rounded-full text-sm"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => toggle((p: boolean) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 disabled:opacity-70 w-fit"
            style={{
              background: "#ccff00",
              color: "#0d0d0d",
              boxShadow: "0 0 15px rgba(204,255,0,0.2)",
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
                Updating...
              </>
            ) : (
              <>
                <Lock size={14} />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>

      {/* Security Settings */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h3
          className="font-heading font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Security Settings
        </h3>

        {[
          {
            icon: Smartphone,
            label: "Two-Factor Authentication",
            description: "Add an extra layer of security to your account",
            enabled: twoFA,
            toggle: () => setTwoFA((p) => !p),
          },
          {
            icon: AlertTriangle,
            label: "Login Alerts",
            description: "Get notified of new login attempts",
            enabled: loginAlerts,
            toggle: () => setLoginAlerts((p) => !p),
          },
        ].map(({ icon: Icon, label, description, enabled, toggle }) => (
          <div
            key={label}
            className="flex items-center justify-between py-4"
            style={{ borderBottom: "1px solid var(--border-primary)" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: enabled
                    ? "rgba(204,255,0,0.1)"
                    : "var(--bg-hover)",
                }}
              >
                <Icon
                  size={18}
                  style={{ color: enabled ? "#ccff00" : "var(--text-muted)" }}
                />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {label}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {description}
                </p>
              </div>
            </div>

            {/* Toggle */}
            <button
              onClick={toggle}
              className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
              style={{
                background: enabled ? "#ccff00" : "var(--bg-hover)",
                border: enabled ? "none" : "1px solid var(--border-primary)",
              }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300"
                style={{
                  background: enabled ? "#0d0d0d" : "var(--text-muted)",
                  left: enabled ? "26px" : "2px",
                }}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Active Sessions */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <div className="flex items-center justify-between">
          <h3
            className="font-heading font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Active Sessions
          </h3>
          <button
            className="text-xs font-semibold transition-colors duration-200"
            style={{ color: "#ef4444" }}
          >
            Revoke All
          </button>
        </div>

        {ACTIVE_SESSIONS.map((session, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3"
            style={{
              borderBottom:
                i < ACTIVE_SESSIONS.length - 1
                  ? "1px solid var(--border-primary)"
                  : "none",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: session.current
                    ? "rgba(204,255,0,0.1)"
                    : "var(--bg-hover)",
                }}
              >
                <Smartphone
                  size={16}
                  style={{
                    color: session.current ? "#ccff00" : "var(--text-muted)",
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {session.device}
                  </p>
                  {session.current && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: "rgba(34,197,94,0.1)",
                        color: "#22c55e",
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {session.location} • {session.time}
                </p>
              </div>
            </div>
            {!session.current && (
              <button
                className="text-xs font-semibold transition-colors duration-200 hover:opacity-80"
                style={{ color: "#ef4444" }}
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
