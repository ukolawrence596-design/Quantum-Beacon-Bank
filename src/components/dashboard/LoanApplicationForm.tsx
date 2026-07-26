import { useState } from "react";
import { ArrowRight } from "lucide-react";

export interface LoanApplicationData {
  amount: string;
  term: string;
  purpose: string;
}

export interface LoanApplicationFormProps {
  loading?: boolean;
  error?: string;
  onSubmit?: (values: LoanApplicationData) => void;
}

export default function LoanApplicationForm({ loading = false, error = "", onSubmit }: LoanApplicationFormProps) {
  const [form, setForm] = useState<LoanApplicationData>({ amount: "", term: "12", purpose: "" });

  return (
    <div className="rounded-3xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-primary)]">
      <div className="mb-5">
        <h3 className="text-lg font-heading font-bold" style={{ color: "var(--text-primary)" }}>
          Apply for a Loan
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Complete the form to request a new loan and one of our agents will contact you.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
          {error}
        </div>
      )}

      <div className="grid gap-4">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Loan Amount
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            className="w-full mt-2 rounded-full px-4 py-3 text-sm"
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
            placeholder="Enter amount"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Term (months)
          <select
            value={form.term}
            onChange={(e) => setForm((prev) => ({ ...prev, term: e.target.value }))}
            className="w-full mt-2 rounded-full px-4 py-3 text-sm"
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
          >
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Purpose
          <input
            type="text"
            value={form.purpose}
            onChange={(e) => setForm((prev) => ({ ...prev, purpose: e.target.value }))}
            className="w-full mt-2 rounded-full px-4 py-3 text-sm"
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
            placeholder="Personal, education, business..."
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => onSubmit?.(form)}
        disabled={loading}
        className="w-full mt-5 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ background: "#ccff00", color: "#0d0d0d", boxShadow: "0 0 20px rgba(204,255,0,0.25)" }}
      >
        {loading ? "Submitting..." : "Request Loan"}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
