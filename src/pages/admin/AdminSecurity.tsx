import { Shield, AlertTriangle, Lock, Eye, UserX } from "lucide-react";

const ALERTS = [
  {
    id: "1",
    type: "warning",
    message: "Multiple failed login attempts for john@example.com",
    time: "5 mins ago",
    action: "Block Account",
  },
  {
    id: "2",
    type: "danger",
    message: "Suspicious large transfer of $50,000 flagged",
    time: "1 hour ago",
    action: "Review",
  },
  {
    id: "3",
    type: "info",
    message: "New admin login from unknown IP: 192.168.1.100",
    time: "2 hours ago",
    action: "Verify",
  },
  {
    id: "4",
    type: "warning",
    message: "Customer emily@example.com account suspended",
    time: "3 hours ago",
    action: "Review",
  },
];

const ALERT_CONFIG: Record<
  string,
  { color: string; bg: string; border: string }
> = {
  warning: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  danger: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
  },
  info: {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
  },
};

export default function AdminSecurity() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-heading font-black"
          style={{ color: "var(--text-primary)" }}
        >
          Security <span style={{ color: "#ef4444" }}>Center</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Monitor and respond to security threats
        </p>
      </div>

      {/* Security Score */}
      <div
        className="rounded-2xl p-6 flex items-center gap-6 relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at top right, rgba(239,68,68,0.08) 0%, transparent 60%), var(--bg-elevated)`,
          border: "1px solid rgba(239,68,68,0.15)",
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "3px solid #ef4444",
          }}
        >
          <Shield size={36} style={{ color: "#ef4444" }} />
        </div>
        <div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            System Security Score
          </p>
          <h2
            className="text-4xl font-heading font-black mt-1"
            style={{ color: "#ef4444" }}
          >
            92<span className="text-2xl">/100</span>
          </h2>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Excellent — All systems operational
          </p>
        </div>
      </div>

      {/* Security Alerts */}
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
          Security Alerts
        </h3>
        {ALERTS.map((alert) => {
          const cfg = ALERT_CONFIG[alert.type];
          return (
            <div
              key={alert.id}
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
            >
              <AlertTriangle
                size={18}
                style={{ color: cfg.color, flexShrink: 0 }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {alert.message}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {alert.time}
                </p>
              </div>
              <button
                className="px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-200 hover:scale-105"
                style={{
                  background: cfg.bg,
                  color: cfg.color,
                  border: `1px solid ${cfg.border}`,
                }}
              >
                {alert.action}
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: Lock,
            label: "Lock All Sessions",
            color: "#f59e0b",
            desc: "Force logout all users",
          },
          {
            icon: UserX,
            label: "Bulk Suspend",
            color: "#ef4444",
            desc: "Suspend flagged accounts",
          },
          {
            icon: Eye,
            label: "Audit Log",
            color: "#3b82f6",
            desc: "View complete audit trail",
          },
        ].map(({ icon: Icon, label, color, desc }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all duration-200 hover:scale-105 group"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: `${color}15` }}
            >
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <p
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {label}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                {desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
