import { useState, useEffect } from "react";
import { CreditCard, Plus, Lock, Unlock, Search, X } from "lucide-react";
import { supabase } from "../../services/api";
import { useToast } from "../../context/ToastContext";

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  active: { color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  frozen: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  blocked: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

export default function AdminCards() {
  const [cards, setCards] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [newCard, setNewCard] = useState({
    customerId: "",
    label: "My Card",
  });
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadCards();
    loadCustomers();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("cards")
        .select(
          `
          *,
          profile:profiles!cards_user_id_fkey(first_name, last_name, email)
        `,
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      setCards(data || []);
    } catch (err) {
      console.error("Load cards error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, email")
      .eq("role", "customer")
      .order("first_name");
    setCustomers(data || []);
  };

  const generateCardNumber = () => {
    const groups = Array.from({ length: 4 }, () =>
      Math.floor(1000 + Math.random() * 9000).toString(),
    );
    return groups.join(" ");
  };

  const generateCVV = () => Math.floor(100 + Math.random() * 900).toString();

  const getExpiryDate = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 3);
    return {
      month: String(d.getMonth() + 1).padStart(2, "0"),
      year: String(d.getFullYear()),
    };
  };

  const handleCreateCard = async () => {
    if (!newCard.customerId) {
      showError("Please select a customer");
      return;
    }
    setCreating(true);
    try {
      const customer = customers.find((c) => c.id === newCard.customerId);
      const cardNum = generateCardNumber();
      const cvv = generateCVV();
      const expiry = getExpiryDate();

      const { data, error } = await supabase
        .from("cards")
        .insert({
          user_id: newCard.customerId,
          card_number: cardNum,
          card_holder: `${customer?.first_name} ${customer?.last_name}`,
          expiry_month: expiry.month,
          expiry_year: expiry.year,
          cvv,
          card_type: "virtual",
          status: "active",
          label: newCard.label || "My Card",
        })
        .select(
          `
          *,
          profile:profiles!cards_user_id_fkey(first_name, last_name, email)
        `,
        )
        .single();

      if (error) throw error;

      // Notify customer
      await supabase.from("notifications").insert({
        user_id: newCard.customerId,
        title: "New Virtual Card Created",
        message: `A new virtual card ending in ${cardNum.slice(-4)} has been created for your account.`,
        type: "card",
      });

      setCards((prev) => [data, ...prev]);
      showSuccess(`Card created successfully for ${customer?.first_name}!`);
      setShowCreateForm(false);
      setNewCard({ customerId: "", label: "My Card" });
    } catch (err: any) {
      showError(err.message || "Failed to create card");
    } finally {
      setCreating(false);
    }
  };

  const toggleFreeze = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "frozen" : "active";
    try {
      await supabase.from("cards").update({ status: newStatus }).eq("id", id);
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
      );
      showSuccess(
        `Card ${newStatus === "active" ? "unfrozen" : "frozen"} successfully`,
      );
    } catch (err: any) {
      showError(err.message || "Failed to update card");
    }
  };

  const filtered = cards.filter((c) => {
    const name = c.profile
      ? `${c.profile.first_name} ${c.profile.last_name}`
      : "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      c.card_number?.replace(/\s/g, "").includes(search.replace(/\s/g, ""))
    );
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Card <span style={{ color: "#ef4444" }}>Management</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {cards.length} cards total
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadCards}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--bg-elevated)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            ↻ Refresh
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{ background: "#ef4444", color: "#ffffff" }}
          >
            <Plus size={16} />
            Create Card
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
          placeholder="Search by customer name or card number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full text-sm"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
            color: "var(--text-primary)",
            outline: "none",
          }}
        />
      </div>

      {/* Create Card Modal */}
      {showCreateForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "var(--overlay)" }}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6 flex flex-col gap-5 animate-scale-in"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <div className="flex items-center justify-between">
              <h3
                className="font-heading font-bold text-lg"
                style={{ color: "var(--text-primary)" }}
              >
                Create Virtual Card
              </h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "var(--bg-hover)",
                  color: "var(--text-muted)",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Select Customer
                </label>
                <select
                  value={newCard.customerId}
                  onChange={(e) =>
                    setNewCard((p) => ({ ...p, customerId: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-full text-sm"
                  style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-primary)",
                    color: "var(--text-primary)",
                    outline: "none",
                  }}
                >
                  <option value="">Select a customer...</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.first_name} {c.last_name} — {c.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Card Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shopping Card"
                  value={newCard.label}
                  onChange={(e) =>
                    setNewCard((p) => ({ ...p, label: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-full text-sm"
                  style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-primary)",
                    color: "var(--text-primary)",
                    outline: "none",
                  }}
                />
              </div>

              <div
                className="p-4 rounded-2xl text-xs"
                style={{
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  color: "#3b82f6",
                }}
              >
                ℹ️ Card number, CVV and expiry date will be automatically
                generated and securely assigned to the customer.
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 py-3 rounded-full font-bold text-sm"
                style={{
                  background: "transparent",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCard}
                disabled={creating || !newCard.customerId}
                className="flex-1 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: "#ef4444", color: "#ffffff" }}
              >
                {creating ? (
                  <>
                    <div
                      className="w-4 h-4 rounded-full border-2 animate-spin"
                      style={{
                        borderColor: "#ffffff",
                        borderTopColor: "transparent",
                      }}
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={14} /> Create Card
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <div
          className="grid grid-cols-5 gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider"
          style={{
            background: "var(--bg-hover)",
            color: "var(--text-muted)",
            borderBottom: "1px solid var(--border-primary)",
          }}
        >
          <span className="col-span-2">Customer</span>
          <span>Card Number</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <CreditCard size={40} style={{ color: "var(--text-muted)" }} />
            <p
              className="font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              No cards found
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Create a card for a customer to get started
            </p>
          </div>
        ) : (
          filtered.map((card, index) => {
            const sc = STATUS_COLORS[card.status] || STATUS_COLORS.active;
            return (
              <div
                key={card.id}
                className="grid grid-cols-5 gap-4 items-center px-6 py-4 transition-all duration-200 hover:bg-[var(--bg-hover)]"
                style={{
                  borderBottom:
                    index < filtered.length - 1
                      ? "1px solid var(--border-primary)"
                      : "none",
                }}
              >
                <div className="col-span-2 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(239,68,68,0.1)" }}
                  >
                    <CreditCard size={16} style={{ color: "#ef4444" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {card.profile
                        ? `${card.profile.first_name} ${card.profile.last_name}`
                        : "Unknown"}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {card.label} • Exp {card.expiry_month}/
                      {card.expiry_year?.slice(-2)}
                    </p>
                  </div>
                </div>
                <p
                  className="text-xs font-mono"
                  style={{ color: "var(--text-secondary)" }}
                >
                  •••• {card.card_number?.replace(/\s/g, "").slice(-4)}
                </p>
                <span
                  className="text-xs px-2 py-1 rounded-full font-semibold capitalize w-fit"
                  style={{ background: sc.bg, color: sc.color }}
                >
                  {card.status}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFreeze(card.id, card.status)}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      background:
                        card.status === "active"
                          ? "rgba(239,68,68,0.1)"
                          : "rgba(34,197,94,0.1)",
                      color: card.status === "active" ? "#ef4444" : "#22c55e",
                    }}
                  >
                    {card.status === "active" ? (
                      <Lock size={13} />
                    ) : (
                      <Unlock size={13} />
                    )}
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
