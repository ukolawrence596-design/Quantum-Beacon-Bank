import { useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  PiggyBank,
  Home,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const TABS = ["For Individuals", "For Business"] as const;
type Tab = (typeof TABS)[number];

const INDIVIDUAL_CASES = [
  { icon: TrendingUp, label: "Managing Personal Finances" },
  { icon: PiggyBank, label: "Saving for the Future" },
  { icon: Home, label: "Homeownership" },
  { icon: BookOpen, label: "Education Funding" },
];

const INDIVIDUAL_STATS = [
  { value: "78%", label: "Secure Retirement Planning" },
  { value: "63%", label: "Manageable Debt Consolidation" },
  { value: "91%", label: "Reducing Financial Burdens" },
];

const BUSINESS_CASES = [
  { icon: TrendingUp, label: "Cash Flow Management" },
  { icon: PiggyBank, label: "Business Investments" },
  { icon: Home, label: "Commercial Real Estate" },
  { icon: BookOpen, label: "Employee Benefits" },
];

const BUSINESS_STATS = [
  { value: "65%", label: "Revenue Growth" },
  { value: "70%", label: "Cost Reduction" },
  { value: "45%", label: "Faster Loan Approvals" },
];

export default function UseCasesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("For Individuals");

  const cases =
    activeTab === "For Individuals" ? INDIVIDUAL_CASES : BUSINESS_CASES;
  const stats =
    activeTab === "For Individuals" ? INDIVIDUAL_STATS : BUSINESS_STATS;

  const description =
    activeTab === "For Individuals"
      ? "For individuals, our mortgage services pave the way to homeownership, and our flexible personal loans provide vital support during various life milestones. We also prioritize retirement planning, ensuring a financially secure future for our customers."
      : "We empower businesses to excel in today's dynamic business activities. Our agile cash flow and tailored funding solutions help address expanding businesses, allowing you to focus on key features and suppliers to reach new markets.";

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* ✅ Background dot pattern — top left corner like Figma */}
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

        {/* Soft glow blob behind the dots */}
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "#ccff00" }}
        />
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h2
            className="text-3xl sm:text-4xl font-heading font-black mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            <span style={{ color: "#ccff00" }}>Use </span>Cases
          </h2>
          <p
            className="max-w-2xl text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            At Quantum Beacon Bank, we cater to the diverse needs of individuals
            and businesses alike, offering a wide range of financial solutions.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT — Case Cards with gradient */}
          <div className="grid grid-cols-2 gap-4">
            {cases.map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className={cn(
                  "relative rounded-2xl p-6 flex flex-col items-center",
                  "justify-center text-center gap-4 overflow-hidden",
                  "group cursor-pointer transition-all duration-300 hover:scale-105",
                  "animate-fade-in-up",
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  background: `
                    radial-gradient(
                      ellipse at top left,
                      rgba(204,255,0,0.12) 0%,
                      rgba(204,255,0,0.04) 40%,
                      transparent 70%
                    ),
                    var(--bg-elevated)
                  `,
                  border: "1px solid var(--border-primary)",
                  minHeight: "140px",
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{
                    background: `radial-gradient(
                      ellipse at top left,
                      rgba(204,255,0,0.18) 0%,
                      transparent 70%
                    )`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(204,255,0,0.1)" }}
                >
                  <Icon size={22} style={{ color: "#ccff00" }} />
                </div>

                {/* Label */}
                <p
                  className="relative z-10 text-sm font-semibold leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT — Description & Stats */}
          <div className="flex flex-col gap-6">
            {/* Tab Toggle */}
            <div
              className="flex items-center rounded-full p-1 gap-1 w-fit"
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

            {/* Title */}
            <h3
              className="text-2xl font-heading font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {activeTab}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <p
                    className="text-3xl font-heading font-black"
                    style={{ color: "#ccff00" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs leading-snug"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Learn More */}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold w-fit transition-all duration-200 group"
              style={{ color: "#ccff00" }}
            >
              Learn More
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
