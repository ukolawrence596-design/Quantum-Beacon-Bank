import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

interface NavLink {
  label: string;
  path: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
}: MobileMenuProps) {
  const location = useLocation();
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300 lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        style={{ background: "var(--overlay)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-72 z-50 transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{
          background: "var(--bg-secondary)",
          borderLeft: "1px solid var(--border-primary)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6"
          style={{ borderBottom: "1px solid var(--border-primary)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <img
                src={logoSrc}
                alt="Quantum Beacon Bank logo"
                className="w-5 h-5 object-contain"
              />
            </div>
            <span
              className="font-heading font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              QBBank
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "var(--bg-elevated)",
              color: "var(--text-secondary)",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="p-6 flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                `animate-fade-in-right delay-${(index + 1) * 100}`,
                location.pathname === link.path
                  ? "text-[#0d0d0d]"
                  : "hover:text-[var(--text-primary)]",
              )}
              style={{
                background:
                  location.pathname === link.path
                    ? "var(--accent-primary)"
                    : "transparent",
                color:
                  location.pathname === link.path
                    ? "#0d0d0d"
                    : "var(--text-secondary)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3"
          style={{ borderTop: "1px solid var(--border-primary)" }}
        >
          <Link
            to="/register"
            onClick={onClose}
            className="btn-secondary text-center text-sm py-3"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            onClick={onClose}
            className="btn-primary text-center text-sm py-3"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
