import { useEffect, useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { APP_CONFIG } from "../../constants/config";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Contact | Quantum Beacon Bank";
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please complete every field before sending your message.");
      setStatus("error");
      return;
    }

    setError("");
    setStatus("idle");

    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setStatus("success");
    }, 600);
  };

  return (
    <main className="min-h-screen pt-24 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="container-custom py-16">
        <div className="grid xl:grid-cols-[0.95fr_0.9fr] gap-10">
          <section className="rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)" }}>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--text-secondary)" }}>
                Contact Support
              </p>
              <h1 className="text-4xl sm:text-5xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
                We&apos;re here to help.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                Have a question about your account, our services, or how to get started? Send us a message and our team will reply within one business day.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl p-5" style={{ background: "rgba(204,255,0,0.08)", border: "1px solid rgba(204,255,0,0.2)" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl mb-4" style={{ background: "rgba(204,255,0,0.15)", color: "#ccff00" }}>
                  <Mail size={20} />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Email</p>
                <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>{APP_CONFIG.supportEmail}</p>
              </div>
              <div className="rounded-3xl p-5" style={{ background: "rgba(204,255,0,0.08)", border: "1px solid rgba(204,255,0,0.2)" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl mb-4" style={{ background: "rgba(204,255,0,0.15)", color: "#ccff00" }}>
                  <Phone size={20} />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Phone</p>
                <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>+1 (800) 555-0199</p>
              </div>
              <div className="rounded-3xl p-5" style={{ background: "rgba(204,255,0,0.08)", border: "1px solid rgba(204,255,0,0.2)" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl mb-4" style={{ background: "rgba(204,255,0,0.15)", color: "#ccff00" }}>
                  <MapPin size={20} />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Head Office</p>
                <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>123 Beacon Avenue, Suite 500, New York, NY</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] p-8 sm:p-10" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)" }}>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--text-secondary)" }}>
                Send a message
              </p>
              <h2 className="text-3xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
                Get in touch with our team
              </h2>
            </div>

            {status === "success" && (
              <div className="mb-6 rounded-3xl px-5 py-4 text-sm text-center" style={{ background: "rgba(34,197,94,0.08)", color: "#16a34a" }}>
                Your message has been sent successfully. We&apos;ll be in touch shortly.
              </div>
            )}

            {status === "error" && error && (
              <div className="mb-6 rounded-3xl px-5 py-4 text-sm text-center" style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className="w-full rounded-full px-5 py-4 text-sm"
                style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
              />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                type="email"
                className="w-full rounded-full px-5 py-4 text-sm"
                style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
              />
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={6}
                placeholder="Describe your request"
                className="w-full rounded-[1.5rem] px-5 py-4 text-sm resize-none"
                style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold transition-all duration-200 hover:scale-[1.01]"
                style={{ background: "#ccff00", color: "#0d0d0d" }}
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
