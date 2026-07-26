import { useMemo, useState } from "react";
import { CheckCircle, Clock, Search, XCircle } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import TransactionStatusBadge from "./TransactionStatusBadge";

export interface TransactionItem {
  id: string;
  reference: string;
  senderName: string;
  receiverName: string;
  amount: number;
  status: string;
  createdAt?: string;
}

export interface TransactionTableProps {
  transactions?: TransactionItem[];
  loading?: boolean;
  onStatusChange?: (transaction: TransactionItem, nextStatus: string) => void;
}

const fallbackTransactions: TransactionItem[] = [
  { id: "tx-001", reference: "TRX-1001", senderName: "Ava Johnson", receiverName: "Mia Lopez", amount: 2500, status: "processing", createdAt: "10m ago" },
  { id: "tx-002", reference: "TRX-1002", senderName: "Noah Smith", receiverName: "Liam Carter", amount: 4300, status: "successful", createdAt: "1h ago" },
  { id: "tx-003", reference: "TRX-1003", senderName: "Mia Lopez", receiverName: "Ava Johnson", amount: 1800, status: "failed", createdAt: "4h ago" },
];

export default function TransactionTable({ transactions, loading = false, onStatusChange }: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const transactionList = transactions && transactions.length ? transactions : fallbackTransactions;

  const filteredTransactions = useMemo(() => {
    return transactionList.filter((transaction) => {
      const haystack = `${transaction.reference} ${transaction.senderName} ${transaction.receiverName}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transactionList, search, statusFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="font-heading font-bold" style={{ color: "var(--text-primary)" }}>
            Transactions
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Review recent movement and approve or reject pending transfers
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative min-w-60">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transaction"
              className="w-full rounded-full pl-9 pr-3 py-2 text-sm"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-primary)",
                outline: "none",
              }}
            />
          </div>
          <div className="flex items-center rounded-full p-1" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)" }}>
            {(["all", "processing", "successful", "failed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold capitalize"
                style={{
                  background: statusFilter === status ? "#ef4444" : "transparent",
                  color: statusFilter === status ? "#fff" : "var(--text-secondary)",
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)" }}>
        <div className="grid grid-cols-5 gap-4 px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}>
          <span>Reference</span>
          <span className="col-span-2">From → To</span>
          <span>Amount</span>
          <span>Action</span>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-14 rounded-xl skeleton" />
            ))}
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="py-10 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            No transactions match the current filters.
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="grid grid-cols-5 gap-4 items-center px-4 py-3" style={{ borderTop: "1px solid var(--border-primary)" }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {transaction.reference}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {transaction.createdAt ?? "recent"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {transaction.senderName} → {transaction.receiverName}
                </p>
                <div className="mt-1">
                  <TransactionStatusBadge status={transaction.status} compact />
                </div>
              </div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {formatCurrency(transaction.amount)}
              </p>
              <div className="flex items-center gap-2">
                {transaction.status === "processing" && (
                  <>
                    <button
                      onClick={() => onStatusChange?.(transaction, "successful")}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                    >
                      <CheckCircle size={14} />
                    </button>
                    <button
                      onClick={() => onStatusChange?.(transaction, "failed")}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                    >
                      <XCircle size={14} />
                    </button>
                  </>
                )}
                {transaction.status !== "processing" && (
                  <button
                    onClick={() => onStatusChange?.(transaction, "processing")}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}
                  >
                    <Clock size={14} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
