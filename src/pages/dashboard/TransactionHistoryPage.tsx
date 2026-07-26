import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
} from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateTime } from "../../utils/formatDate";
import { cn } from "../../utils/cn";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/api";

type Status = "all" | "successful" | "processing" | "failed" | "cancelled";
type TxType = "all" | "transfer" | "receive" | "topup";

const STATUS_COLORS: Record<string, string> = {
  successful: "rgba(34,197,94,0.1)",
  processing: "rgba(245,158,11,0.1)",
  failed: "rgba(239,68,68,0.1)",
  cancelled: "rgba(107,114,128,0.1)",
};

const STATUS_TEXT: Record<string, string> = {
  successful: "#22c55e",
  processing: "#f59e0b",
  failed: "#ef4444",
  cancelled: "#6b7280",
};

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [typeFilter, setTypeFilter] = useState<TxType>("all");
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    loadTransactions();
  }, [user?.id]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .or(`sender_id.eq.${user!.id},receiver_id.eq.${user!.id}`)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      console.error("Load transactions error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = transactions.filter((tx) => {
    const matchSearch =
      tx.reference?.toLowerCase().includes(search.toLowerCase()) ||
      tx.sender_account?.includes(search) ||
      tx.receiver_account?.includes(search) ||
      tx.note?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || tx.status === statusFilter;
    const isReceive = tx.receiver_id === user?.id;
    const txType = isReceive
      ? "receive"
      : tx.type === "topup"
        ? "topup"
        : "transfer";
    const matchType = typeFilter === "all" || txType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Transaction <span style={{ color: "#ccff00" }}>History</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {filtered.length} transactions found
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadTransactions}
            className="px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--bg-elevated)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            ↻
          </button>
          <button
            onClick={() => setShowFilters((p) => !p)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: showFilters ? "#ccff00" : "var(--bg-elevated)",
              color: showFilters ? "#0d0d0d" : "var(--text-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <Filter size={14} />
            Filters
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--text-muted)" }}
        />
        <input
          type="text"
          placeholder="Search by reference, account or note..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
            color: "var(--text-primary)",
            outline: "none",
          }}
        />
      </div>

      {/* Filters */}
      {showFilters && (
        <div
          className="rounded-2xl p-4 flex flex-col gap-4 animate-fade-in-up"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Status
            </p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "all",
                  "successful",
                  "processing",
                  "failed",
                  "cancelled",
                ] as Status[]
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200"
                  style={{
                    background:
                      statusFilter === s ? "#ccff00" : "var(--bg-hover)",
                    color:
                      statusFilter === s ? "#0d0d0d" : "var(--text-secondary)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Type
            </p>
            <div className="flex flex-wrap gap-2">
              {(["all", "transfer", "receive", "topup"] as TxType[]).map(
                (t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200"
                    style={{
                      background:
                        typeFilter === t ? "#ccff00" : "var(--bg-hover)",
                      color:
                        typeFilter === t ? "#0d0d0d" : "var(--text-secondary)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
          </div>
          <button
            onClick={() => {
              setStatusFilter("all");
              setTypeFilter("all");
              setSearch("");
            }}
            className="flex items-center gap-2 text-xs font-semibold w-fit"
            style={{ color: "#ef4444" }}
          >
            <RefreshCw size={12} />
            Reset Filters
          </button>
        </div>
      )}

      {/* Transactions List */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-xl skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-4xl">🔍</p>
            <p
              className="font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              No transactions found
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {search || statusFilter !== "all" || typeFilter !== "all"
                ? "Try adjusting your filters"
                : "Your transactions will appear here"}
            </p>
          </div>
        ) : (
          filtered.map((tx, index) => {
            const isReceive =
              tx.receiver_id === user?.id || tx.type === "topup";
            const txColor = isReceive ? "#22c55e" : "#ef4444";
            const statusColor = STATUS_TEXT[tx.status] || "#6b7280";

            return (
              <div
                key={tx.id}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 transition-all duration-200 hover:scale-[1.005] cursor-pointer",
                )}
                style={{
                  borderBottom:
                    index < filtered.length - 1
                      ? "1px solid var(--border-primary)"
                      : "none",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: `${txColor}15`,
                    color: txColor,
                  }}
                >
                  {isReceive ? (
                    <ArrowDownLeft size={18} />
                  ) : (
                    <ArrowUpRight size={18} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {isReceive
                        ? `Received from ${tx.sender_account}`
                        : `Sent to ${tx.receiver_account}`}
                    </p>
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatDateTime(tx.created_at)} • {tx.reference}
                  </p>
                  {tx.note && (
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      "{tx.note}"
                    </p>
                  )}
                </div>

                <div
                  className="hidden sm:flex px-3 py-1 rounded-full text-xs font-semibold capitalize"
                  style={{
                    background: STATUS_COLORS[tx.status] || "var(--bg-hover)",
                    color: statusColor,
                  }}
                >
                  {tx.status}
                </div>

                <p
                  className="text-sm font-bold shrink-0"
                  style={{ color: txColor }}
                >
                  {isReceive ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
