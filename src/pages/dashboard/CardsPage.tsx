import { useState, useEffect } from "react";
import { Eye, EyeOff, Copy, Check, Lock, Unlock, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function CardsPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [activeCard, setActiveCard] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const { user, profile } = useAuth();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (!user?.id) return;
    loadCards();
  }, [user?.id]);

  const loadCards = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setCards(data || []);
      if (data && data.length > 0) setActiveCard(data[0]);
    } catch (err) {
      console.error("Load cards error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!activeCard) return;
    navigator.clipboard.writeText(
      activeCard.card_number?.replace(/\s/g, "") || "",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFreeze = async () => {
    if (!activeCard) return;
    const newStatus = activeCard.status === "active" ? "frozen" : "active";
    try {
      await supabase
        .from("cards")
        .update({ status: newStatus })
        .eq("id", activeCard.id);
      const updated = { ...activeCard, status: newStatus };
      setActiveCard(updated);
      setCards((prev) =>
        prev.map((c) => (c.id === activeCard.id ? updated : c)),
      );
      showSuccess(
        `Card ${newStatus === "active" ? "unfrozen" : "frozen"} successfully`,
      );
    } catch (err: any) {
      showError(err.message || "Failed to update card");
    }
  };

  const handleRequestCard = async () => {
    setRequesting(true);
    try {
      await supabase.from("notifications").insert({
        user_id: user?.id,
        title: "Card Request Submitted",
        message: `${profile?.first_name} ${profile?.last_name} has requested a new virtual card. Account: ${profile?.account_number}`,
        type: "card",
      });
      showSuccess(
        "Card request submitted! Admin will create your card shortly.",
      );
    } catch (err: any) {
      showError(err.message || "Failed to submit request");
    } finally {
      setRequesting(false);
    }
  };

  const maskNumber = (num: string) =>
    showDetails
      ? num
      : num?.replace(
          /(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/,
          "•••• •••• •••• $4",
        ) || "";

  const CARD_COLORS = [
    ["#ccff00", "#a0cc00"],
    ["#3b82f6", "#1d4ed8"],
    ["#a855f7", "#7c3aed"],
    ["#f59e0b", "#d97706"],
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <h1
          className="text-2xl font-heading font-black"
          style={{ color: "var(--text-primary)" }}
        >
          My <span style={{ color: "#ccff00" }}>Cards</span>
        </h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-64 rounded-3xl skeleton" />
          <div className="h-64 rounded-2xl skeleton" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            My <span style={{ color: "#ccff00" }}>Cards</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage your virtual cards
          </p>
        </div>
        <button
          onClick={handleRequestCard}
          disabled={requesting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50"
          style={{
            background: "#ccff00",
            color: "#0d0d0d",
            boxShadow: "0 0 15px rgba(204,255,0,0.3)",
          }}
        >
          {requesting ? (
            <>
              <div
                className="w-4 h-4 rounded-full border-2 animate-spin"
                style={{
                  borderColor: "#0d0d0d",
                  borderTopColor: "transparent",
                }}
              />
              Requesting...
            </>
          ) : (
            <>
              <Plus size={16} /> Request New Card
            </>
          )}
        </button>
      </div>

      {cards.length === 0 ? (
        <div
          className="rounded-2xl p-12 flex flex-col items-center gap-4 text-center"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(204,255,0,0.1)" }}
          >
            <span className="text-4xl">💳</span>
          </div>
          <h3
            className="text-xl font-heading font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            No cards yet
          </h3>
          <p
            className="text-sm max-w-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Request a virtual card and our admin team will create one for you
            shortly.
          </p>
          <button
            onClick={handleRequestCard}
            disabled={requesting}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50"
            style={{ background: "#ccff00", color: "#0d0d0d" }}
          >
            <Plus size={16} />
            Request Your First Card
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left — Card Display */}
          <div className="flex flex-col gap-4">
            {activeCard && (
              <>
                {/* Card Visual */}
                <div
                  className="relative rounded-3xl p-6 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${CARD_COLORS[cards.indexOf(activeCard) % CARD_COLORS.length][0]}, ${CARD_COLORS[cards.indexOf(activeCard) % CARD_COLORS.length][1]})`,
                    minHeight: "200px",
                    boxShadow: `0 20px 60px ${CARD_COLORS[cards.indexOf(activeCard) % CARD_COLORS.length][0]}40`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="relative z-10 flex flex-col h-full gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="text-xs font-semibold opacity-70"
                          style={{ color: "#0d0d0d" }}
                        >
                          {activeCard.label || "Virtual Card"}
                        </p>
                        <p
                          className="text-xs font-bold mt-0.5 px-2 py-0.5 rounded-full w-fit"
                          style={{
                            background: "rgba(0,0,0,0.2)",
                            color: "#0d0d0d",
                          }}
                        >
                          {activeCard.status === "active"
                            ? "● Active"
                            : "● Frozen"}
                        </p>
                      </div>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                        style={{
                          background: "rgba(0,0,0,0.2)",
                          color: "#0d0d0d",
                        }}
                      >
                        QB
                      </div>
                    </div>
                    <div>
                      <p
                        className="text-xl font-mono font-bold tracking-widest"
                        style={{ color: "#0d0d0d" }}
                      >
                        {maskNumber(activeCard.card_number || "")}
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p
                          className="text-xs opacity-60"
                          style={{ color: "#0d0d0d" }}
                        >
                          Card Holder
                        </p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: "#0d0d0d" }}
                        >
                          {activeCard.card_holder}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-xs opacity-60"
                          style={{ color: "#0d0d0d" }}
                        >
                          Expires
                        </p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: "#0d0d0d" }}
                        >
                          {activeCard.expiry_month}/
                          {activeCard.expiry_year?.slice(-2)}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-xs opacity-60"
                          style={{ color: "#0d0d0d" }}
                        >
                          CVV
                        </p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: "#0d0d0d" }}
                        >
                          {showDetails ? activeCard.cvv : "•••"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setShowDetails((p) => !p)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 hover:scale-105"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {showDetails ? <EyeOff size={18} /> : <Eye size={18} />}
                    <span className="text-xs font-medium">
                      {showDetails ? "Hide" : "Show"}
                    </span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 hover:scale-105"
                    style={{
                      background: copied
                        ? "rgba(34,197,94,0.1)"
                        : "var(--bg-elevated)",
                      border: copied
                        ? "1px solid rgba(34,197,94,0.2)"
                        : "1px solid var(--border-primary)",
                      color: copied ? "#22c55e" : "var(--text-secondary)",
                    }}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    <span className="text-xs font-medium">
                      {copied ? "Copied!" : "Copy"}
                    </span>
                  </button>
                  <button
                    onClick={toggleFreeze}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 hover:scale-105"
                    style={{
                      background:
                        activeCard.status === "active"
                          ? "rgba(239,68,68,0.08)"
                          : "rgba(34,197,94,0.08)",
                      border:
                        activeCard.status === "active"
                          ? "1px solid rgba(239,68,68,0.2)"
                          : "1px solid rgba(34,197,94,0.2)",
                      color:
                        activeCard.status === "active" ? "#ef4444" : "#22c55e",
                    }}
                  >
                    {activeCard.status === "active" ? (
                      <Lock size={18} />
                    ) : (
                      <Unlock size={18} />
                    )}
                    <span className="text-xs font-medium">
                      {activeCard.status === "active" ? "Freeze" : "Unfreeze"}
                    </span>
                  </button>
                </div>
              </>
            )}

            {/* Switch Cards */}
            {cards.length > 1 && (
              <div className="flex flex-col gap-2">
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Your Cards
                </p>
                {cards.map((card, i) => (
                  <button
                    key={card.id}
                    onClick={() => setActiveCard(card)}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      background:
                        activeCard?.id === card.id
                          ? "rgba(204,255,0,0.05)"
                          : "var(--bg-elevated)",
                      border:
                        activeCard?.id === card.id
                          ? "1px solid rgba(204,255,0,0.2)"
                          : "1px solid var(--border-primary)",
                    }}
                  >
                    <div
                      className="w-10 h-6 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${CARD_COLORS[i % CARD_COLORS.length][0]}, ${CARD_COLORS[i % CARD_COLORS.length][1]})`,
                      }}
                    />
                    <div className="flex-1 text-left">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        •••• {card.card_number?.replace(/\s/g, "").slice(-4)}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {card.label} • Exp {card.expiry_month}/
                        {card.expiry_year?.slice(-2)}
                      </p>
                    </div>
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full capitalize"
                      style={{
                        background:
                          card.status === "active"
                            ? "rgba(34,197,94,0.1)"
                            : "rgba(239,68,68,0.1)",
                        color: card.status === "active" ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {card.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Card Details */}
          {activeCard && (
            <div
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <h3
                className="font-heading font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Card Details
              </h3>
              {[
                {
                  label: "Card Type",
                  value: `${activeCard.card_type || "Virtual"} Card`,
                },
                {
                  label: "Card Number",
                  value: maskNumber(activeCard.card_number || ""),
                },
                { label: "Card Holder", value: activeCard.card_holder },
                {
                  label: "Expiry Date",
                  value: `${activeCard.expiry_month}/${activeCard.expiry_year?.slice(-2)}`,
                },
                { label: "Label", value: activeCard.label || "My Card" },
                {
                  label: "Status",
                  value: activeCard.status,
                  status: activeCard.status,
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
                      className="text-xs font-bold px-2 py-1 rounded-full capitalize"
                      style={{
                        background:
                          status === "active"
                            ? "rgba(34,197,94,0.1)"
                            : "rgba(239,68,68,0.1)",
                        color: status === "active" ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {status}
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}
