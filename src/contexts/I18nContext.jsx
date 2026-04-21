import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  languageLabels,
  languageOptions,
  translations,
} from "../i18n/translations";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("app-language");
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("app-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => {
    return (key) => {
      return translations[language]?.[key] ?? translations.en?.[key] ?? key;
    };
  }, [language]);

  const currentLanguageLabel = useMemo(() => {
    return languageLabels[language] || "English";
  }, [language]);

  const changeLanguageByLabel = (label) => {
    const nextLanguage = languageOptions[label] || "en";
    setLanguage(nextLanguage);
  };

  const value = {
    language,
    setLanguage,
    t,
    currentLanguageLabel,
    changeLanguageByLabel,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
