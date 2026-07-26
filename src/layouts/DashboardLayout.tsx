import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import Breadcrumb from "../components/navigation/Breadcrumb";
import { Menu, Bell, Search } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SmartSuppChat from "../components/special/SmartSuppChat";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { profile } = useAuth();
  const initials = `${profile?.first_name?.charAt(0) || "U"}${profile?.last_name?.charAt(0) || ""}`.toUpperCase();

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "var(--overlay)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Top Header */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-4 lg:px-8 py-4"
          style={{
            background: "var(--navbar-bg)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border-primary)",
          }}
        >
          {/* Left — Hamburger + Search */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <Menu size={18} />
            </button>

            {/* Search bar */}
            <div className="relative hidden md:flex items-center">
              <Search
                size={15}
                className="absolute left-3"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-9 pr-4 py-2 rounded-full text-sm w-64"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-primary)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Right — Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Notifications */}
            <button
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <Bell size={15} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "#ccff00" }}
              />
            </button>

            {/* Avatar */}
            <Link to="/dashboard/profile">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  background: "#ccff00",
                  color: "#0d0d0d",
                }}
              >
                {initials}
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
      {/* Smartsupp — passes logged in user info */}
      <SmartSuppChat name="John Doe" email="john.doe@example.com" />
    </div>
  );
}
