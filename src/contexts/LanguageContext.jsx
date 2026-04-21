import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGE_OPTIONS, translations } from "../i18n/translations";

const LanguageContext = createContext(null);

function getNestedValue(object, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], object);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("app-language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("app-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const currentLanguageLabel = useMemo(() => {
    const found = LANGUAGE_OPTIONS.find((item) => item.code === language);
    return found?.label || "English";
  }, [language]);

  const changeLanguageByLabel = (label) => {
    const found = LANGUAGE_OPTIONS.find((item) => item.label === label);
    setLanguage(found?.code || "en");
  };

  const t = useMemo(() => {
    return (key, fallback = key) => {
      const currentValue = getNestedValue(translations[language], key);

      if (currentValue !== undefined) {
        return currentValue;
      }

      const englishValue = getNestedValue(translations.en, key);

      if (englishValue !== undefined) {
        return englishValue;
      }

      return fallback;
    };
  }, [language]);

  const value = {
    language,
    setLanguage,
    currentLanguageLabel,
    changeLanguageByLabel,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }

  return context;
}
