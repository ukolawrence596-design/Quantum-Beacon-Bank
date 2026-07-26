import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

const supportedLanguages = ["en", "es", "fr", "de"];

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: supportedLanguages,
    fallbackLng: "en",
    debug: import.meta.env.DEV,
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
      lookupLocalStorage: "qbb-language",
      checkWhitelist: true,
    },
    react: {
      useSuspense: false,
      wait: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
