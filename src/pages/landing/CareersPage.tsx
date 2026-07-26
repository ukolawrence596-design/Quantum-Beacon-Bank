import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Coffee,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";

const BENEFITS = [
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    desc: "We offer top-tier salaries and performance bonuses that recognize your contributions and keep you motivated.",
  },
  {
    icon: Heart,
    title: "Health and Wellness",
    desc: "We invest in our employees health by providing comprehensive health insurance, gym memberships and wellness resources.",
  },
  {
    icon: TrendingUp,
    title: "Retirement Planning",
    desc: "Plan for your future with our comprehensive 401k plan. We offer generous employer matching to help you build long-term wealth.",
  },
  {
    icon: Coffee,
    title: "Work Life Balance",
    desc: "We champion healthy work-life balance with flexible work schedules, remote work options and generous paid time off policies.",
  },
];

const JOBS = [
  {
    title: "Relationship Manager",
    location: "New York",
    department: "Client Management",
    type: "Full-time",
    skills: ["Customer Skills", "Appointment in Meeting"],
    description:
      "As a Relationship Manager you will cultivate and manage relationships with our premium clients. You will work closely with clients to understand their financial needs, provide personalized banking solutions and ensure exceptional customer satisfaction.",
    requirements: [
      "Bachelor's degree in Finance, Business or related field",
      "Minimum 3 years of experience in relationship management",
      "Strong knowledge of banking products and services",
      "Excellent communication and interpersonal skills",
      "Ability to work independently and as part of a team",
    ],
  },
  {
    title: "Risk Analyst",
    location: "Chicago",
    department: "Risk Management",
    type: "Full-time",
    skills: ["Analytical Skills", "Risk Management"],
    description:
      "As a Risk Analyst you will be responsible for identifying, analyzing and mitigating financial risks within our organization. You will analyze data, develop risk models and provide strategic recommendations to minimize risk exposure.",
    requirements: [
      "Bachelor's degree in Finance, Mathematics or related field",
      "Minimum 2 years of experience in risk analysis",
      "Proficiency in data analysis tools and risk management software",
      "Strong analytical and problem-solving skills",
      "Knowledge of regulatory requirements and compliance standards",
    ],
  },
  {
    title: "IT Security Specialist",
    location: "Remote",
    department: "Information Technology",
    type: "Full-time",
    skills: ["Cybersecurity", "Network Security"],
    description:
      "As an IT Security Specialist you will be responsible for protecting the security and integrity of our information systems. You will implement security measures, monitor for threats and respond to security incidents to safeguard our digital assets.",
    requirements: [
      "Bachelor's degree in Computer Science, IT Security or related field",
      "Minimum 3 years of experience in cybersecurity",
      "In-depth knowledge of security protocols and best practices",
      "Experience with security tools such as SIEM, IDS/IPS and firewalls",
      "Relevant certifications such as CISSP, CISM or CompTIA Security+",
    ],
  },
];

const FAQS = [
  {
    q: "How do I open an account with Quantum Beacon Bank?",
    a: 'Opening an account is easy. Simply visit our website, click "Open Account" and follow the prompts. Our process is quick, secure and entirely online.',
  },
  {
    q: "What documents do I need to provide to apply for a loan?",
    a: "You will need a valid ID, proof of income, employment verification and recent bank statements. Our team will guide you through the specific requirements for your loan type.",
  },
  {
    q: "How can I access my accounts online?",
    a: 'Log in to your account via our website or mobile app using your email and password. If you haven\'t registered, click "Sign Up" and complete the registration process.',
  },
  {
    q: "Are my transactions and personal information secure?",
    a: "Absolutely. We employ industry-leading 256-bit encryption, multi-factor authentication and continuous security monitoring to keep your data and transactions completely safe.",
  },
];

export default function CareersPage() {
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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
          <div className="max-w-3xl flex flex-col gap-6">
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
              We're Hiring
            </div>
            <h1
              className="text-4xl sm:text-5xl font-heading font-black leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Welcome to{" "}
              <span style={{ color: "#ccff00" }}>Quantum Beacon Bank</span>{" "}
              Careers!
            </h1>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              At Quantum Beacon Bank, we are passionate about building a team
              that reflects the diversity of our customers and communities. We
              offer an inclusive and supportive work environment where every
              employee has the opportunity to grow, innovate and make a lasting
              impact on the future of banking.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
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
              Our <span style={{ color: "#ccff00" }}>Values</span>
            </h2>
            <p
              className="max-w-2xl text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              At Quantum Beacon Bank, our values define who we are and how we
              work. We are looking for team members who share these values and
              help us achieve our goals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Integrity",
                desc: "We operate with absolute transparency, maintaining the highest ethical standards in all relationships.",
                icon: Check,
              },
              {
                title: "Customer Centricity",
                desc: "Our customers are at the heart of everything we do. We deliver solutions that truly make a difference.",
                icon: Heart,
              },
              {
                title: "Collaboration",
                desc: "We believe in the power of working together to build a stronger financial future for everyone.",
                icon: Users,
              },
              {
                title: "Innovation",
                desc: "We embrace emerging technologies and forward-thinking strategies to deliver cutting-edge solutions.",
                icon: BookOpen,
              },
            ].map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col gap-3 p-6 rounded-2xl group transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(204,255,0,0.1)" }}
                >
                  <Icon size={18} style={{ color: "#ccff00" }} />
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

      {/* Benefits */}
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
              Our <span style={{ color: "#ccff00" }}>Benefits</span>
            </h2>
            <p
              className="max-w-2xl text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              We offer a comprehensive benefits package designed to support your
              personal and professional wellbeing every step of the way.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-6 rounded-2xl group transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(204,255,0,0.1)" }}
                >
                  <Icon size={22} style={{ color: "#ccff00" }} />
                </div>
                <div>
                  <h3
                    className="font-heading font-bold mb-2"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
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
              Job <span style={{ color: "#ccff00" }}>Openings</span>
            </h2>
            <p
              className="max-w-2xl text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Exciting opportunities await talented candidates across various
              roles. Find the perfect position and join us to shape the future
              of banking.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {JOBS.map((job, index) => (
              <div
                key={job.title}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background:
                    openJob === index
                      ? `radial-gradient(ellipse at top, rgba(204,255,0,0.05) 0%, transparent 60%), var(--bg-elevated)`
                      : "var(--bg-elevated)",
                  border:
                    openJob === index
                      ? "1px solid rgba(204,255,0,0.2)"
                      : "1px solid var(--border-primary)",
                }}
              >
                {/* Job Header */}
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(204,255,0,0.1)" }}
                    >
                      <Briefcase size={22} style={{ color: "#ccff00" }} />
                    </div>
                    <div className="flex gap-2">
                      {job.skills.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: "rgba(204,255,0,0.08)",
                            color: "#ccff00",
                            border: "1px solid rgba(204,255,0,0.15)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3
                      className="font-heading font-bold text-lg"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <MapPin size={12} style={{ color: "#ccff00" }} />
                        {job.location}
                      </span>
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Briefcase size={12} style={{ color: "#ccff00" }} />
                        {job.department}
                      </span>
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Clock size={12} style={{ color: "#ccff00" }} />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {job.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setOpenJob(openJob === index ? null : index)
                      }
                      className="flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                      style={{ color: "#ccff00" }}
                    >
                      {openJob === index ? (
                        <>
                          <ChevronUp size={14} /> Hide Requirements
                        </>
                      ) : (
                        <>
                          <ChevronDown size={14} /> View Requirements
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Requirements */}
                {openJob === index && (
                  <div className="px-6 pb-6 flex flex-col gap-4 animate-fade-in-up">
                    <div
                      className="p-4 rounded-2xl flex flex-col gap-3"
                      style={{
                        background: "var(--bg-hover)",
                        border: "1px solid var(--border-primary)",
                      }}
                    >
                      <h4
                        className="text-sm font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Requirements & Qualifications
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {job.requirements.map((req) => (
                          <li
                            key={req}
                            className="flex items-start gap-2 text-xs"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <span
                              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: "rgba(204,255,0,0.1)" }}
                            >
                              <Check size={10} style={{ color: "#ccff00" }} />
                            </span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 w-fit group"
                      style={{
                        background: "#ccff00",
                        color: "#0d0d0d",
                        boxShadow: "0 0 15px rgba(204,255,0,0.2)",
                      }}
                    >
                      Apply Now
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
              Frequently{" "}
              <span style={{ color: "#ccff00" }}>Asked Questions</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
                style={{
                  background:
                    openFAQ === index
                      ? "rgba(204,255,0,0.05)"
                      : "var(--bg-elevated)",
                  border:
                    openFAQ === index
                      ? "1px solid rgba(204,255,0,0.15)"
                      : "1px solid var(--border-primary)",
                }}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <div className="flex items-start justify-between gap-4 p-5">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {faq.q}
                  </p>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background:
                        openFAQ === index ? "#ccff00" : "var(--bg-hover)",
                      color:
                        openFAQ === index ? "#0d0d0d" : "var(--text-muted)",
                    }}
                  >
                    {openFAQ === index ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )}
                  </div>
                </div>
                {openFAQ === index && (
                  <p
                    className="px-5 pb-5 text-sm leading-relaxed animate-fade-in-up"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container-custom">
          <div
            className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at center, rgba(204,255,0,0.08) 0%, transparent 70%), var(--bg-elevated)`,
              border: "1px solid rgba(204,255,0,0.15)",
            }}
          >
            <h2
              className="text-3xl font-heading font-black mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Start Your Career with{" "}
              <span style={{ color: "#ccff00" }}>YourBank</span> Today!
            </h2>
            <p
              className="text-sm max-w-xl mx-auto mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Take the next step in your career journey. Explore our open
              positions and discover where your talents can make a real
              difference.
            </p>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:scale-105 group"
              style={{
                background: "#ccff00",
                color: "#0d0d0d",
                boxShadow: "0 0 30px rgba(204,255,0,0.3)",
              }}
            >
              Apply Now
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
