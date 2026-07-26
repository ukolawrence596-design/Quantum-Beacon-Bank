import { useEffect, useState } from "react";
import { ChevronDown, LifeBuoy, ShieldCheck, Sparkles, Smile } from "lucide-react";

const FAQS = [
  {
    q: "How do I open an account?",
    a: "Click Sign Up and follow the registration flow. We guide you through verification and onboarding so you can start banking securely in minutes.",
  },
  {
    q: "How long do transfers take?",
    a: "Most transfers are instant within our network. External bank transfers may take 1–3 business days depending on the recipient institution.",
  },
  {
    q: "How do I reset my password?",
    a: "Use the Forgot Password link on the login page to receive reset instructions by email. Follow the secure steps to update your password instantly.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We protect your account with bank-grade encryption, secure authentication, and optional multi-factor verification for added safety.",
  },
  {
    q: "What makes Quantum Beacon different?",
    a: "We combine intuitive digital banking with fast support, powerful tools, and modern security so you can manage your money with confidence.",
  },
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Secure by design",
    description: "Your account and transactions are protected by advanced encryption and security monitoring.",
  },
  {
    icon: Sparkles,
    title: "Fast setup",
    description: "Open an account quickly with guided registration and instant access to digital banking tools.",
  },
  {
    icon: LifeBuoy,
    title: "Support when you need it",
    description: "Our team is available to help you with account setup, transfers, and security questions.",
  },
  {
    icon: Smile,
    title: "Customer-first experience",
    description: "We design our products around your needs for a simple, intuitive banking journey.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = "FAQ | Quantum Beacon Bank";
  }, []);

  return (
    <main className="min-h-screen pt-24 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--text-secondary)" }}>
              FAQs
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-black">Frequently Asked Questions</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              Find quick answers to the most common questions about opening an account, transfers, security, and support.
            </p>
          </div>

          <div className="grid gap-4">
            {FAQS.map((faq, index) => (
              <article
                key={faq.q}
                className="rounded-[2rem] p-6 transition-all duration-200"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                >
                  <div>
                    <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                      {faq.q}
                    </h2>
                  </div>
                  <ChevronDown
                    size={20}
                    className={openIndex === index ? "rotate-180 transition-transform duration-200" : "transition-transform duration-200"}
                    style={{ color: "var(--text-secondary)" }}
                  />
                </button>
                {openIndex === index && (
                  <p className="mt-4 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {faq.a}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-[2rem] p-6"
                  style={{ background: "rgba(204,255,0,0.08)", border: "1px solid rgba(204,255,0,0.2)" }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl" style={{ background: "rgba(204,255,0,0.15)", color: "#ccff00" }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
