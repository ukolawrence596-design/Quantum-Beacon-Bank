import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show loader after 400ms to prevent flash
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full border-4 animate-spin"
            style={{
              borderColor: "rgba(204,255,0,0.2)",
              borderTopColor: "#ccff00",
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center font-heading font-black text-xl"
            style={{ color: "#ccff00" }}
          >
            QB
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p
            className="font-heading font-bold text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            Quantum <span style={{ color: "#ccff00" }}>Beacon</span> Bank
          </p>
          <p
            className="text-xs animate-pulse"
            style={{ color: "var(--text-muted)" }}
          >
            Loading your secure session...
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                background: "#ccff00",
                animationDelay: `${i * 150}ms`,
                animationDuration: "0.8s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
