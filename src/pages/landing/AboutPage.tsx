import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";

const STATS = [
  { value: "50K+", label: "Happy Customers" },
  { value: "$2B+", label: "Transactions Processed" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Customer Support" },
];

const VALUES = [
  {
    icon: Shield,
    title: "Integrity",
    desc: "We operate with absolute transparency, maintaining the highest ethical standards in all our banking operations and customer relationships.",
  },
  {
    icon: Heart,
    title: "Customer Centricity",
    desc: "Our customers are at the heart of everything we do. We listen, understand and deliver solutions that truly make a difference in their financial lives.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "We believe in the power of working together — with our customers, partners and communities — to build a stronger financial future for everyone.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    desc: "We continuously embrace emerging technologies and forward-thinking strategies to deliver cutting-edge banking solutions that keep our customers ahead.",
  },
];

const TEAM = [
  {
    name: "Alexander Quinn",
    role: "Chief Executive Officer",
    initial: "AQ",
    color: "#ccff00",
  },
  {
    name: "Rachel Thornton",
    role: "Chief Financial Officer",
    initial: "RT",
    color: "#3b82f6",
  },
  {
    name: "Marcus Okafor",
    role: "Chief Technology Officer",
    initial: "MO",
    color: "#a855f7",
  },
  {
    name: "Sophia Chen",
    role: "Head of Customer Experience",
    initial: "SC",
    color: "#22c55e",
  },
];

const PRESS = [
  {
    title: "Quantum Beacon Bank Launches New Rewards Program",
    date: "November 24, 2024",
    desc: "The bank is proud to announce the launch of an innovative rewards program designed to enhance customer loyalty and satisfaction.",
  },
  {
    title: "Quantum Beacon Bank Expands Branch Network",
    date: "November 24, 2024",
    desc: "As part of our commitment to serving our customers better, we are opening new locations to provide more accessible banking services.",
  },
  {
    title: "QBB Partners with Nonprofit to Support Financial Education",
    date: "October 24, 2024",
    desc: "Our partnership initiative focuses on promoting financial literacy and responsible banking practices across underserved communities.",
  },
  {
    title: "Quantum Beacon Bank Launches Sustainable Banking Initiative",
    date: "October 28, 2024",
    desc: "We are proud to announce our new sustainable banking initiative aimed at promoting environmental responsibility in financial services.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-center overflow-hidden pt-24"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "#ccff00" }}
          />
          <div
            className="absolute top-20 right-20 w-64 h-64 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)",
              backgroundSize: "18px 18px",
              maskImage:
                "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold w-fit"
                style={{
                  background: "rgba(204,255,0,0.1)",
                  color: "#ccff00",
                  border: "1px solid rgba(204,255,0,0.3)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#ccff00" }}
                />
                About Us
              </div>

              <h1
                className="text-4xl sm:text-5xl font-heading font-black leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Where Banking Meets{" "}
                <span style={{ color: "#ccff00" }}>Excellence!</span>
              </h1>

              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                At Quantum Beacon Bank, we believe that banking should be more
                than just transactions. It should be an experience that empowers
                individuals and businesses to thrive. With a focus on
                innovation, personalized service and unwavering integrity, we
                are committed to providing exceptional banking experiences for
                our customers.
              </p>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 w-fit group"
                style={{
                  background: "#ccff00",
                  color: "#0d0d0d",
                  boxShadow: "0 0 20px rgba(204,255,0,0.3)",
                }}
              >
                Join Us Today
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl p-6 flex flex-col gap-2 text-center transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: `radial-gradient(ellipse at top, rgba(204,255,0,0.08) 0%, transparent 60%), var(--bg-elevated)`,
                    border: "1px solid rgba(204,255,0,0.15)",
                  }}
                >
                  <p
                    className="text-3xl font-heading font-black"
                    style={{ color: "#ccff00" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-10 -left-10 w-96 h-96 opacity-20"
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
        </div>

        <div className="container-custom relative z-10">
          <div className="mb-12">
            <h2
              className="text-3xl sm:text-4xl font-heading font-black mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Mission & <span style={{ color: "#ccff00" }}>Vision</span>
            </h2>
            <p
              className="max-w-2xl text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              We establish a lasting future for the industry driven by
              innovation, integrity and dedication, creating a brighter
              financial future for individuals and businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div
              className="rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden"
              style={{
                background: `radial-gradient(ellipse at top right, rgba(204,255,0,0.08) 0%, transparent 60%), var(--bg-elevated)`,
                border: "1px solid rgba(204,255,0,0.15)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(204,255,0,0.1)" }}
              >
                <Target size={24} style={{ color: "#ccff00" }} />
              </div>
              <h3
                className="text-2xl font-heading font-black"
                style={{ color: "#ccff00" }}
              >
                Mission
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Our mission at Quantum Beacon Bank is to empower our customers
                to achieve their financial success. We are dedicated to serving
                innovative banking solutions that cater to the unique needs of
                our customers. Through personalized services and cutting-edge
                technology, we strive to be the trusted partner helping them
                navigate their financial journey and realize their dreams.
              </p>
            </div>

            {/* Vision */}
            <div
              className="rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden"
              style={{
                background: `radial-gradient(ellipse at top left, rgba(204,255,0,0.08) 0%, transparent 60%), var(--bg-elevated)`,
                border: "1px solid rgba(204,255,0,0.15)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(204,255,0,0.1)" }}
              >
                <Eye size={24} style={{ color: "#ccff00" }} />
              </div>
              <h3
                className="text-2xl font-heading font-black"
                style={{ color: "#ccff00" }}
              >
                Vision
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Our vision at Quantum Beacon Bank is to redefine banking by
                creating a seamless and personal banking experience for our
                customers. Through continuous innovation and collaboration, we
                strive to be at the forefront of the banking industry, setting
                new standards for customer satisfaction, financial excellence
                and trust in our unwavering commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg-primary)" }}
      >
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
        </div>

        <div className="container-custom relative z-10">
          <div className="mb-12">
            <h2
              className="text-3xl sm:text-4xl font-heading font-black mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Our <span style={{ color: "#ccff00" }}>Values</span>
            </h2>
            <p
              className="max-w-2xl text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              At Quantum Beacon Bank, our values are the foundation of
              everything we do. These values guide our decisions, shape our
              culture and define who we are.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(204,255,0,0.1)" }}
                >
                  <Icon size={22} style={{ color: "#ccff00" }} />
                </div>
                <h3
                  className="text-xl font-heading font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-10 -left-10 w-96 h-96 opacity-20"
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
        </div>

        <div className="container-custom relative z-10">
          <div className="mb-12">
            <h2
              className="text-3xl sm:text-4xl font-heading font-black mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Leadership <span style={{ color: "#ccff00" }}>Team</span>
            </h2>
            <p
              className="max-w-2xl text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Meet the visionary leaders who drive Quantum Beacon Bank's mission
              of excellence and innovation forward every single day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(({ name, role, initial, color }) => (
              <div
                key={name}
                className="rounded-2xl p-6 flex flex-col items-center gap-4 text-center group transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${color}20`, color }}
                >
                  {initial}
                </div>
                <div>
                  <p
                    className="font-heading font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {name}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg-primary)" }}
      >
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
        </div>

        <div className="container-custom relative z-10">
          <div className="mb-12">
            <h2
              className="text-3xl sm:text-4xl font-heading font-black mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Press <span style={{ color: "#ccff00" }}>Releases</span>
            </h2>
            <p
              className="max-w-2xl text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Stay updated with the latest happenings and exciting developments
              at Quantum Beacon Bank through our press releases.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {PRESS.map(({ title, date, desc }) => (
              <div
                key={title}
                className="rounded-2xl overflow-hidden group transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                {/* Image placeholder */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at center, rgba(204,255,0,0.08) 0%, var(--bg-hover) 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #ccff00 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <Award size={48} style={{ color: "#ccff00", opacity: 0.3 }} />
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>📍 Somewhere in the World</span>
                    <span>•</span>
                    <span>{date}</span>
                  </div>
                  <h3
                    className="font-heading font-bold leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {desc}
                  </p>
                  <button
                    className="flex items-center gap-1.5 text-xs font-semibold mt-1 transition-all duration-200 group/btn"
                    style={{ color: "#ccff00" }}
                  >
                    Read More
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-200 group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container-custom relative z-10">
          <div
            className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at center, rgba(204,255,0,0.08) 0%, transparent 70%), var(--bg-elevated)`,
              border: "1px solid rgba(204,255,0,0.15)",
            }}
          >
            <h2
              className="text-3xl sm:text-4xl font-heading font-black mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Start Your Financial Journey with{" "}
              <span style={{ color: "#ccff00" }}>Quantum Beacon Bank</span>{" "}
              Today!
            </h2>
            <p
              className="text-sm max-w-xl mx-auto mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Join thousands of satisfied customers who trust Quantum Beacon
              Bank for their banking needs. Open your account today.
            </p>
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
      </section>
    </main>
  );
}
