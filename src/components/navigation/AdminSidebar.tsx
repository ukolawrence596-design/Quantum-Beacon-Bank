import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  CreditCard,
  Landmark,
  Shield,
  Settings,
  FileText,
  LogOut,
  X,
  TrendingUp,
} from "lucide-react";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  {
    group: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
      { icon: TrendingUp, label: "Analytics", path: "/admin/analytics" },
    ],
  },
  {
    group: "Management",
    items: [
      { icon: Users, label: "Customers", path: "/admin/customers" },
      {
        icon: ArrowLeftRight,
        label: "Transactions",
        path: "/admin/transactions",
      },
      { icon: CreditCard, label: "Top Up", path: "/admin/topup" },
      { icon: CreditCard, label: "Cards", path: "/admin/cards" },
      { icon: Landmark, label: "Loans", path: "/admin/loans" },
    ],
  },
  {
    group: "System",
    items: [
      { icon: Shield, label: "Security", path: "/admin/security" },
      { icon: FileText, label: "Activity Logs", path: "/admin/logs" },
      { icon: Settings, label: "Settings", path: "/admin/settings" },
    ],
  },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Admin logout failed:", error);
    } finally {
      navigate("/login");
    }
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full z-40 w-64 flex flex-col transition-transform duration-300",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
      style={{
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-primary)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center justify-between p-6"
        style={{ borderBottom: "1px solid var(--border-primary)" }}
      >
        <Link to="/admin" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <img src="/logo.png" alt="QB" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p
              className="font-heading font-bold text-sm leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              QBB <span style={{ color: "#ef4444" }}>Admin</span>
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              Control Panel
            </p>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="lg:hidden w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--text-muted)",
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Admin Badge */}
      <div
        className="flex items-center gap-3 p-4 mx-4 mt-4 rounded-2xl"
        style={{
          background: "rgba(239,68,68,0.05)",
          border: "1px solid rgba(239,68,68,0.15)",
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
          style={{ background: "#ef4444", color: "#ffffff" }}
        >
          A
        </div>
        <div className="flex flex-col min-w-0">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: "var(--text-primary)" }}
          >
            Super Admin
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "var(--text-muted)" }}
          >
            admin@qbb.com
          </p>
        </div>
        <div
          className="w-2 h-2 rounded-full shrink-0 animate-pulse"
          style={{ background: "#22c55e" }}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 mt-2">
        {NAV_ITEMS.map((group) => (
          <div key={group.group}>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
              style={{ color: "var(--text-muted)" }}
            >
              {group.group}
            </p>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive ? "scale-[1.02]" : "hover:scale-[1.01]",
                      )}
                      style={{
                        background: isActive
                          ? "rgba(239,68,68,0.1)"
                          : "transparent",
                        color: isActive ? "#ef4444" : "var(--text-secondary)",
                        border: isActive
                          ? "1px solid rgba(239,68,68,0.2)"
                          : "1px solid transparent",
                      }}
                    >
                      <Icon size={16} />
                      {item.label}
                      {isActive && (
                        <span
                          className="ml-auto w-1.5 h-1.5 rounded-full"
                          style={{ background: "#ef4444" }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div
        className="p-4"
        style={{ borderTop: "1px solid var(--border-primary)" }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
          style={{
            background: "rgba(239,68,68,0.08)",
            color: "#ef4444",
            border: "1px solid rgba(239,68,68,0.15)",
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
