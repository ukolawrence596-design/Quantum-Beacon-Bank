import { useMemo, useState } from "react";
import { Check, Landmark, Search, X } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export interface LoanItem {
  id: string;
  reference: string;
  customerName: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  type?: string;
  createdAt?: string;
}

export interface LoanApprovalTableProps {
  loans?: LoanItem[];
  loading?: boolean;
  onApprove?: (loan: LoanItem) => void;
  onReject?: (loan: LoanItem) => void;
}

const fallbackLoans: LoanItem[] = [
  { id: "loan-001", reference: "LN-001", customerName: "Ava Johnson", amount: 5000, status: "pending", type: "Personal", createdAt: "2h ago" },
  { id: "loan-002", reference: "LN-002", customerName: "Noah Smith", amount: 12000, status: "approved", type: "Auto", createdAt: "1d ago" },
  { id: "loan-003", reference: "LN-003", customerName: "Mia Lopez", amount: 7000, status: "rejected", type: "Education", createdAt: "3d ago" },
];

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  approved: { color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  rejected: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

export default function LoanApprovalTable({ loans, loading = false, onApprove, onReject }: LoanApprovalTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loanList = loans && loans.length ? loans : fallbackLoans;

  const filteredLoans = useMemo(() => {
    return loanList.filter((loan) => {
      const haystack = `${loan.reference} ${loan.customerName} ${loan.type ?? ""}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || loan.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [loanList, search, statusFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="font-heading font-bold" style={{ color: "var(--text-primary)" }}>
            Loan approvals
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Review pending applications quickly
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative min-w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search loan"
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
            {(["all", "pending", "approved", "rejected"] as const).map((status) => (
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
          <span>Ref</span>
          <span className="col-span-2">Customer</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-14 rounded-xl skeleton" />
            ))}
          </div>
        ) : filteredLoans.length === 0 ? (
          <div className="py-10 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            No loan applications match the current search.
          </div>
        ) : (
          filteredLoans.map((loan) => {
            const statusColors = STATUS_COLORS[loan.status] || STATUS_COLORS.pending;
            return (
              <div key={loan.id} className="grid grid-cols-5 gap-4 items-center px-4 py-3" style={{ borderTop: "1px solid var(--border-primary)" }}>
                <div className="flex items-center gap-2">
                  <Landmark size={14} style={{ color: "#ef4444" }} />
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {loan.reference}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {loan.customerName}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {loan.type ?? "Loan"} • {loan.createdAt ?? "recent"}
                  </p>
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {formatCurrency(loan.amount)}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full font-semibold capitalize" style={{ background: statusColors.bg, color: statusColors.color }}>
                    {loan.status}
                  </span>
                  {loan.status === "pending" && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onApprove?.(loan)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => onReject?.(loan)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
