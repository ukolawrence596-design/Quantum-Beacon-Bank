import { Activity, BarChart3, CreditCard, ShieldCheck } from "lucide-react";

const STATS = [
  {
    icon: BarChart3,
    value: "98%",
    label: "Approval rate",
    description: "Customers enjoy fast loan approvals with fewer delays.",
  },
  {
    icon: CreditCard,
    value: "$12B+",
    label: "Processed payments",
    description: "Trusted payments processed safely across the globe.",
  },
  {
    icon: ShieldCheck,
    value: "24/7",
    label: "Customer support",
    description: "Dedicated support available day or night for every customer.",
  },
  {
    icon: Activity,
    value: "4.9/5",
    label: "Customer rating",
    description: "Outstanding feedback from users who love our banking platform.",
  },
];

export default function StatsSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div className="container-custom relative z-10">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
            Bank performance
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
            Real banking results you can trust
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Quantum Beacon Bank delivers modern banking that supports growth, security and excellent customer satisfaction.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label, description }) => (
            <div
              key={label}
              className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-3xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
                    {value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.35em] font-semibold mt-2" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-3xl flex items-center justify-center"
                  style={{ background: "rgba(204,255,0,0.12)", color: "#ccff00" }}
                >
                  <Icon size={20} />
                </div>
              </div>
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
