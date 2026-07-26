import { useState } from "react";
import {
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";

const FAQS = [
  {
    question: "How do I transfer money to another account?",
    answer:
      "Go to the Transfer page from your dashboard sidebar. Enter the recipient's account number, the amount you wish to send and an optional note. Review the details and confirm your transfer.",
  },
  {
    question: "How long does a transfer take?",
    answer:
      "Transfers between Quantum Beacon Bank accounts are instant. The recipient will see the funds in their account immediately after you confirm the transfer.",
  },
  {
    question: "How do I freeze my card?",
    answer:
      "Navigate to My Cards in your dashboard. Select the card you wish to freeze and click the Freeze button. You can unfreeze it at any time the same way.",
  },
  {
    question: "How do I apply for a loan?",
    answer:
      "Visit the Loans section in your dashboard. Fill in the loan application form with your desired amount and repayment period. Our team will review your application within 24 hours.",
  },
  {
    question: "How do I download my statement?",
    answer:
      "Go to Statements in your dashboard. Select the month or year you need and click the PDF download button. The statement will be generated and downloaded to your device.",
  },
];

export default function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setSubject("");
      setMessage("");
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  const inputStyle = {
    background: "var(--bg-input)",
    border: "1px solid var(--border-primary)",
    color: "var(--text-primary)",
    outline: "none",
  };

  const handleFocus = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    e.target.style.borderColor = "#ccff00";
    e.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.1)";
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    e.target.style.borderColor = "var(--border-primary)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-heading font-black"
          style={{ color: "var(--text-primary)" }}
        >
          Support <span style={{ color: "#ccff00" }}>Center</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          We're here to help you 24/7
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: MessageCircle,
            title: "Live Chat",
            desc: "Chat with us now",
            action: "Start Chat",
            color: "#ccff00",
            onClick: () => {},
          },
          {
            icon: Mail,
            title: "Email Support",
            desc: "support@qbb.com",
            action: "Send Email",
            color: "#3b82f6",
            onClick: () => {},
          },
          {
            icon: Phone,
            title: "Phone Support",
            desc: "+1 (555) 123 4567",
            action: "Call Now",
            color: "#22c55e",
            onClick: () => {},
          },
        ].map(({ icon: Icon, title, desc, action, color, onClick }) => (
          <button
            key={title}
            onClick={onClick}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all duration-200 hover:scale-105 group"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: `${color}15` }}
            >
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <p
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                {desc}
              </p>
            </div>
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: `${color}15`,
                color,
              }}
            >
              {action}
            </span>
          </button>
        ))}
      </div>

      {/* FAQ Section */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h3
          className="font-heading font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Frequently Asked Questions
        </h3>

        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden transition-all duration-200 cursor-pointer"
            style={{
              background:
                openFAQ === index ? "rgba(204,255,0,0.05)" : "var(--bg-hover)",
              border:
                openFAQ === index
                  ? "1px solid rgba(204,255,0,0.15)"
                  : "1px solid transparent",
            }}
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
          >
            <div className="flex items-center justify-between p-4 gap-4">
              <p
                className="text-sm font-semibold text-left"
                style={{ color: "var(--text-primary)" }}
              >
                {faq.question}
              </p>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                style={{
                  background:
                    openFAQ === index ? "#ccff00" : "var(--bg-elevated)",
                  color: openFAQ === index ? "#0d0d0d" : "var(--text-muted)",
                }}
              >
                {openFAQ === index ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </div>
            </div>
            {openFAQ === index && (
              <p
                className="px-4 pb-4 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-5"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h3
          className="font-heading font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Send Us a Message
        </h3>

        {sent && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm animate-fade-in-down"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#22c55e",
            }}
          >
            ✓ Message sent! We'll get back to you within 24 hours.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Category
            </label>
            <select
              className="w-full px-4 py-3 rounded-full text-sm"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">Select a category</option>
              <option value="transfer">Transfer Issue</option>
              <option value="account">Account Problem</option>
              <option value="card">Card Issue</option>
              <option value="loan">Loan Enquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Subject
            </label>
            <input
              type="text"
              placeholder="Brief description of your issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3.5 rounded-full text-sm"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Message
            </label>
            <textarea
              placeholder="Describe your issue in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 rounded-2xl text-sm resize-none"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !subject || !message}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50 w-fit"
            style={{
              background: "#ccff00",
              color: "#0d0d0d",
              boxShadow: "0 0 15px rgba(204,255,0,0.2)",
            }}
          >
            {loading ? (
              <>
                <div
                  className="w-4 h-4 rounded-full border-2 animate-spin"
                  style={{
                    borderColor: "#0d0d0d",
                    borderTopColor: "transparent",
                  }}
                />
                Sending...
              </>
            ) : (
              <>
                <Send size={14} />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
