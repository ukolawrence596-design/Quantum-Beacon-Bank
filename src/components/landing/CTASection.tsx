import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-10 -right-10 w-96 h-96 opacity-20"
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
          className="absolute -bottom-10 -left-10 w-96 h-96 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
            maskImage:
              "radial-gradient(ellipse at bottom left, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at bottom left, black 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{ background: "#ccff00" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div
          className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
          style={{
            background: `radial-gradient(
              ellipse at center,
              rgba(204,255,0,0.08) 0%,
              transparent 70%
            ), var(--bg-elevated)`,
            border: "1px solid rgba(204,255,0,0.15)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-3xl opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(204,255,0,0.15) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black max-w-2xl leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Start your financial journey with{" "}
              <span style={{ color: "#ccff00" }}>Quantum Beacon Bank</span>{" "}
              today!
            </h2>

            {/* Subtext */}
            <p
              className="max-w-xl text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Join thousands of satisfied customers who trust Quantum Beacon
              Bank for their banking needs. Open your account today and
              experience banking reimagined — fast, secure and built for your
              future.
            </p>

            {/* CTA Button */}
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:scale-105 group"
              style={{
                background: "#ccff00",
                color: "#0d0d0d",
                boxShadow: "0 0 30px rgba(204,255,0,0.3)",
              }}
            >
              Open Account
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
