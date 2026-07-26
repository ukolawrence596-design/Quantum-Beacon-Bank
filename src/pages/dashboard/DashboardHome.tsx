import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  ArrowLeftRight,
  Download,
  CreditCard,
  Landmark,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatRelativeTime } from "../../utils/formatDate";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/api";

const QUICK_ACTIONS = [
  {
    icon: ArrowLeftRight,
    label: "Transfer",
    path: "/dashboard/transfer",
    color: "#ccff00",
  },
  {
    icon: Download,
    label: "Receive",
    path: "/dashboard/receive",
    color: "#3b82f6",
  },
  {
    icon: CreditCard,
    label: "Cards",
    path: "/dashboard/cards",
    color: "#a855f7",
  },
  {
    icon: Landmark,
    label: "Loans",
    path: "/dashboard/loans",
    color: "#f59e0b",
  },
];

interface Transaction {
  id: string;
  sender_id: string;
  receiver_id: string;
  sender_account: string;
  receiver_account: string;
  amount: number;
  type: string;
  status: string;
  note: string;
  reference: string;
  created_at: string;
}

export default function DashboardHome() {
  const [hideBalance, setHideBalance] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txLoading, setTxLoading] = useState(true);
  const { profile, user, refreshProfile } = useAuth();

  const balance = profile?.balance || 0;
  const firstName = profile?.first_name || "User";
  const lastName = profile?.last_name || "";
  const accountNum = profile?.account_number
    ? profile.account_number.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
    : "•••• •••• ••••";

  useEffect(() => {
    if (!user?.id) return

    // Load initial transactions
    const loadTransactions = async () => {
      try {
        setTxLoading(true)
        const { data } = await supabase
          .from('transactions')
          .select('*')
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false })
          .limit(5)
        setTransactions(data || [])
      } catch (err) {
        console.error('Failed to load transactions:', err)
      } finally {
        setTxLoading(false)
      }
    }

    loadTransactions()

    // Subscribe to profile balance changes in real-time
    const profileChannel = supabase
      .channel(`profile-${user.id}`)
      .on(
        'postgres_changes',
        {
          event:  '*',
          schema: 'public',
          table:  'profiles',
          filter: `id=eq.${user.id}`,
        },
        async () => {
          // Refresh profile to get new balance
          await refreshProfile()
        }
      )
      .subscribe()

    // Subscribe to new transactions in real-time
    const txChannel = supabase
      .channel(`transactions-${user.id}`)
      .on(
        'postgres_changes',
        {
          event:  'INSERT',
          schema: 'public',
          table:  'transactions',
        },
        async (payload: any) => {
          const tx = payload.new
          // Only update if this transaction involves current user
          if (tx.sender_id === user.id || tx.receiver_id === user.id) {
            await loadTransactions()
            await refreshProfile()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(profileChannel)
      supabase.removeChannel(txChannel)
    }
  }, [user?.id, refreshProfile])

  const STATS = [
    {
      label: "Total Income",
      value: 0,
      change: "+0%",
      positive: true,
      icon: TrendingUp,
    },
    {
      label: "Total Expenses",
      value: 0,
      change: "+0%",
      positive: false,
      icon: TrendingDown,
    },
    {
      label: "Total Savings",
      value: balance,
      change: "",
      positive: true,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Welcome back,{" "}
            <span style={{ color: "#ccff00" }}>
              {firstName} {lastName}!
            </span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Here's what's happening with your account today.
          </p>
        </div>
        <Link
          to="/dashboard/transfer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
          style={{
            background: "#ccff00",
            color: "#0d0d0d",
            boxShadow: "0 0 15px rgba(204,255,0,0.3)",
          }}
        >
          <Plus size={16} />
          New Transfer
        </Link>
      </div>

      {/* Balance Card + Stats */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Main Balance Card */}
        <div
          className="lg:col-span-1 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
          style={{
            background: `radial-gradient(
              ellipse at top right,
              rgba(204,255,0,0.15) 0%,
              transparent 60%
            ), var(--bg-elevated)`,
            border: "1px solid rgba(204,255,0,0.2)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ccff00 1px, transparent 1px)",
              backgroundSize: "12px 12px",
              maskImage:
                "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
            }}
          />

          <div className="flex items-center justify-between">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Total Balance
            </p>
            <button
              onClick={() => setHideBalance((p) => !p)}
              style={{ color: "var(--text-muted)" }}
            >
              {hideBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div>
            <h2
              className="text-4xl font-heading font-black"
              style={{ color: "var(--text-primary)" }}
            >
              {hideBalance ? "••••••" : formatCurrency(balance)}
            </h2>
            <p
              className="text-xs mt-1 flex items-center gap-1"
              style={{ color: "#22c55e" }}
            >
              <TrendingUp size={12} />
              Account Active
            </p>
          </div>

          {/* Account Number */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: "var(--bg-hover)" }}
          >
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Account Number
              </p>
              <p
                className="text-sm font-semibold tracking-wider mt-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                {hideBalance ? "•••• •••• ••••" : accountNum}
              </p>
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(34,197,94,0.1)",
                color: "#22c55e",
              }}
            >
              Active
            </div>
          </div>

          {/* Income / Expense */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="flex flex-col gap-1 p-3 rounded-xl"
              style={{ background: "rgba(34,197,94,0.08)" }}
            >
              <div className="flex items-center gap-1">
                <ArrowDownLeft size={14} style={{ color: "#22c55e" }} />
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Income
                </p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#22c55e" }}>
                {hideBalance ? "••••" : "+$0.00"}
              </p>
            </div>
            <div
              className="flex flex-col gap-1 p-3 rounded-xl"
              style={{ background: "rgba(239,68,68,0.08)" }}
            >
              <div className="flex items-center gap-1">
                <ArrowUpRight size={14} style={{ color: "#ef4444" }} />
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Expenses
                </p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#ef4444" }}>
                {hideBalance ? "••••" : "-$0.00"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats + Quick Actions */}
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          {STATS.map(({ label, value, change, positive, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <div className="flex items-center justify-between">
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </p>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: positive
                      ? "rgba(34,197,94,0.1)"
                      : "rgba(239,68,68,0.1)",
                  }}
                >
                  <Icon
                    size={16}
                    style={{ color: positive ? "#22c55e" : "#ef4444" }}
                  />
                </div>
              </div>
              <p
                className="text-2xl font-heading font-black"
                style={{ color: "var(--text-primary)" }}
              >
                {hideBalance ? "" : formatCurrency(value)}
              </p>
              {change && (
                <p
                  className="text-xs font-medium"
                  style={{ color: positive ? "#22c55e" : "#ef4444" }}
                >
                  {change} this month
                </p>
              )}
            </div>
          ))}

          {/* Quick Actions */}
          <div
            className="sm:col-span-3 rounded-2xl p-5"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Quick Actions
            </p>
            <div className="grid grid-cols-4 gap-3">
              {QUICK_ACTIONS.map(({ icon: Icon, label, path, color }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 hover:scale-105 group"
                  style={{
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p
                    className="text-xs font-medium text-center"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className="font-heading font-bold text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            Recent Transactions
          </h3>
          <Link
            to="/dashboard/transactions"
            className="text-xs font-semibold transition-colors duration-200 hover:opacity-80"
            style={{ color: "#ccff00" }}
          >
            View All
          </Link>
        </div>

        {txLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl skeleton" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <p className="text-4xl"></p>
            <p
              className="font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              No transactions yet
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Your transactions will appear here
            </p>
            <Link
              to="/dashboard/transfer"
              className="mt-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{ background: "#ccff00", color: "#0d0d0d" }}
            >
              Make First Transfer
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {transactions.map((tx) => {
              const isReceive = tx.receiver_id === user?.id;
              const txColor = isReceive ? "#22c55e" : "#ef4444";
              const statusColor =
                tx.status === "successful"
                  ? "#22c55e"
                  : tx.status === "processing"
                    ? "#f59e0b"
                    : "#ef4444";

              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    background: "var(--bg-hover)",
                    border: "1px solid transparent",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{
                      background: `${txColor}15`,
                      color: txColor,
                    }}
                  >
                    {isReceive ? (
                      <ArrowDownLeft size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {isReceive
                        ? `From: ${tx.sender_account}`
                        : `To: ${tx.receiver_account}`}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {formatRelativeTime(tx.created_at)} {tx.reference}
                    </p>
                  </div>

                  <div
                    className="hidden sm:flex px-2 py-1 rounded-full text-xs font-medium capitalize"
                    style={{
                      background: `${statusColor}15`,
                      color: statusColor,
                    }}
                  >
                    {tx.status}
                  </div>

                  <p
                    className="text-sm font-bold shrink-0"
                    style={{ color: txColor }}
                  >
                    {isReceive ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
