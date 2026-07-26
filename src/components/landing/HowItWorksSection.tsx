import { ShieldCheck, Sparkles, Users, Zap } from "lucide-react";

const STEPS = [
  {
    icon: Sparkles,
    title: "Open an account",
    description:
      "Sign up in minutes and get instant access to a secure digital banking experience built for modern customers.",
  },
  {
    icon: ShieldCheck,
    title: "Secure your funds",
    description:
      "Enjoy bank-grade security with encrypted transactions, fraud monitoring, and 24/7 protection for every payment.",
  },
  {
    icon: Users,
    title: "Manage on the go",
    description:
      "Track balances, send transfers, pay bills and view analytics with a beautiful mobile-first banking dashboard.",
  },
  {
    icon: Zap,
    title: "Grow your wealth",
    description:
      "Use smart savings, fast transfers and personalized tools to build a stronger financial future.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-black max-w-2xl" style={{ color: "var(--text-primary)" }}>
            Get started in three simple steps
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Quantum Beacon Bank makes smart banking easy. Open your account, secure your money and manage your finances with confidence.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="relative rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
                style={{ background: "rgba(204,255,0,0.12)", color: "#ccff00" }}
              >
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
