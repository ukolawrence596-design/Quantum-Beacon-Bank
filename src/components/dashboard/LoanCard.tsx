import { ArrowRight, Clock } from "lucide-react";

export interface LoanCardProps {
  title: string;
  amount: number;
  rate: string;
  term: string;
  dueDate?: string;
  status?: string;
  onApply?: () => void;
}

export default function LoanCard({ title, amount, rate, term, dueDate, status, onApply }: LoanCardProps) {
  return (
    <div className="rounded-3xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
            {title}
          </p>
          <p className="text-3xl font-heading font-black mt-2" style={{ color: "var(--text-primary)" }}>
            ${amount.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl px-3 py-2 text-xs font-semibold" style={{ background: "rgba(204,255,0,0.12)", color: "#ccff00" }}>
          {status ?? "Available"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
        <div>
          <p className="text-[var(--text-muted)]">Rate</p>
          <p className="font-semibold text-[var(--text-primary)]">{rate}</p>
        </div>
        <div>
          <p className="text-[var(--text-muted)]">Term</p>
          <p className="font-semibold text-[var(--text-primary)]">{term}</p>
        </div>
      </div>

      {dueDate && (
        <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          <Clock size={16} />
          <span>Next payment due {dueDate}</span>
        </div>
      )}

      <button
        type="button"
        onClick={onApply}
        className="mt-6 w-full rounded-full py-3.5 text-sm font-bold transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
        style={{ background: "#ccff00", color: "#0d0d0d" }}
      >
        Apply Now
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
