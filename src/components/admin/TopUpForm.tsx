import { useState } from "react";
import { CreditCard, DollarSign, Send } from "lucide-react";

export interface TopUpFormValues {
  accountNumber: string;
  amount: string;
  note: string;
}

export interface TopUpFormProps {
  onSubmit?: (values: TopUpFormValues) => void | Promise<void>;
  submitting?: boolean;
}

export default function TopUpForm({ onSubmit, submitting = false }: TopUpFormProps) {
  const [values, setValues] = useState<TopUpFormValues>({
    accountNumber: "",
    amount: "",
    note: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit?.(values);
  };

  return (
    <div
      className="rounded-3xl p-6 flex flex-col gap-4"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-primary)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>
          <CreditCard size={18} />
        </div>
        <div>
          <h3 className="font-heading font-bold" style={{ color: "var(--text-primary)" }}>
            Top up account
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Create a manual funding request for a customer
          </p>
        </div>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          Account number
          <input
            value={values.accountNumber}
            onChange={(event) => setValues((prev) => ({ ...prev, accountNumber: event.target.value }))}
            placeholder="ACC-1001"
            className="rounded-2xl px-3 py-3 text-sm"
            style={{
              background: "var(--bg-hover)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
              outline: "none",
            }}
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          Amount
          <div className="relative">
            <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              value={values.amount}
              onChange={(event) => setValues((prev) => ({ ...prev, amount: event.target.value }))}
              type="number"
              min="1"
              placeholder="2500"
              className="w-full rounded-2xl pl-9 pr-3 py-3 text-sm"
              style={{
                background: "var(--bg-hover)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-primary)",
                outline: "none",
              }}
              required
            />
          </div>
        </label>

        <label className="flex flex-col gap-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          Note
          <textarea
            value={values.note}
            onChange={(event) => setValues((prev) => ({ ...prev, note: event.target.value }))}
            rows={3}
            placeholder="Add a short note for the admin review"
            className="rounded-2xl px-3 py-3 text-sm"
            style={{
              background: "var(--bg-hover)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
              outline: "none",
            }}
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold transition-all duration-200 hover:scale-[1.01]"
          style={{ background: "#ef4444", color: "#fff" }}
        >
          <Send size={16} />
          {submitting ? "Processing..." : "Submit top up"}
        </button>
      </form>
    </div>
  );
}
