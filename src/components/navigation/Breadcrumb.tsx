import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

const LABEL_OVERRIDES: Record<string, string> = {
  dashboard: "Dashboard",
  transfer: "Transfer",
  receive: "Receive",
  transactions: "Transactions",
  statements: "Statements",
  cards: "Cards",
  loans: "Loans",
  mortgage: "Mortgage",
  profile: "Profile",
  security: "Security",
  notifications: "Notifications",
  support: "Support",
  about: "About",
  careers: "Careers",
  contact: "Contact",
  services: "Services",
  faq: "FAQ",
};

function formatLabel(segment: string) {
  if (LABEL_OVERRIDES[segment]) return LABEL_OVERRIDES[segment];
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export default function Breadcrumb() {
  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      label: formatLabel(segment),
      path: "",
    }));

  const breadcrumbs = [{ label: "Home", path: "/" }, ...segments].map((item, index, array) => {
    if (index === 0) return item;
    const path = array.slice(1, index + 1).reduce((acc, segment) => `${acc}/${segment.label.toLowerCase().replace(/ /g, "-")}`, "");
    return {
      ...item,
      path: path || "/",
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={`${breadcrumb.label}-${breadcrumb.path}-${index}`} className="flex items-center gap-3">
              {!isLast ? (
                <Link
                  to={breadcrumb.path}
                  className={cn(
                    "transition-colors duration-200 hover:text-[var(--text-primary)]",
                    isLast ? "text-[var(--text-primary)] font-semibold" : "",
                  )}
                  style={{ color: isLast ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {breadcrumb.label}
                </span>
              )}
              {!isLast && <ChevronRight size={14} className="text-[var(--text-muted)]" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
