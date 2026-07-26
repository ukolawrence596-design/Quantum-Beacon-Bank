import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / totalHeight) * 100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2px] z-[9999]"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div
        className="h-full transition-all duration-150"
        style={{
          width: `${progress}%`,
          background: "var(--accent-primary)",
          boxShadow: "var(--shadow-glow)",
        }}
      />
    </div>
  );
}
