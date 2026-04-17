"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Language = "en" | "te"

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = window.localStorage.getItem("cct-language")
    if (saved === "te" || saved === "en") {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === "te" ? "te" : "en"
    document.body.classList.toggle("lang-te", language === "te")
    window.localStorage.setItem("cct-language", language)
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
