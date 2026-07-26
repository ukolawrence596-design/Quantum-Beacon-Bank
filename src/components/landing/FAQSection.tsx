import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../utils/cn";

const FAQS = [
  {
    question: "How do I open an account with Quantum Beacon Bank?",
    answer:
      'Opening an account with Quantum Beacon Bank is easy. Simply visit our website and click the "Open Account" button. Follow the prompts to provide the required information and complete the application process. If you have any questions or need assistance, our customer support team is available to help.',
  },
  {
    question: "What documents do I need to provide to apply for a loan?",
    answer:
      "The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents such as a passport or driver's license, proof of income such as pay stubs or tax returns, and information about collateral if applicable. Our loan officers will guide you through the specific requirements during the application process.",
  },
  {
    question: "How can I access my accounts online?",
    answer:
      'Accessing your accounts online is simple and secure. Visit our website and click the "Login" button. Enter your username and password to access your accounts. If you haven\'t registered for online banking, click the "Sign Up" button and follow the registration process. If you need assistance, our customer support team is available to guide you.',
  },
  {
    question: "Are my transactions and personal information secure?",
    answer:
      "At Quantum Beacon Bank, we take the security of your transactions and personal information very seriously. We employ industry-leading encryption and multi-factor authentication to ensure that your data is protected. Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank with confidence knowing that we have robust security controls in place.",
  },
  {
    question: "How do I apply for a mortgage?",
    answer:
      "Applying for a mortgage at Quantum Beacon Bank is straightforward. You can start your application online by visiting our mortgage section, or speak with one of our mortgage specialists in person. We offer competitive rates and flexible terms to suit your needs. Our team will guide you through every step of the process.",
  },
  {
    question: "What is the maximum transfer limit per transaction?",
    answer:
      "Transfer limits vary depending on your account type and verification level. Standard accounts have a daily transfer limit of $10,000, while premium accounts can transfer up to $50,000 per day. If you need to make a larger transfer, please contact our support team and we will assist you with the process.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visibleFAQs = showAll ? FAQS : FAQS.slice(0, 4);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background decorations — top right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "#ccff00" }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h2
            className="text-3xl sm:text-4xl font-heading font-black mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently <span style={{ color: "#ccff00" }}>Asked Questions</span>
          </h2>
          <p
            className="max-w-2xl text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Still you have any questions? Contact our team via
            support@quantumbeaconbank.com
          </p>
        </div>

        {/* FAQ Grid — 2 columns on desktop */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {visibleFAQs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-300",
                "animate-fade-in-up cursor-pointer",
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                background:
                  openIndex === index
                    ? `radial-gradient(
                      ellipse at top left,
                      rgba(204,255,0,0.08) 0%,
                      transparent 60%
                    ), var(--bg-elevated)`
                    : "var(--bg-elevated)",
                border:
                  openIndex === index
                    ? "1px solid rgba(204,255,0,0.2)"
                    : "1px solid var(--border-primary)",
              }}
              onClick={() => toggle(index)}
            >
              {/* Question Row */}
              <div className="flex items-start justify-between gap-4 p-5">
                <h3
                  className="text-sm font-semibold leading-snug flex-1"
                  style={{
                    color:
                      openIndex === index
                        ? "var(--text-primary)"
                        : "var(--text-primary)",
                  }}
                >
                  {faq.question}
                </h3>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                  style={{
                    background:
                      openIndex === index ? "#ccff00" : "var(--bg-hover)",
                    color:
                      openIndex === index ? "#0d0d0d" : "var(--text-secondary)",
                  }}
                >
                  {openIndex === index ? (
                    <Minus size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </div>
              </div>

              {/* Answer */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-48" : "max-h-0",
                )}
              >
                <p
                  className="px-5 pb-5 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load All FAQs button */}
        {!showAll && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              Load All FAQ's
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
