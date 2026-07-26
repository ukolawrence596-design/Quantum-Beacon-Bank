import { useMemo, useState } from "react";
import { Eye, Lock, Search, Unlock } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export interface CustomerItem {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  account_number?: string;
  balance?: number;
  status?: string;
  created_at?: string;
}

export interface CustomerTableProps {
  customers?: CustomerItem[];
  loading?: boolean;
  onView?: (customer: CustomerItem) => void;
  onToggleStatus?: (customer: CustomerItem) => void;
}

const fallbackCustomers: CustomerItem[] = [
  {
    id: "cust-001",
    first_name: "Ava",
    last_name: "Johnson",
    email: "ava.johnson@example.com",
    account_number: "ACC-1001",
    balance: 12450,
    status: "active",
    created_at: "2025-01-15T10:20:00.000Z",
  },
  {
    id: "cust-002",
    first_name: "Noah",
    last_name: "Smith",
    email: "noah.smith@example.com",
    account_number: "ACC-1002",
    balance: 7600,
    status: "pending",
    created_at: "2025-02-09T15:10:00.000Z",
  },
  {
    id: "cust-003",
    first_name: "Mia",
    last_name: "Lopez",
    email: "mia.lopez@example.com",
    account_number: "ACC-1003",
    balance: 18240,
    status: "suspended",
    created_at: "2025-03-01T09:45:00.000Z",
  },
];

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  active: { color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  suspended: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export default function CustomerTable({
  customers,
  loading = false,
  onView,
  onToggleStatus,
}: CustomerTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const customerList = customers && customers.length ? customers : fallbackCustomers;

  const filteredCustomers = useMemo(() => {
    return customerList.filter((customer) => {
      const haystack = `${customer.first_name} ${customer.last_name} ${customer.email} ${customer.account_number ?? ""}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customerList, search, statusFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="font-heading font-bold" style={{ color: "var(--text-primary)" }}>
            Customers
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Review customer accounts and manage status
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative min-w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customer"
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
            {(["all", "active", "pending", "suspended"] as const).map((status) => (
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
          <span className="col-span-2">Customer</span>
          <span>Account</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-14 rounded-xl skeleton" />
            ))}
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="py-10 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            No customers match your current filters.
          </div>
        ) : (
          filteredCustomers.map((customer) => {
            const statusColors = STATUS_COLORS[customer.status ?? "pending"] || STATUS_COLORS.pending;
            return (
              <div key={customer.id} className="grid grid-cols-5 gap-4 items-center px-4 py-3" style={{ borderTop: "1px solid var(--border-primary)" }}>
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
                    {customer.first_name?.charAt(0) ?? "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                      {customer.first_name} {customer.last_name}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {customer.account_number ?? "—"}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatCurrency(customer.balance ?? 0)}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-semibold capitalize w-fit" style={{ background: statusColors.bg, color: statusColors.color }}>
                  {customer.status ?? "pending"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView?.(customer)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => onToggleStatus?.(customer)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ background: customer.status === "active" ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)", color: customer.status === "active" ? "#ef4444" : "#22c55e" }}
                  >
                    {customer.status === "active" ? <Lock size={14} /> : <Unlock size={14} />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
