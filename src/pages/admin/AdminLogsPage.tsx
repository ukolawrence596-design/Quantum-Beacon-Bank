import { useState, useEffect } from "react";
import {
  FileText,
  ArrowLeftRight,
  Shield,
  Settings,
  DollarSign,
  Landmark,
} from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate";
import { supabase } from "../../services/api";

const TYPE_CONFIG: Record<
  string,
  { color: string; bg: string; icon: typeof FileText }
> = {
  transfer: {
    color: "#ccff00",
    bg: "rgba(204,255,0,0.1)",
    icon: ArrowLeftRight,
  },
  topup: { color: "#22c55e", bg: "rgba(34,197,94,0.1)", icon: DollarSign },
  loan: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: Landmark },
  security: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: Shield },
  settings: { color: "#a855f7", bg: "rgba(168,85,247,0.1)", icon: Settings },
  info: { color: "#6b7280", bg: "rgba(107,114,128,0.1)", icon: FileText },
  card: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: FileText },
};

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);

      // Load notifications as activity logs (these are real system events)
      const { data: notifications } = await supabase
        .from("notifications")
        .select(
          `
          *,
          profile:profiles!notifications_user_id_fkey(first_name, last_name, email)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(100);

      setLogs(notifications || []);
    } catch (err) {
      console.error("Load logs error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    filter === "all" ? logs : logs.filter((l) => l.type === filter);

  const types = ["all", ...new Set(logs.map((l) => l.type))];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Activity <span style={{ color: "#ef4444" }}>Logs</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Real-time system activity and notifications
          </p>
        </div>
        <button
          onClick={loadLogs}
          className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-primary)",
          }}
        >
          ↻ Refresh
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className="px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all duration-200"
            style={{
              background: filter === type ? "#ef4444" : "var(--bg-elevated)",
              color: filter === type ? "#ffffff" : "var(--text-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Logs List */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 rounded-xl skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <FileText size={40} style={{ color: "var(--text-muted)" }} />
            <p
              className="font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              No activity logs yet
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              System activity will appear here as customers use the app
            </p>
          </div>
        ) : (
          filtered.map((log, index) => {
            const cfg = TYPE_CONFIG[log.type] || TYPE_CONFIG.info;
            const Icon = cfg.icon;
            return (
              <div
                key={log.id}
                className="flex items-center gap-4 px-6 py-4 transition-all duration-200 hover:bg-[var(--bg-hover)]"
                style={{
                  borderBottom:
                    index < filtered.length - 1
                      ? "1px solid var(--border-primary)"
                      : "none",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  <Icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {log.title}
                    </p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {log.type}
                    </span>
                  </div>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {log.message}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {log.profile
                      ? `${log.profile.first_name} ${log.profile.last_name} — ${log.profile.email}`
                      : "System"}{" "}
                    • {formatRelativeTime(log.created_at)}
                  </p>
                </div>
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: log.read
                      ? "var(--border-secondary)"
                      : cfg.color,
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
