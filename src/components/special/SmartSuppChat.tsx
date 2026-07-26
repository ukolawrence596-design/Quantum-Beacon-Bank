import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    smartsupp: {
      (...args: unknown[]): void;
      _?: unknown[];
    };
    _smartsupp: Record<string, unknown>;
  }
}

interface SmartSuppChatProps {
  name?: string;
  email?: string;
}

export default function SmartSuppChat({ name, email }: SmartSuppChatProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const key = import.meta.env.VITE_SMARTSUPP_KEY as string;

  useEffect(() => {
    if (!key || !isHome) return;

    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = key;

    window.smartsupp =
      window.smartsupp ||
      function (...args: unknown[]) {
        (window.smartsupp._ = window.smartsupp._ || []).push(args);
      };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";
    document.head.appendChild(script);

    script.onload = () => {
      window.smartsupp("chat:setColor", "#ccff00");
      window.smartsupp("chat:setPosition", "right");
      if (name) window.smartsupp("visitor:setName", name);
      if (email) window.smartsupp("visitor:setEmail", email);
    };

    return () => {
      const existing = document.querySelector('script[src*="smartsuppchat"]');
      if (existing) existing.remove();
    };
  }, [key, name, email, isHome]);

  if (!isHome) return null;

  return null;
}
