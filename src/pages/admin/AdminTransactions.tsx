import { useState, useEffect } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate";
import { supabase } from "../../services/api";
import TransactionTable from "../../components/admin/TransactionTable";

const STATUS_CONFIG: Record<
  string,
  { color: string; bg: string; icon: typeof CheckCircle; label: string }
> = {
  successful: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    icon: CheckCircle,
    label: "Successful",
  },
  processing: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    icon: Clock,
    label: "Processing",
  },
  failed: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    icon: XCircle,
    label: "Failed",
  },
  cancelled: {
    color: "#6b7280",
    bg: "rgba(107,114,128,0.1)",
    icon: XCircle,
    label: "Cancelled",
  },
};

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select(
          `
          *,
          sender:profiles!transactions_sender_id_fkey(first_name, last_name, email),
          receiver:profiles!transactions_receiver_id_fkey(first_name, last_name, email)
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      console.error("Load transactions error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await supabase.from("transactions").update({ status }).eq("id", id);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t)),
      );
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Transaction <span style={{ color: "#ef4444" }}>Management</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {transactions.length} transactions found
          </p>
        </div>
        <button
          onClick={loadTransactions}
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

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const Icon = cfg.icon;
          const count = transactions.filter((t) => t.status === key).length;
          return (
            <div
              key={key}
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: cfg.bg }}
              >
                <Icon size={15} style={{ color: cfg.color }} />
              </div>
              <div className="text-left">
                <p
                  className="text-lg font-heading font-black"
                  style={{ color: cfg.color }}
                >
                  {count}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {cfg.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <TransactionTable
        transactions={transactions.map((tx) => ({
          id: tx.id,
          reference: tx.reference,
          senderName: tx.sender ? `${tx.sender.first_name} ${tx.sender.last_name}` : tx.sender_account,
          receiverName: tx.receiver ? `${tx.receiver.first_name} ${tx.receiver.last_name}` : tx.receiver_account,
          amount: tx.amount,
          status: tx.status,
          createdAt: formatRelativeTime(tx.created_at),
        }))}
        loading={loading}
        onStatusChange={(transaction, nextStatus) => updateStatus(transaction.id, nextStatus)}
      />
    </div>
  );
}
