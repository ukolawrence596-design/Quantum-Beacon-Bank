import { BarChart3, Clock3, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  accent?: string;
}

export interface StatsWidgetProps {
  title?: string;
  subtitle?: string;
  items?: StatItem[];
}

const fallbackItems: StatItem[] = [
  { label: "Customers", value: "1.2k", icon: Users, color: "#3b82f6" },
  { label: "Volume", value: "$48.2k", icon: BarChart3, color: "#22c55e" },
  { label: "Pending", value: "14", icon: Clock3, color: "#f59e0b" },
];

export default function StatsWidget({
  title = "Quick stats",
  subtitle = "At a glance",
  items,
}: StatsWidgetProps) {
  const statItems = items?.length ? items : fallbackItems;

  return (
    <div
      className="rounded-3xl p-6 flex flex-col gap-4"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-primary)",
      }}
    >
      <div>
        <h3
          className="font-heading font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {subtitle}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {statItems.map(({ label, value, icon: Icon, color = "#ef4444" }) => (
          <div
            key={label}
            className="rounded-2xl p-4"
            style={{
              background: "var(--bg-hover)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <div className="flex items-center justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${color}18`,
                  color,
                }}
              >
                <Icon size={18} />
              </div>

              <span
                className="text-xs uppercase tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </span>
            </div>

            <p
              className="mt-4 text-xl font-heading font-black"
              style={{ color: "var(--text-primary)" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
