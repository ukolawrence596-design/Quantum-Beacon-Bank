/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Urbanist", "sans-serif"],
      },
      colors: {
        // Primary Lime/Neon Green Accent
        primary: {
          50: "#f9ffe0",
          100: "#f0ffb3",
          200: "#e4ff80",
          300: "#d4f700",
          400: "#ccff00", // ← Main accent color from design
          500: "#b8e600",
          600: "#a0cc00",
          700: "#7da300",
          800: "#5c7a00",
          900: "#3d5200",
        },
        // Dark backgrounds
        dark: {
          950: "#080808", // Deepest background
          900: "#0d0d0d", // Main background
          800: "#1a1a1a", // Card background
          700: "#222222", // Elevated card
          600: "#2a2a2a", // Borders/dividers
          500: "#333333", // Subtle highlights
          400: "#444444", // Disabled states
        },
        // Text colors
        content: {
          primary: "#ffffff", // Main text
          secondary: "#a0a0a0", // Secondary text
          muted: "#666666", // Muted/placeholder
          accent: "#ccff00", // Lime green text accent
        },
        // Status colors
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#3b82f6",
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
        "gradient-accent": "linear-gradient(135deg, #ccff00 0%, #a0cc00 100%)",
        "gradient-card": "linear-gradient(145deg, #1a1a1a 0%, #222222 100%)",
        "dot-pattern": "radial-gradient(circle, #ccff00 1px, transparent 1px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        counter: "counter 2s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeInDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(204,255,0,0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(204,255,0,0.7)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        pill: "9999px",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(204,255,0,0.2)",
        "glow-md": "0 0 20px rgba(204,255,0,0.4)",
        "glow-lg": "0 0 40px rgba(204,255,0,0.6)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6)",
        "inner-dark": "inset 0 2px 8px rgba(0,0,0,0.4)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        88: "22rem",
        100: "25rem",
        112: "28rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
};
