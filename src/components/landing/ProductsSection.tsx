import { useState } from "react";
import {
  ArrowRight,
  CreditCard,
  PiggyBank,
  Home,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

const TABS = ["For Individuals", "For Business"] as const;
type Tab = (typeof TABS)[number];

const INDIVIDUAL_PRODUCTS = [
  {
    icon: CreditCard,
    title: "Checking Accounts",
    description:
      "Enjoy easy and convenient access to your funds with a range of checking account options. Benefit from features such as online banking, mobile deposits, and free ATM access.",
  },
  {
    icon: PiggyBank,
    title: "Savings Accounts",
    description:
      "Build your savings with a competitive interest rate on our savings accounts. Whether saving for a specific goal or building an emergency fund, we have the right account for you.",
  },
  {
    icon: Home,
    title: "Loans and Mortgages",
    description:
      "Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced team is here to help guide you through the available options.",
  },
];

const BUSINESS_PRODUCTS = [
  {
    icon: Building2,
    title: "Business Accounts",
    description:
      "Streamline your business finances with our tailored business checking and savings accounts. Enjoy features like payroll management, bulk transfers and dedicated support.",
  },
  {
    icon: CreditCard,
    title: "Business Credit",
    description:
      "Access flexible credit solutions designed for businesses of all sizes. From working capital loans to business credit cards, we help fuel your growth.",
  },
  {
    icon: PiggyBank,
    title: "Investment Solutions",
    description:
      "Grow your business reserves with our range of investment products. Our financial advisors will help you find the right strategy to maximize your returns.",
  },
];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("For Individuals");

  const products =
    activeTab === "For Individuals" ? INDIVIDUAL_PRODUCTS : BUSINESS_PRODUCTS;

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background decorations — top right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot grid pattern fading from top right */}
        <div
          className="absolute -top-10 -right-10 w-96 h-96 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
            maskImage:
              "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
          }}
        />

        {/* Soft glow blob */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "#ccff00" }}
        />

        {/* Bottom left subtle glow */}
        <div
          className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-5 blur-3xl"
          style={{ background: "#ccff00" }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-heading font-black mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Our <span style={{ color: "#ccff00" }}>Products</span>
            </h2>
            <p
              className="max-w-xl text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Discover a range of financial products and services at Quantum
              Beacon Bank, designed to cater to your unique financial needs and
              aspirations.
            </p>
          </div>

          {/* Tab Toggle */}
          <div
            className="flex items-center rounded-full p-1 gap-1 shrink-0"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeTab === tab ? "#ccff00" : "transparent",
                  color:
                    activeTab === tab ? "#0d0d0d" : "var(--text-secondary)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="card group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(204,255,0,0.1)" }}
              >
                <Icon size={22} style={{ color: "#ccff00" }} />
              </div>

              {/* Title */}
              <h3
                className="text-lg font-heading font-bold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                {description}
              </p>

              {/* Learn More */}
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group/link"
                style={{ color: "#ccff00" }}
              >
                Learn More
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover/link:translate-x-1"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
