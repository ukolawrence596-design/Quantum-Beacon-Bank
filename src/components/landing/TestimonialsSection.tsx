import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

const TABS = ["For Individuals", "For Businesses"] as const;
type Tab = (typeof TABS)[number];

const TESTIMONIALS = {
  "For Individuals": [
    {
      name: "Sara T",
      text: "Quantum Beacon Bank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
      rating: 5,
    },
    {
      name: "John D",
      text: "I recently started my own business and Quantum Beacon Bank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
      rating: 5,
    },
    {
      name: "Emily G",
      text: "I love the convenience of Quantum Beacon Bank's mobile banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
      rating: 5,
    },
  ],
  "For Businesses": [
    {
      name: "Michael R",
      text: "Quantum Beacon Bank helped us scale our business with their flexible financing options. Their business banking team truly understands the needs of growing companies.",
      rating: 5,
    },
    {
      name: "Linda K",
      text: "The business account features are outstanding. Cash flow management, payroll tools and dedicated support have made our financial operations so much smoother.",
      rating: 5,
    },
    {
      name: "David M",
      text: "As a small business owner, I needed a bank that could grow with me. Quantum Beacon Bank delivered exactly that — great rates, smart tools and a team that genuinely cares.",
      rating: 5,
    },
  ],
};

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("For Individuals");
  const [activeIndex, setActiveIndex] = useState(1);

  const testimonials = TESTIMONIALS[activeTab];

  const prev = () => {
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setActiveIndex((i) => (i + 1) % testimonials.length);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setActiveIndex(1);
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background decorations — top left */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
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
              Our <span style={{ color: "#ccff00" }}>Testimonials</span>
            </h2>
            <p
              className="max-w-xl text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Discover how Quantum Beacon Bank has transformed lives with
              innovative digital solutions and personalized customer service.
              See why our clients trust us for a secure and prosperous financial
              journey.
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
            {(Object.keys(TESTIMONIALS) as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
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

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {testimonials.map((testimonial, index) => {
              const isCenter = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative rounded-2xl p-6 flex flex-col gap-4 cursor-pointer",
                    "transition-all duration-500",
                    isCenter ? "scale-105 z-10" : "scale-95 opacity-60",
                  )}
                  style={{
                    background: isCenter
                      ? `radial-gradient(
                          ellipse at top left,
                          rgba(204,255,0,0.1) 0%,
                          transparent 60%
                        ), var(--bg-elevated)`
                      : "var(--bg-elevated)",
                    border: isCenter
                      ? "1px solid rgba(204,255,0,0.25)"
                      : "1px solid var(--border-primary)",
                    boxShadow: isCenter ? "var(--shadow-elevated)" : "none",
                  }}
                >
                  {/* Quote icon */}
                  <div
                    className="text-4xl font-heading font-black leading-none"
                    style={{ color: "#ccff00" }}
                  >
                    "
                  </div>

                  {/* Text */}
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {testimonial.text}
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} style={{ color: "#ccff00" }}>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Name */}
                  <p
                    className="text-sm font-bold"
                    style={{
                      color: isCenter ? "#ccff00" : "var(--text-primary)",
                    }}
                  >
                    {testimonial.name}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: activeIndex === i ? "24px" : "8px",
                    height: "8px",
                    background:
                      activeIndex === i ? "#ccff00" : "var(--border-secondary)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
