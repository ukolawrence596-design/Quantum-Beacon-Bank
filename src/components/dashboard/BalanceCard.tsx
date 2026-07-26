import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export interface BalanceCardProps {
  balance: number;
  accountNumber: string;
  income?: number;
  expenses?: number;
  hideBalance?: boolean;
  onToggleHide?: () => void;
}

export default function BalanceCard({
  balance,
  accountNumber,
  income = 0,
  expenses = 0,
  hideBalance = false,
  onToggleHide,
}: BalanceCardProps) {
  const maskedAccount = accountNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at top right, rgba(204,255,0,0.15) 0%, transparent 60%), var(--bg-elevated)`,
        border: "1px solid rgba(204,255,0,0.22)",
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Total Balance
        </p>
        <button type="button" onClick={onToggleHide} style={{ color: "var(--text-muted)" }}>
          {hideBalance ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div>
        <h2 className="text-4xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
          {hideBalance ? "••••••" : formatCurrency(balance)}
        </h2>
        <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#22c55e" }}>
          <TrendingUp size={12} /> Account Active
        </p>
      </div>

      <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "var(--bg-hover)" }}>
        <div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Account Number
          </p>
          <p className="text-sm font-semibold tracking-wider mt-0.5" style={{ color: "var(--text-primary)" }}>
            {hideBalance ? "•••• •••• ••••" : maskedAccount}
          </p>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
          Active
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 p-3 rounded-xl" style={{ background: "rgba(34,197,94,0.08)" }}>
          <div className="flex items-center gap-1">
            <ArrowDownLeft size={14} style={{ color: "#22c55e" }} />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Income
            </p>
          </div>
          <p className="text-sm font-bold" style={{ color: "#22c55e" }}>
            {hideBalance ? "••••" : formatCurrency(income)}
          </p>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.08)" }}>
          <div className="flex items-center gap-1">
            <ArrowUpRight size={14} style={{ color: "#ef4444" }} />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Expenses
            </p>
          </div>
          <p className="text-sm font-bold" style={{ color: "#ef4444" }}>
            {hideBalance ? "••••" : formatCurrency(expenses)}
          </p>
        </div>
      </div>
    </div>
  );
}
