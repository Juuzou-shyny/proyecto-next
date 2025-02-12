"use client";

import { useState, useEffect } from "react";

export default function LanguageToggle({ onLanguageChange }: { onLanguageChange: (lang: string) => void }) {
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    onLanguageChange(newLanguage); // Actualiza el idioma en la app
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md shadow"
    >
      {language === "es" ? "🇬🇧 English" : "🇪🇸 Español"}
    </button>
  );
}
