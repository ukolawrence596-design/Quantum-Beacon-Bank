import { useState, useEffect } from "react";
import { ArrowLeftRight, Search, Check, AlertCircle } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";
import { supabase } from "../../services/api";
import { transferFunds } from "../../services/transaction.service";

type Step = "form" | "confirm" | "success";

export default function TransferPage() {
  const [step, setStep] = useState<Step>("form");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [recentRecipients, setRecentRecipients] = useState<any[]>([]);
  const [resolvedUser, setResolvedUser] = useState<any | null>(null);
  const [resolving, setResolving] = useState(false);
  const { user, profile, refreshProfile } = useAuth();
  const { showSuccess, showError } = useToast();

  const balance = profile?.balance || 0;

  // Load recent recipients from past transactions
  useEffect(() => {
    if (!user?.id) return;
    const loadRecipients = async () => {
      const { data } = await supabase
        .from("transactions")
        .select(
          "receiver_account, receiver:profiles!transactions_receiver_id_fkey(first_name, last_name, account_number)",
        )
        .eq("sender_id", user.id)
        .eq("status", "successful")
        .order("created_at", { ascending: false })
        .limit(20);

      if (data) {
        // Deduplicate by account
        const seen = new Set<string>();
        const unique = data
          .filter((t: any) => {
            if (!t.receiver || seen.has(t.receiver_account)) return false;
            seen.add(t.receiver_account);
            return true;
          })
          .slice(0, 4)
          .map((t: any) => t.receiver);
        setRecentRecipients(unique);
      }
    };
    loadRecipients();
  }, [user?.id]);

  // Resolve account number to user
  useEffect(() => {
    if (accountNumber.length !== 10) {
      setResolvedUser(null);
      return;
    }
    const resolve = async () => {
      setResolving(true);
      const { data } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, account_number")
        .eq("account_number", accountNumber)
        .single();
      setResolvedUser(data || null);
      setResolving(false);
    };
    resolve();
  }, [accountNumber]);

  const handleContinue = () => {
    setError("");
    if (!accountNumber) {
      setError("Please enter a recipient account number");
      return;
    }
    if (accountNumber === profile?.account_number) {
      setError("You cannot transfer to your own account");
      return;
    }
    if (!resolvedUser) {
      setError("Account number not found. Please check and try again");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (parseFloat(amount) > balance) {
      setError(
        `Insufficient balance. Your balance is ${formatCurrency(balance)}`,
      );
      return;
    }
    setStep("confirm");
  };

  const handleConfirm = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const data = await transferFunds(
        user.id,
        accountNumber,
        parseFloat(amount),
        note || "",
      );

      setReference(data.reference);
      await refreshProfile();
      setStep("success");
      showSuccess("Transfer completed successfully!");
    } catch (err: any) {
      showError(err.message || "Transfer failed");
      setError(err.message || "Transfer failed");
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("form");
    setAccountNumber("");
    setAmount("");
    setNote("");
    setResolvedUser(null);
    setError("");
    setReference("");
  };

  const inputStyle = {
    background: "var(--bg-input)",
    border: "1px solid var(--border-primary)",
    color: "var(--text-primary)",
    outline: "none",
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "#ccff00";
    e.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.1)";
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "var(--border-primary)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-heading font-black"
          style={{ color: "var(--text-primary)" }}
        >
          Send <span style={{ color: "#ccff00" }}>Money</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Transfer funds instantly to any Quantum Beacon Bank account
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3">
        {["Details", "Confirm", "Done"].map((s, i) => {
          const stepIndex = i + 1;
          const isActive =
            (step === "form" && stepIndex === 1) ||
            (step === "confirm" && stepIndex === 2) ||
            (step === "success" && stepIndex === 3);
          const isComplete =
            (step === "confirm" && stepIndex === 1) ||
            (step === "success" && stepIndex <= 2);
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: isComplete
                    ? "#22c55e"
                    : isActive
                      ? "#ccff00"
                      : "var(--bg-elevated)",
                  color:
                    isComplete || isActive ? "#0d0d0d" : "var(--text-muted)",
                  border:
                    isComplete || isActive
                      ? "none"
                      : "1px solid var(--border-primary)",
                }}
              >
                {isComplete ? <Check size={12} /> : stepIndex}
              </div>
              <span
                className="text-xs font-medium"
                style={{ color: isActive ? "#ccff00" : "var(--text-muted)" }}
              >
                {s}
              </span>
              {i < 2 && (
                <div
                  className="w-8 h-px ml-1"
                  style={{
                    background: isComplete
                      ? "#22c55e"
                      : "var(--border-primary)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* STEP 1 — Form */}
      {step === "form" && (
        <div className="flex flex-col gap-4">
          {/* Balance */}
          <div
            className="flex items-center justify-between px-5 py-4 rounded-2xl"
            style={{
              background: "rgba(204,255,0,0.05)",
              border: "1px solid rgba(204,255,0,0.15)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Available Balance
            </p>
            <p
              className="text-lg font-heading font-black"
              style={{ color: "#ccff00" }}
            >
              {formatCurrency(balance)}
            </p>
          </div>

          {/* Recent Recipients */}
          {recentRecipients.length > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Recent Recipients
              </p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {recentRecipients.map((r: any, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAccountNumber(r.account_number);
                      setResolvedUser(r);
                    }}
                    className="flex flex-col items-center gap-2 shrink-0 transition-all duration-200 hover:scale-105"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200"
                      style={{
                        background:
                          accountNumber === r.account_number
                            ? "#ccff00"
                            : "rgba(204,255,0,0.1)",
                        color:
                          accountNumber === r.account_number
                            ? "#0d0d0d"
                            : "#ccff00",
                        border:
                          accountNumber === r.account_number
                            ? "2px solid #ccff00"
                            : "2px solid transparent",
                      }}
                    >
                      {r.first_name?.charAt(0)}
                      {r.last_name?.charAt(0)}
                    </div>
                    <p
                      className="text-xs font-medium text-center w-16 truncate"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {r.first_name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            {/* Account Number */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Recipient Account Number
              </label>
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  placeholder="Enter 10-digit account number"
                  value={accountNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setAccountNumber(val);
                    setResolvedUser(null);
                    setError("");
                  }}
                  maxLength={10}
                  className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Resolve indicator */}
              {resolving && (
                <p
                  className="text-xs px-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  🔍 Looking up account...
                </p>
              )}
              {resolvedUser && !resolving && (
                <p
                  className="text-xs flex items-center gap-1 px-2"
                  style={{ color: "#22c55e" }}
                >
                  <Check size={12} />
                  Sending to {resolvedUser.first_name} {resolvedUser.last_name}
                </p>
              )}
              {accountNumber.length === 10 && !resolvedUser && !resolving && (
                <p className="text-xs px-2" style={{ color: "#ef4444" }}>
                  ✗ Account not found
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Amount
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 font-bold"
                  style={{ color: "var(--text-muted)" }}
                >
                  $
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError("");
                  }}
                  min="1"
                  className="w-full pl-8 pr-4 py-3.5 rounded-full text-sm"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["50", "100", "200", "500"].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                    style={{
                      background:
                        amount === val ? "#ccff00" : "var(--bg-hover)",
                      color:
                        amount === val ? "#0d0d0d" : "var(--text-secondary)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Note (Optional)
              </label>
              <textarea
                placeholder="What's this transfer for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-2xl text-sm resize-none"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#ef4444",
                }}
              >
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              onClick={handleContinue}
              className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 mt-2"
              style={{
                background: "#ccff00",
                color: "#0d0d0d",
                boxShadow: "0 0 20px rgba(204,255,0,0.3)",
              }}
            >
              <ArrowLeftRight size={16} />
              Continue to Confirm
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — Confirm */}
      {step === "confirm" && (
        <div
          className="rounded-2xl p-6 flex flex-col gap-5"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <h3
            className="font-heading font-bold text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            Confirm Transfer
          </h3>

          <div className="flex flex-col gap-3">
            {[
              {
                label: "From",
                value: `My Account (${profile?.account_number})`,
              },
              {
                label: "To",
                value: `${resolvedUser?.first_name} ${resolvedUser?.last_name}`,
              },
              { label: "Account", value: accountNumber },
              {
                label: "Amount",
                value: formatCurrency(parseFloat(amount)),
                highlight: true,
              },
              { label: "Fee", value: "Free" },
              ...(note ? [{ label: "Note", value: note }] : []),
            ].map(({ label, value, highlight }) => (
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
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: highlight ? "#ccff00" : "var(--text-primary)",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl text-xs"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#f59e0b",
            }}
          >
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            Transfers cannot be reversed once confirmed. Please verify recipient
            details.
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("form")}
              className="flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              ← Back
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 flex items-center justify-center gap-2"
              style={{
                background: "#ccff00",
                color: "#0d0d0d",
                boxShadow: "0 0 20px rgba(204,255,0,0.3)",
              }}
            >
              {loading ? (
                <>
                  <div
                    className="w-4 h-4 rounded-full border-2 animate-spin"
                    style={{
                      borderColor: "#0d0d0d",
                      borderTopColor: "transparent",
                    }}
                  />
                  Processing...
                </>
              ) : (
                "Confirm Transfer"
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Success */}
      {step === "success" && (
        <div
          className="rounded-2xl p-8 flex flex-col items-center gap-6 text-center"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid rgba(34,197,94,0.2)",
          }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center animate-scale-in"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "2px solid rgba(34,197,94,0.3)",
            }}
          >
            <Check size={48} style={{ color: "#22c55e" }} />
          </div>
          <div>
            <h2
              className="text-2xl font-heading font-black mb-2"
              style={{ color: "#22c55e" }}
            >
              Transfer Successful!
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {formatCurrency(parseFloat(amount))} has been sent to{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                {resolvedUser?.first_name} {resolvedUser?.last_name}
              </span>
            </p>
          </div>
          <div
            className="w-full px-5 py-4 rounded-2xl flex items-center justify-between"
            style={{
              background: "var(--bg-hover)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Transaction Reference
            </span>
            <span
              className="text-xs font-bold tracking-wider"
              style={{ color: "var(--text-primary)" }}
            >
              {reference}
            </span>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={handleReset}
              className="flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              New Transfer
            </button>
            <Link
              to="/dashboard"
              className="flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center"
              style={{ background: "#ccff00", color: "#0d0d0d" }}
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
