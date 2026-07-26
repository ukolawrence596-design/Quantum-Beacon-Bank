import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import i18n from "../lib/i18n";

interface LanguageContextValue {
  language: string;
  setLanguage: (language: string) => void;
  availableLanguages: { code: string; label: string }[];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
];

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("qbb-language") || "en";
  });

  useEffect(() => {
    window.localStorage.setItem("qbb-language", language);
    i18n.changeLanguage(language).catch(() => undefined);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, availableLanguages: languages }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
