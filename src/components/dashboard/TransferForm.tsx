import { useState } from "react";

export interface TransferFormData {
  recipientName: string;
  recipientAccount: string;
  amount: string;
  note: string;
}

export interface TransferFormProps {
  loading?: boolean;
  error?: string;
  onSubmit?: (values: TransferFormData) => void;
}

export default function TransferForm({ loading = false, error = "", onSubmit }: TransferFormProps) {
  const [form, setForm] = useState<TransferFormData>({ recipientName: "", recipientAccount: "", amount: "", note: "" });

  return (
    <div className="rounded-3xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-primary)]">
      <div className="mb-5">
        <h3 className="text-lg font-heading font-bold" style={{ color: "var(--text-primary)" }}>
          Send Money
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Use your secure transfer form to move money to anyone quickly.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
          {error}
        </div>
      )}

      <div className="grid gap-4">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Recipient Name
          <input
            value={form.recipientName}
            onChange={(e) => setForm((prev) => ({ ...prev, recipientName: e.target.value }))}
            className="w-full mt-2 rounded-full px-4 py-3 text-sm"
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
            placeholder="Full name"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Recipient Account
          <input
            value={form.recipientAccount}
            onChange={(e) => setForm((prev) => ({ ...prev, recipientAccount: e.target.value }))}
            className="w-full mt-2 rounded-full px-4 py-3 text-sm"
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
            placeholder="Account number"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Amount
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            className="w-full mt-2 rounded-full px-4 py-3 text-sm"
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
            placeholder="USD"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Note
          <input
            value={form.note}
            onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
            className="w-full mt-2 rounded-full px-4 py-3 text-sm"
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
            placeholder="Add a note"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => onSubmit?.(form)}
        disabled={loading}
        className="w-full mt-5 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ background: "#ccff00", color: "#0d0d0d" }}
      >
        {loading ? "Sending..." : "Send Transfer"}
      </button>
    </div>
  );
}
