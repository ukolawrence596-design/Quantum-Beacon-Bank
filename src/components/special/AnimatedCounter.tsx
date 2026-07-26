import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1500,
  prefix = "",
  suffix = "",
  label,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    const animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <div className="text-center">
      <p className="text-4xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </p>
      {label && (
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          {label}
        </p>
      )}
    </div>
  );
}
