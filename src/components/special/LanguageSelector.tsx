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

  const current = LANGUAGES.find((lang) => lang.code === language) ?? LANGUAGES[0];

  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-[var(--border-primary)] bg-[var(--bg-elevated)] px-4 py-2 text-sm" style={{ color: "var(--text-primary)" }}>
      <Globe size={16} />
      <button type="button" onClick={() => setOpen((prev) => !prev)} className="font-semibold">
        {current.label}
      </button>
      {open && (
        <div className="absolute top-full mt-2 right-0 w-40 rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-primary)] shadow-lg py-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setSelected(lang.code);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm transition-colors duration-200 hover:bg-[var(--bg-elevated)]"
              style={{ color: "var(--text-secondary)" }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
