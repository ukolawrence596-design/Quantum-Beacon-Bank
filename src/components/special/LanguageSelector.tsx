import { useState } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const current =
    LANGUAGES.find((lang) => lang.code === language) ?? LANGUAGES[0];

  const handleSelect = (code: string) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-4 py-2 text-sm">
      <Globe size={16} style={{ color: "var(--text-primary)" }} />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {current.label}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-primary)] py-2 shadow-lg">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className="w-full px-4 py-2 text-left text-sm transition-colors duration-200 hover:bg-[var(--bg-elevated)]"
              style={{
                color:
                  language === lang.code
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                fontWeight: language === lang.code ? 600 : 400,
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
