import { useState, useEffect } from "react";
import { UserCheck, UserX } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate";
import { supabase } from "../../services/api";
import CustomerTable from "../../components/admin/CustomerTable";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  active: { color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  suspended: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "customer")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (err) {
      console.error("Load customers error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      await supabase
        .from("profiles")
        .update({ status: newStatus })
        .eq("id", id);
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
      );
      if (selected?.id === id) {
        setSelected((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Toggle status error:", err);
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
            Customer <span style={{ color: "#ef4444" }}>Management</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {customers.length} customers found
          </p>
        </div>
        <button
          onClick={loadCustomers}
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

      <CustomerTable
        customers={customers}
        loading={loading}
        onView={(customer) => setSelected(customer)}
        onToggleStatus={(customer) => toggleStatus(customer.id, customer.status ?? "active")}
      />

      {/* Customer Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "var(--overlay)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6 flex flex-col gap-4 animate-scale-in"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3
                className="font-heading font-bold text-lg"
                style={{ color: "var(--text-primary)" }}
              >
                Customer Details
              </h3>
              <button
                onClick={() => setSelected(null)}
                style={{ color: "var(--text-muted)" }}
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl"
                style={{ background: "#ef444420", color: "#ef4444" }}
              >
                {selected.first_name?.charAt(0) || "?"}
              </div>
              <div>
                <p
                  className="font-heading font-bold text-xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selected.first_name} {selected.last_name}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {selected.email}
                </p>
              </div>
            </div>

            {[
              { label: "Account Number", value: selected.account_number },
              {
                label: "Balance",
                value: formatCurrency(selected.balance || 0),
              },
              { label: "Phone", value: selected.phone || "Not provided" },
              {
                label: "Account Type",
                value: selected.account_type || "checking",
              },
              {
                label: "Status",
                value: selected.status,
                status: selected.status,
              },
              {
                label: "Member Since",
                value: formatRelativeTime(selected.created_at),
              },
            ].map(({ label, value, status }) => (
              <div
                key={label}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: "1px solid var(--border-primary)" }}
              >
                <span
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </span>
                {status ? (
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold capitalize"
                    style={{
                      background:
                        STATUS_COLORS[status]?.bg || "var(--bg-hover)",
                      color:
                        STATUS_COLORS[status]?.color || "var(--text-secondary)",
                    }}
                  >
                    {value}
                  </span>
                ) : (
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {value}
                  </span>
                )}
              </div>
            ))}

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => {
                  toggleStatus(selected.id, selected.status);
                }}
                className="flex-1 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{
                  background:
                    selected.status === "active"
                      ? "rgba(239,68,68,0.1)"
                      : "rgba(34,197,94,0.1)",
                  color: selected.status === "active" ? "#ef4444" : "#22c55e",
                  border:
                    selected.status === "active"
                      ? "1px solid rgba(239,68,68,0.2)"
                      : "1px solid rgba(34,197,94,0.2)",
                }}
              >
                {selected.status === "active" ? (
                  <>
                    <UserX size={14} /> Suspend
                  </>
                ) : (
                  <>
                    <UserCheck size={14} /> Activate
                  </>
                )}
              </button>
              <button
                onClick={() => setSelected(null)}
                className="flex-1 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "var(--bg-hover)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
