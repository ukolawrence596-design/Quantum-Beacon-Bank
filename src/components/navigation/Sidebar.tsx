import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Download,
  History,
  FileText,
  CreditCard,
  User,
  Shield,
  Bell,
  HeadphonesIcon,
  LogOut,
  X,
  Landmark,
  Home,
} from "lucide-react";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  {
    group: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: ArrowLeftRight, label: "Transfer", path: "/dashboard/transfer" },
      { icon: Download, label: "Receive", path: "/dashboard/receive" },
      { icon: History, label: "Transactions", path: "/dashboard/transactions" },
      { icon: FileText, label: "Statements", path: "/dashboard/statements" },
    ],
  },
  {
    group: "Products",
    items: [
      { icon: CreditCard, label: "My Cards", path: "/dashboard/cards" },
      { icon: Landmark, label: "Loans", path: "/dashboard/loans" },
      { icon: Home, label: "Mortgage", path: "/dashboard/mortgage" },
    ],
  },
  {
    group: "Account",
    items: [
      { icon: User, label: "Profile", path: "/dashboard/profile" },
      { icon: Shield, label: "Security", path: "/dashboard/security" },
      { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
      { icon: HeadphonesIcon, label: "Support", path: "/dashboard/support" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`.trim() || "User"
    : "User"
  const email = profile?.email || ""
  const initials = profile
    ? `${profile.first_name?.charAt(0) || ""}${profile.last_name?.charAt(0) || ""}`.toUpperCase() || "U"
    : "U"

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
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
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <img src="/logo.png" alt="QB" className="w-6 h-6 object-contain" />
          </div>
          <span
            className="font-heading font-bold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            Quantum <span style={{ color: "#ccff00" }}>Beacon</span>
          </span>
        </Link>

        {/* Close button — mobile only */}
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

      {/* User Info */}
      <div
        className="flex items-center gap-3 p-4 mx-4 mt-4 rounded-2xl"
        style={{
          background: "rgba(204,255,0,0.05)",
          border: "1px solid rgba(204,255,0,0.1)",
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
          style={{ background: "#ccff00", color: "#0d0d0d" }}
        >
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {fullName}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "var(--text-muted)" }}
          >
            {email}
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
            {/* Group Label */}
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
              style={{ color: "var(--text-muted)" }}
            >
              {group.group}
            </p>

            {/* Items */}
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
                          ? "rgba(204,255,0,0.1)"
                          : "transparent",
                        color: isActive ? "#ccff00" : "var(--text-secondary)",
                        border: isActive
                          ? "1px solid rgba(204,255,0,0.15)"
                          : "1px solid transparent",
                      }}
                    >
                      <Icon size={16} />
                      {item.label}
                      {isActive && (
                        <span
                          className="ml-auto w-1.5 h-1.5 rounded-full"
                          style={{ background: "#ccff00" }}
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
