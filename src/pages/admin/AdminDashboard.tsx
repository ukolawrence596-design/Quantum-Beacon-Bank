import { useState, useEffect } from "react";
import {
  Users,
  ArrowLeftRight,
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Landmark,
  DollarSign,
} from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatRelativeTime } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import { supabase } from "../../services/api";
import ActivityChart from "../../components/admin/ActivityChart";
import StatsWidget from "../../components/admin/StatsWidget";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalTransactions: 0,
    totalVolume: 0,
    pendingLoans: 0,
    failedTx: 0,
    activeCards: 0,
  });
  const [recentTx, setRecentTx] = useState<any[]>([]);
  const [recentCustomers, setRecentCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"today" | "week" | "month">("today");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load all data in parallel
      const [profilesRes, transactionsRes, loansRes, cardsRes] =
        await Promise.all([
          supabase.from("profiles").select("*").eq("role", "customer"),
          supabase
            .from("transactions")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(100),
          supabase.from("loans").select("*").eq("status", "pending"),
          supabase.from("cards").select("*").eq("status", "active"),
        ]);

      const customers = profilesRes.data || [];
      const transactions = transactionsRes.data || [];
      const loans = loansRes.data || [];
      const cards = cardsRes.data || [];

      // Calculate total volume
      const totalVolume = transactions
        .filter((t) => t.status === "successful")
        .reduce((sum: number, t: any) => sum + parseFloat(t.amount || 0), 0);

      setStats({
        totalCustomers: customers.length,
        totalTransactions: transactions.length,
        totalVolume,
        pendingLoans: loans.length,
        failedTx: transactions.filter((t: any) => t.status === "failed").length,
        activeCards: cards.length,
      });

      // Recent transactions with profile info
      const recentTransactions = transactions.slice(0, 5);
      const txWithProfiles = await Promise.all(
        recentTransactions.map(async (tx: any) => {
          const { data: senderProfile } = await supabase
            .from("profiles")
            .select("first_name, last_name, email")
            .eq("id", tx.sender_id)
            .single();
          return { ...tx, senderProfile };
        }),
      );
      setRecentTx(txWithProfiles);

      // Recent customers (last 4)
      const recent = customers
        .sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 4);
      setRecentCustomers(recent);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const STATUS_CONFIG: Record<
    string,
    { color: string; bg: string; icon: typeof CheckCircle }
  > = {
    successful: {
      color: "#22c55e",
      bg: "rgba(34,197,94,0.1)",
      icon: CheckCircle,
    },
    processing: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: Clock },
    failed: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: XCircle },
    cancelled: { color: "#6b7280", bg: "rgba(107,114,128,0.1)", icon: XCircle },
  };

  const STATS_CONFIG = [
    {
      label: "Total Customers",
      value: stats.totalCustomers.toString(),
      change: "",
      positive: true,
      icon: Users,
      color: "#3b82f6",
      path: "/admin/customers",
    },
    {
      label: "Total Transactions",
      value: stats.totalTransactions.toString(),
      change: "",
      positive: true,
      icon: ArrowLeftRight,
      color: "#ccff00",
      path: "/admin/transactions",
    },
    {
      label: "Total Volume",
      value: formatCurrency(stats.totalVolume),
      change: "",
      positive: true,
      icon: DollarSign,
      color: "#22c55e",
      path: "/admin/transactions",
    },
    {
      label: "Active Cards",
      value: stats.activeCards.toString(),
      change: "",
      positive: true,
      icon: CreditCard,
      color: "#a855f7",
      path: "/admin/cards",
    },
    {
      label: "Pending Loans",
      value: stats.pendingLoans.toString(),
      change: "",
      positive: false,
      icon: Landmark,
      color: "#f59e0b",
      path: "/admin/loans",
    },
    {
      label: "Failed Transactions",
      value: stats.failedTx.toString(),
      change: "",
      positive: true,
      icon: AlertCircle,
      color: "#ef4444",
      path: "/admin/transactions",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Admin <span style={{ color: "#ef4444" }}>Dashboard</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Real-time overview of Quantum Beacon Bank
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--bg-elevated)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            ↻ Refresh
          </button>

          <div
            className="flex items-center rounded-full p-1 gap-1"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            {(["today", "week", "month"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all duration-200"
                style={{
                  background: period === p ? "#ef4444" : "transparent",
                  color: period === p ? "#ffffff" : "var(--text-secondary)",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 rounded-2xl skeleton" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {STATS_CONFIG.map(
            ({ label, value, positive, icon: Icon, color, path }) => (
              <Link
                key={label}
                to={path}
                className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.02] group"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="flex items-center gap-1">
                    {positive ? (
                      <TrendingUp size={12} style={{ color: "#22c55e" }} />
                    ) : (
                      <TrendingDown size={12} style={{ color: "#ef4444" }} />
                    )}
                  </div>
                </div>
                <div>
                  <p
                    className="text-2xl font-heading font-black"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {label}
                  </p>
                </div>
              </Link>
            ),
          )}
        </div>
      )}

      <div className="grid xl:grid-cols-[1.25fr_0.75fr] gap-6">
        <ActivityChart />
        <StatsWidget
          title="Snapshot"
          subtitle="Operational highlights"
          items={[
            { label: "Customers", value: stats.totalCustomers, icon: Users, color: "#3b82f6" },
            { label: "Volume", value: formatCurrency(stats.totalVolume), icon: DollarSign, color: "#22c55e" },
            { label: "Pending", value: stats.pendingLoans, icon: Landmark, color: "#f59e0b" },
          ]}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div
          className="rounded-2xl p-6 flex flex-col gap-4"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <div className="flex items-center justify-between">
            <h3
              className="font-heading font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Recent Transactions
            </h3>
            <Link
              to="/admin/transactions"
              className="text-xs font-semibold hover:opacity-80"
              style={{ color: "#ef4444" }}
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-xl skeleton" />
              ))}
            </div>
          ) : recentTx.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <p className="text-3xl">💳</p>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                No transactions yet
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Transactions will appear here
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentTx.map((tx: any) => {
                const cfg =
                  STATUS_CONFIG[tx.status] || STATUS_CONFIG.processing;
                const Icon = cfg.icon;
                return (
                  <div
                    key={tx.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "var(--bg-hover)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-semibold truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {tx.senderProfile
                          ? `${tx.senderProfile.first_name} ${tx.senderProfile.last_name}`
                          : tx.sender_account}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {tx.type} • {formatRelativeTime(tx.created_at)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className="text-xs font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {formatCurrency(tx.amount)}
                      </p>
                      <p
                        className="text-xs capitalize"
                        style={{ color: cfg.color }}
                      >
                        {tx.status}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Customers */}
        <div
          className="rounded-2xl p-6 flex flex-col gap-4"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <div className="flex items-center justify-between">
            <h3
              className="font-heading font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Recent Customers
            </h3>
            <Link
              to="/admin/customers"
              className="text-xs font-semibold hover:opacity-80"
              style={{ color: "#ef4444" }}
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-xl skeleton" />
              ))}
            </div>
          ) : recentCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <p className="text-3xl">👥</p>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                No customers yet
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Registered customers will appear here
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentCustomers.map((customer: any) => (
                <div
                  key={customer.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "var(--bg-hover)" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ background: "#ef444420", color: "#ef4444" }}
                  >
                    {customer.first_name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {customer.first_name} {customer.last_name}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {customer.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                      style={{
                        background:
                          customer.status === "active"
                            ? "rgba(34,197,94,0.1)"
                            : "rgba(245,158,11,0.1)",
                        color:
                          customer.status === "active" ? "#22c55e" : "#f59e0b",
                      }}
                    >
                      {customer.status}
                    </span>
                    <button style={{ color: "var(--text-muted)" }}>
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Admin Actions */}
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
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Top Up Account",
              path: "/admin/topup",
              color: "#ccff00",
              icon: DollarSign,
            },
            {
              label: "View Customers",
              path: "/admin/customers",
              color: "#3b82f6",
              icon: Users,
            },
            {
              label: "Manage Loans",
              path: "/admin/loans",
              color: "#f59e0b",
              icon: Landmark,
            },
            {
              label: "View Cards",
              path: "/admin/cards",
              color: "#a855f7",
              icon: CreditCard,
            },
          ].map(({ label, path, color, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl text-center transition-all duration-200 hover:scale-105 group"
              style={{
                background: "var(--bg-hover)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${color}15` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--text-secondary)" }}
              >
                {label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
