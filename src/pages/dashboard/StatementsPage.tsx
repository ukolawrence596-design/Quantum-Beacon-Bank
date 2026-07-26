import { useState, useEffect } from "react";
import { Download, FileText, Calendar, Send } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function StatementsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { user, profile } = useAuth();
  const { showSuccess } = useToast();

  useEffect(() => {
    if (!user?.id) return;
    loadTransactions();
  }, [user?.id]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .or(`sender_id.eq.${user!.id},receiver_id.eq.${user!.id}`)
        .order("created_at", { ascending: false });
      setTransactions(data || []);
    } catch (err) {
      console.error("Load transactions error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Group by month
  const groupByMonth = (txs: any[]) => {
    const groups: Record<string, any[]> = {};
    txs.forEach((tx) => {
      const date = new Date(tx.created_at);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const label = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      if (!groups[key]) groups[key] = [];
      groups[key].push({ ...tx, monthLabel: label });
    });
    return groups;
  };

  const monthlyGroups = groupByMonth(transactions);

  const getMonthStats = (txs: any[]) => {
    let income = 0;
    let expenses = 0;
    txs.forEach((tx) => {
      if (tx.receiver_id === user?.id || tx.type === "topup") {
        income += parseFloat(tx.amount);
      } else {
        expenses += parseFloat(tx.amount);
      }
    });
    return { income, expenses, net: income - expenses };
  };

  const handleRequestStatement = async () => {
    setRequesting(true);
    // Send notification to admin
    await supabase.from("notifications").insert({
      user_id: user?.id,
      title: "Statement Requested",
      message: `${profile?.first_name} ${profile?.last_name} has requested an account statement${fromDate && toDate ? ` from ${fromDate} to ${toDate}` : ""}.`,
      type: "info",
    });
    showSuccess("Statement request sent! Admin will process it shortly.");
    setRequesting(false);
  };

  const downloadStatement = (monthKey: string, txs: any[]) => {
    const stats = getMonthStats(txs);
    const label = txs[0]?.monthLabel || monthKey;

    let content = `QUANTUM BEACON BANK\n`;
    content += `Account Statement — ${label}\n`;
    content += `Account Holder: ${profile?.first_name} ${profile?.last_name}\n`;
    content += `Account Number: ${profile?.account_number}\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `${"─".repeat(60)}\n\n`;
    content += `SUMMARY\n`;
    content += `Total Income:   ${formatCurrency(stats.income)}\n`;
    content += `Total Expenses: ${formatCurrency(stats.expenses)}\n`;
    content += `Net:            ${formatCurrency(stats.net)}\n\n`;
    content += `${"─".repeat(60)}\n`;
    content += `TRANSACTIONS\n`;
    content += `${"─".repeat(60)}\n`;

    txs.forEach((tx) => {
      const isReceive = tx.receiver_id === user?.id || tx.type === "topup";
      const sign = isReceive ? "+" : "-";
      const date = new Date(tx.created_at).toLocaleDateString();
      content += `${date}  ${sign}${formatCurrency(tx.amount).padEnd(12)}  ${tx.reference}  ${tx.status}\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `QBBank-Statement-${monthKey}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputStyle = {
    background: "var(--bg-input)",
    border: "1px solid var(--border-primary)",
    color: "var(--text-primary)",
    outline: "none",
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Account <span style={{ color: "#ccff00" }}>Statements</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Download your monthly account statements
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Income",
            value: transactions
              .filter((t) => t.receiver_id === user?.id || t.type === "topup")
              .reduce((s, t) => s + parseFloat(t.amount), 0),
            color: "#22c55e",
          },
          {
            label: "Total Expenses",
            value: transactions
              .filter((t) => t.sender_id === user?.id && t.type !== "topup")
              .reduce((s, t) => s + parseFloat(t.amount), 0),
            color: "#ef4444",
          },
          {
            label: "Current Balance",
            value: profile?.balance || 0,
            color: "#ccff00",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4 flex flex-col gap-2"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {label}
            </p>
            <p className="text-xl font-heading font-black" style={{ color }}>
              {formatCurrency(value)}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly Statements */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl skeleton" />
          ))}
        </div>
      ) : Object.keys(monthlyGroups).length === 0 ? (
        <div
          className="rounded-2xl p-10 flex flex-col items-center gap-3 text-center"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <FileText size={40} style={{ color: "var(--text-muted)" }} />
          <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
            No statements yet
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Statements will be generated as you make transactions
          </p>
        </div>
      ) : (
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
            <span className="col-span-2">Period</span>
            <span>Income</span>
            <span>Expenses</span>
            <span>Action</span>
          </div>

          {Object.entries(monthlyGroups).map(([key, txs], index, arr) => {
            const stats = getMonthStats(txs);
            const label = txs[0]?.monthLabel || key;
            return (
              <div
                key={key}
                className="grid grid-cols-5 gap-4 items-center px-6 py-4 transition-all duration-200 hover:bg-[var(--bg-hover)]"
                style={{
                  borderBottom:
                    index < arr.length - 1
                      ? "1px solid var(--border-primary)"
                      : "none",
                }}
              >
                <div className="col-span-2 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(204,255,0,0.1)" }}
                  >
                    <FileText size={16} style={{ color: "#ccff00" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {txs.length} transactions
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#22c55e" }}
                >
                  +{formatCurrency(stats.income)}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#ef4444" }}
                >
                  -{formatCurrency(stats.expenses)}
                </p>
                <button
                  onClick={() => downloadStatement(key, txs)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 w-fit"
                  style={{
                    background: "var(--bg-hover)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  <Download size={12} />
                  Download
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Request Custom Statement */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} style={{ color: "#ccff00" }} />
          <h3
            className="font-heading font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Request Custom Statement
          </h3>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Need a statement for a specific date range? Request one from admin and
          it will be processed within 24 hours.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-4 py-3 rounded-full text-sm"
              style={inputStyle}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-4 py-3 rounded-full text-sm"
              style={inputStyle}
            />
          </div>
        </div>
        <button
          onClick={handleRequestStatement}
          disabled={requesting}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 w-fit disabled:opacity-50"
          style={{
            background: "#ccff00",
            color: "#0d0d0d",
            boxShadow: "0 0 15px rgba(204,255,0,0.2)",
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
              Sending Request...
            </>
          ) : (
            <>
              <Send size={14} /> Request Statement
            </>
          )}
        </button>
      </div>
    </div>
  );
}
