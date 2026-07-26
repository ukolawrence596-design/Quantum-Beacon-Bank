import {
  ArrowRight,
  Monitor,
  Clock,
  Smartphone,
  Shield,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: Monitor,
    title: "Online Banking",
    description:
      "Enjoy the convenience of accessing your accounts and financial tools from your browser. Make transfers, check balances, pay bills and stay fully in control.",
    link: "/services",
  },
  {
    icon: Clock,
    title: "24/7 Account Access",
    description:
      "Enjoy the convenience of accessing your accounts and managing your finances around the clock. Check balances, transfer funds, and stay on top of your finances.",
    link: "/services",
    highlighted: true,
  },
  {
    icon: Smartphone,
    title: "Mobile Banking App",
    description:
      "Stay connected to your finances on the go with our powerful mobile app. Manage your accounts, make transfers, pay bills and track your spending from your smartphone.",
    link: "/services",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "Rest assured knowing your transactions are protected. We employ state-of-the-art encryption and multi-factor authentication to safeguard your financial information.",
    link: "/security",
    highlighted: true,
  },
  {
    icon: CreditCard,
    title: "Bill Pay and Transfers",
    description:
      "Simplify your finances with our easy bill payment and transfer system. Schedule payments, set recurring transfers and never miss a payment with timely reminders.",
    link: "/services",
  },
  {
    icon: RefreshCw,
    title: "Customer Support",
    description:
      "Our dedicated support team is always ready to assist you. Reach us via live chat, phone or email any time you need help with your account or have questions.",
    link: "/contact",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background decorations — top left */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot grid pattern fading from top left */}
        <div
          className="absolute -top-10 -left-10 w-96 h-96 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
            maskImage:
              "radial-gradient(ellipse at top left, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top left, black 0%, transparent 65%)",
          }}
        />

        {/* Soft glow blob */}
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "#ccff00" }}
        />

        {/* Bottom right subtle glow */}
        <div
          className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-5 blur-3xl"
          style={{ background: "#ccff00" }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-14">
          <h2
            className="text-3xl sm:text-4xl font-heading font-black mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Our <span style={{ color: "#ccff00" }}>Features</span>
          </h2>
          <p
            className="max-w-2xl text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Experience a host of powerful features at Quantum Beacon Bank, built
            to give you seamless banking, smart insights and everything you need
            to manage your money with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(
            ({ icon: Icon, title, description, link, highlighted }, index) => (
              <div
                key={title}
                className="relative rounded-2xl p-6 flex flex-col gap-4 group cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-in-up overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  background: highlighted
                    ? `radial-gradient(
                      ellipse at top right,
                      rgba(204,255,0,0.15) 0%,
                      rgba(204,255,0,0.05) 40%,
                      transparent 70%
                    ), var(--bg-elevated)`
                    : "var(--bg-elevated)",
                  border: highlighted
                    ? "1px solid rgba(204,255,0,0.2)"
                    : "1px solid var(--border-primary)",
                }}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{
                    background: `radial-gradient(
                    ellipse at top right,
                    rgba(204,255,0,0.12) 0%,
                    transparent 70%
                  )`,
                  }}
                />

                {/* Top row — icon + arrow */}
                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(204,255,0,0.1)" }}
                  >
                    <Icon size={22} style={{ color: "#ccff00" }} />
                  </div>
                  <Link
                    to={link}
                    className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                    style={{
                      background: "#ccff00",
                      color: "#0d0d0d",
                    }}
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Title */}
                <h3
                  className="relative z-10 text-base font-heading font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {title}
                </h3>

                {/* Description */}
                <p
                  className="relative z-10 text-sm leading-relaxed flex-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {description}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
