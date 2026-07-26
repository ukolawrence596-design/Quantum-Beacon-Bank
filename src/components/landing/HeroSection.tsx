import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SLIDES = [
  {
    image: "/hero-1.jpg",
    badge: "Next Generation Banking",
    heading1: "Welcome to Quantum",
    heading2: "Beacon Bank",
    subheading: "Empowering Your",
    subAccent: "Financial Journey",
    description:
      "At Quantum Beacon Bank, our mission is to be your cornerstone in banking solutions that empower individuals and businesses to achieve their financial goals.",
  },
  {
    image: "/hero-2.jpg",
    badge: "Secure & Reliable",
    heading1: "Banking Built for",
    heading2: "Your Future",
    subheading: "Smart Tools for",
    subAccent: "Smart People",
    description:
      "Experience next-generation digital banking with real-time transfers, intelligent savings and bank-grade security protecting every transaction you make.",
  },
  {
    image: "/hero-3.jpg",
    badge: "Trusted by Thousands",
    heading1: "Grow Your Wealth",
    heading2: "With Confidence",
    subheading: "Loans, Mortgages &",
    subAccent: "Investments",
    description:
      "From personal loans to home mortgages and smart investments, Quantum Beacon Bank has every financial product you need to build lasting wealth.",
  },
];

const FEATURES = [
  { icon: Shield, label: "Bank-grade Security" },
  { icon: Zap, label: "Instant Transfers" },
  { icon: TrendingUp, label: "Smart Analytics" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 400);
    },
    [animating],
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % SLIDES.length);
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goToSlide]);

  // Auto-play every 6 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, paused]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BACKGROUND SLIDES */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {/* Background Image */}
          <img
            src={s.image}
            alt={`Slide ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay — blends with site theme */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                135deg,
                rgba(13,13,13,0.92) 0%,
                rgba(13,13,13,0.75) 50%,
                rgba(13,13,13,0.85) 100%
              )`,
            }}
          />

          {/* Green accent glow overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                ellipse at top right,
                rgba(204,255,0,0.08) 0%,
                transparent 60%
              )`,
            }}
          />
        </div>
      ))}

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ccff00 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse at top right, black 0%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top right, black 0%, transparent 60%)",
        }}
      />

      {/* MAIN CONTENT */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold w-fit transition-all duration-500 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
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
            {slide.badge}
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-7xl font-heading font-black leading-tight transition-all duration-500 ${animating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
            style={{ color: "#ffffff" }}
          >
            {slide.heading1} <br />
            <span style={{ color: "#ccff00" }}>{slide.heading2}</span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-xl sm:text-2xl font-heading font-bold transition-all duration-500 delay-100 ${animating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
            style={{ color: "#ffffff" }}
          >
            {slide.subheading}{" "}
            <span style={{ color: "#ccff00" }}>{slide.subAccent}</span>
          </p>

          {/* Description */}
          <p
            className={`text-base leading-relaxed max-w-xl transition-all duration-500 delay-150 ${animating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            {slide.description}
          </p>

          {/* Feature Pills */}
          <div
            className={`flex flex-wrap gap-3 transition-all duration-500 delay-200 ${animating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
          >
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Icon size={12} style={{ color: "#ccff00" }} />
                {label}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-500 delay-300 ${animating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 group"
              style={{
                background: "#ccff00",
                color: "#0d0d0d",
                boxShadow: "0 0 30px rgba(204,255,0,0.3)",
              }}
            >
              Open Account
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* SLIDER CONTROLS */}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          color: "#ffffff",
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          color: "#ffffff",
        }}
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "32px" : "8px",
              height: "8px",
              background: i === current ? "#ccff00" : "rgba(255,255,255,0.3)",
              boxShadow:
                i === current ? "0 0 10px rgba(204,255,0,0.5)" : "none",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute bottom-10 right-8 z-20 text-xs font-semibold"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* Bottom fade into site */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #0d0d0d)",
        }}
      />
    </section>
  );
}
