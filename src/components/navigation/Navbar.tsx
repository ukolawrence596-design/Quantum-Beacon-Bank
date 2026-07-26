import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "../../utils/cn";
import MobileMenu from "./MobileMenu";
import LanguageSelector from "../special/LanguageSelector";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "FAQ", path: "/faq" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Security", path: "/security" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3 shadow-lg" : "py-5",
        )}
        style={{
          background: scrolled ? "var(--navbar-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-primary)" : "none",
        }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <img
                src={logoSrc}
                alt="Quantum Beacon Bank logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <span
              className="font-heading font-bold text-lg hidden sm:block"
              style={{ color: "var(--text-primary)" }}
            >
              Quantum <span style={{ color: "#ccff00" }}>Beacon</span> Bank
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-all duration-200 relative group",
                    location.pathname === link.path
                      ? "text-[var(--accent-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300",
                      location.pathname === link.path
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    )}
                    style={{ background: "var(--accent-primary)" }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Sign Up */}
            <Link
              to="/register"
              className="text-sm font-medium transition-all duration-200 hover:text-[var(--accent-primary)]"
              style={{ color: "var(--text-secondary)" }}
            >
              Sign Up
            </Link>

            {/* Login Button */}
            <Link to="/login" className="btn-primary text-sm py-2 px-5">
              Login
            </Link>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-primary)",
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={NAV_LINKS && mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
}
