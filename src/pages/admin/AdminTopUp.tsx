import { useState, useEffect } from "react";
import { Search, DollarSign, Check, AlertCircle } from "lucide-react";
import { supabase } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import TopUpForm, { type TopUpFormValues } from "../../components/admin/TopUpForm";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

export default function AdminTopUp() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showSuccess, showError } = useToast();

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
        .eq("status", "active")
        .order("first_name");
      if (error) throw error;
      setCustomers(data || []);
    } catch (err) {
      console.error("Load customers error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async (values?: TopUpFormValues) => {
    const targetCustomer = selected ?? customers.find((customer) => customer.account_number === values?.accountNumber) ?? null;
    const topUpAmount = values?.amount ? parseFloat(values.amount) : parseFloat(amount);
    const noteText = values?.note ?? note;

    if (!targetCustomer || !topUpAmount || topUpAmount <= 0) return;
    setSaving(true);
    try {

      // Use the secure database function
      const { data, error } = await supabase.rpc('admin_top_up', {
        p_user_id: targetCustomer.id,
        p_amount: topUpAmount,
        p_note: noteText || 'Admin top up',
      })

      if (error) throw error

      if (data?.success) {
        // Update local customer list with new balance
        const newBalance = data.new_balance
        setCustomers(prev =>
          prev.map(c =>
            c.id === targetCustomer.id
              ? { ...c, balance: newBalance }
              : c
          )
        )
        setSelected((prev: any) => ({
          ...prev,
          balance: newBalance,
        }))

        showSuccess(
          `✅ Successfully topped up $${topUpAmount.toLocaleString()} to ${targetCustomer.first_name}'s account! New balance: $${newBalance.toLocaleString()}`
        )
        setSuccess(true)
        setAmount('')
        setNote('')
        setTimeout(() => setSuccess(false), 4000)
      } else {
        throw new Error(data?.error || 'Top up failed')
      }
    } catch (err: any) {
      showError(err.message || 'Top up failed. Please try again.')
    } finally {
      setSaving(false)
    }
  };

  const filtered = customers.filter(
    (c) =>
      `${c.first_name} ${c.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      c.account_number?.includes(search) ||
      c.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const inputStyle = {
    background: "var(--bg-input)",
    border: "1px solid var(--border-primary)",
    color: "var(--text-primary)",
    outline: "none",
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "#ef4444";
    e.target.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.1)";
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "var(--border-primary)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-heading font-black"
          style={{ color: "var(--text-primary)" }}
        >
          Account <span style={{ color: "#ef4444" }}>Top Up</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Add funds to customer accounts
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Customer Selection */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <h3
            className="font-heading font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Select Customer
          </h3>

          <div className="relative">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full text-sm"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 rounded-xl skeleton" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  No customers found
                </p>
              </div>
            ) : (
              filtered.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => setSelected(customer)}
                  className="flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    background:
                      selected?.id === customer.id
                        ? "rgba(239,68,68,0.08)"
                        : "var(--bg-hover)",
                    border:
                      selected?.id === customer.id
                        ? "1px solid rgba(239,68,68,0.2)"
                        : "1px solid transparent",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ background: "#ef444420", color: "#ef4444" }}
                  >
                    {customer.first_name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {customer.first_name} {customer.last_name}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {customer.account_number} •{" "}
                      {formatCurrency(customer.balance || 0)}
                    </p>
                  </div>
                  {selected?.id === customer.id && (
                    <Check size={14} style={{ color: "#ef4444" }} />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Top Up Form */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <h3
            className="font-heading font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Top Up Details
          </h3>

          {selected ? (
            <>
              {/* Selected Customer */}
              <div
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{
                  background: "rgba(239,68,68,0.05)",
                  border: "1px solid rgba(239,68,68,0.15)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                  style={{ background: "#ef444420", color: "#ef4444" }}
                >
                  {selected.first_name?.charAt(0) || "?"}
                </div>
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selected.first_name} {selected.last_name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Current Balance: {formatCurrency(selected.balance || 0)}
                  </p>
                </div>
              </div>

              {/* Success */}
              {success && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm animate-fade-in-down"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    color: "#22c55e",
                  }}
                >
                  <Check size={14} />
                  Account topped up successfully!
                </div>
              )}

              <TopUpForm
                onSubmit={async (values) => {
                  setAmount(values.amount);
                  setNote(values.note);
                  await handleTopUp(values);
                }}
                submitting={saving}
              />

              <div
                className="flex items-start gap-2 px-4 py-3 rounded-xl text-xs"
                style={{
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  color: "#f59e0b",
                }}
              >
                <AlertCircle size={13} className="shrink-0 mt-0.5" />
                This action will immediately credit the customer's account and
                cannot be reversed.
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <DollarSign size={40} style={{ color: "var(--text-muted)" }} />
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Select a customer
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Choose a customer from the list to top up their account
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
