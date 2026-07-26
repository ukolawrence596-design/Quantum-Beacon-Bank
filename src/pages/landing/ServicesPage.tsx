import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, CreditCard, TrendingUp, Cpu } from "lucide-react";

const SERVICES = [
  {
    title: "Savings Account",
    desc: "Grow your savings with competitive rates, no hidden fees, and easy access to your funds when you need them.",
    icon: Shield,
  },
  {
    title: "Checking Account",
    desc: "Manage everyday spending with secure debit access, instant transfers, and smart budgeting tools.",
    icon: CreditCard,
  },
  {
    title: "Personal Loans",
    desc: "Get fast approval on personal loans with transparent terms and flexible repayment schedules.",
    icon: TrendingUp,
  },
  {
    title: "Virtual Cards",
    desc: "Create virtual cards instantly for safer online purchases and one-time use spending controls.",
    icon: Cpu,
  },
];

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Services | Quantum Beacon Bank";
  }, []);

  return (
    <main className="min-h-screen pt-24 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--text-secondary)" }}>
            Our Services
          </p>
          <h1 className="text-4xl sm:text-5xl font-heading font-black">
            Financial tools built for modern banking.
          </h1>
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
            Explore the services that help you save, spend, borrow, and manage your money with confidence.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-[2rem] p-8 transition-all duration-200 hover:-translate-y-1"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)" }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-3xl mb-5" style={{ background: "rgba(204,255,0,0.08)", color: "#ccff00" }}>
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                  {service.title}
                </h2>
                <p className="text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Ready to start? Join Quantum Beacon Bank and unlock banking that moves as fast as you do.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full bg-[#ccff00] px-8 py-4 text-sm font-bold text-[#0d0d0d] transition-all duration-200 hover:scale-[1.02]"
          >
            Open an account
          </Link>
        </div>
      </div>
    </main>
  );
}
