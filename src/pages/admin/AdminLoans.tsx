import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate";
import { supabase } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import LoanApprovalTable from "../../components/admin/LoanApprovalTable";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  approved: { color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  rejected: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  active: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  paid_off: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
};

export default function AdminLoans() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("loans")
        .select(
          `
          *,
          profile:profiles!loans_user_id_fkey(first_name, last_name, email)
        `,
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      setLoans(data || []);
    } catch (err) {
      console.error("Load loans error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await supabase.from("loans").update({ status }).eq("id", id);

      // If approved disburse the loan amount to customer
      if (status === "approved") {
        const loan = loans.find((l) => l.id === id);
        if (loan) {
          await supabase.rpc("process_transfer", {
            p_sender_id: loan.user_id,
            p_receiver_account: loan.profile?.account_number,
            p_amount: loan.amount,
            p_note: `Loan disbursement: ${loan.reference}`,
          });

          // Notify customer
          await supabase.from("notifications").insert({
            user_id: loan.user_id,
            title:
              status === "approved"
                ? "Loan Approved! 🎉"
                : "Loan Application Update",
            message:
              status === "approved"
                ? `Your ${loan.loan_type} loan of ${formatCurrency(loan.amount)} has been approved!`
                : `Your loan application has been ${status}.`,
            type: "loan",
          });
        }
      }

      setLoans((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      showSuccess(`Loan ${status} successfully`);
      if (selected?.id === id) setSelected((p: any) => ({ ...p, status }));
    } catch (err: any) {
      showError(err.message || "Failed to update loan");
    }
  };

  const counts = {
    pending: loans.filter((l) => l.status === "pending").length,
    approved: loans.filter((l) => l.status === "approved").length,
    rejected: loans.filter((l) => l.status === "rejected").length,
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Loan <span style={{ color: "#ef4444" }}>Management</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Review and manage loan applications
          </p>
        </div>
        <button
          onClick={loadLoans}
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

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending Review", count: counts.pending, color: "#f59e0b" },
          { label: "Approved", count: counts.approved, color: "#22c55e" },
          { label: "Rejected", count: counts.rejected, color: "#ef4444" },
        ].map(({ label, count, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <p className="text-3xl font-heading font-black" style={{ color }}>
              {count}
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      <LoanApprovalTable
        loans={loans.map((loan) => ({
          id: loan.id,
          reference: loan.reference,
          customerName: loan.profile ? `${loan.profile.first_name} ${loan.profile.last_name}` : "Unknown",
          amount: loan.amount,
          status: loan.status,
          type: loan.loan_type,
          createdAt: formatRelativeTime(loan.created_at),
        }))}
        loading={loading}
        onApprove={(loan) => updateStatus(loan.id, "approved")}
        onReject={(loan) => updateStatus(loan.id, "rejected")}
      />

      {/* Loan Detail Modal */}
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
                Loan Details
              </h3>
              <button
                onClick={() => setSelected(null)}
                style={{ color: "var(--text-muted)" }}
              >
                ✕
              </button>
            </div>

            {[
              {
                label: "Customer",
                value: selected.profile
                  ? `${selected.profile.first_name} ${selected.profile.last_name}`
                  : "Unknown",
              },
              { label: "Email", value: selected.profile?.email || "N/A" },
              { label: "Loan Type", value: selected.loan_type },
              { label: "Amount", value: formatCurrency(selected.amount) },
              { label: "Period", value: `${selected.period_months} months` },
              {
                label: "Monthly Pay",
                value: formatCurrency(selected.monthly_payment),
              },
              { label: "Purpose", value: selected.purpose || "Not specified" },
              { label: "Reference", value: selected.reference },
              {
                label: "Applied",
                value: formatRelativeTime(selected.created_at),
              },
              {
                label: "Status",
                value: selected.status,
                status: selected.status,
              },
            ].map(({ label, value, status }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: "1px solid var(--border-primary)" }}
              >
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </span>
                {status ? (
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold capitalize"
                    style={{
                      background:
                        STATUS_CONFIG[status]?.bg || "var(--bg-hover)",
                      color:
                        STATUS_CONFIG[status]?.color || "var(--text-muted)",
                    }}
                  >
                    {value}
                  </span>
                ) : (
                  <span
                    className="text-xs font-semibold text-right max-w-48 truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {value}
                  </span>
                )}
              </div>
            ))}

            {selected.status === "pending" && (
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => {
                    updateStatus(selected.id, "approved");
                    setSelected(null);
                  }}
                  className="flex-1 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    color: "#22c55e",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  <Check size={14} /> Approve
                </button>
                <button
                  onClick={() => {
                    updateStatus(selected.id, "rejected");
                    setSelected(null);
                  }}
                  className="flex-1 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    color: "#ef4444",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  <X size={14} /> Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
