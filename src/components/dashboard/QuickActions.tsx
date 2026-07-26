import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export interface QuickAction {
  icon: LucideIcon;
  label: string;
  path: string;
  color: string;
}

export interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="rounded-2xl p-5 bg-[var(--bg-elevated)] border border-[var(--border-primary)]">
      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
        Quick Actions
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map(({ icon: Icon, label, path, color }) => (
          <Link
            key={path}
            to={path}
            className="flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all duration-200 hover:scale-105"
            style={{ background: "var(--bg-hover)", border: "1px solid var(--border-primary)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${color}15`, color }}
            >
              <Icon size={18} />
            </div>
            <p className="text-xs font-medium text-center" style={{ color: "var(--text-secondary)" }}>
              {label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
