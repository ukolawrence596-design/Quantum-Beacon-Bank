import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/navigation/AdminSidebar";
import { Menu, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--bg-primary)" }}
    >
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "var(--overlay)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Admin Panel
              </p>
              <p
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Quantum Beacon Bank
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
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

            <button
              className="relative w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <Bell size={15} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "#ef4444" }}
              />
            </button>

            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: "#ef4444", color: "#ffffff" }}
            >
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
