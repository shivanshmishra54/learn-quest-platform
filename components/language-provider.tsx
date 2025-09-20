"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Common translations
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
    "common.close": "Close",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.profile": "Profile",
    "nav.settings": "Settings",
    "nav.logout": "Logout",
    "nav.history": "History",

    // Subjects
    "subjects.science": "Science",
    "subjects.technology": "Technology",
    "subjects.engineering": "Engineering",
    "subjects.mathematics": "Mathematics",

    // Gamification
    "game.score": "Score",
    "game.level": "Level",
    "game.coins": "Coins",
    "game.badges": "Badges",
    "game.streak": "Streak",
    "game.leaderboard": "Leaderboard",
  },
  hi: {
    // Common translations
    "common.loading": "लोड हो रहा है...",
    "common.error": "कुछ गलत हुआ",
    "common.save": "सेव करें",
    "common.cancel": "रद्द करें",
    "common.delete": "हटाएं",
    "common.edit": "संपादित करें",
    "common.back": "वापस",
    "common.next": "अगला",
    "common.previous": "पिछला",
    "common.submit": "जमा करें",
    "common.close": "बंद करें",

    // Navigation
    "nav.dashboard": "डैशबोर्ड",
    "nav.profile": "प्रोफाइल",
    "nav.settings": "सेटिंग्स",
    "nav.logout": "लॉगआउट",
    "nav.history": "इतिहास",

    // Subjects
    "subjects.science": "विज्ञान",
    "subjects.technology": "प्रौद्योगिकी",
    "subjects.engineering": "इंजीनियरिंग",
    "subjects.mathematics": "गणित",

    // Gamification
    "game.score": "स्कोर",
    "game.level": "स्तर",
    "game.coins": "सिक्के",
    "game.badges": "बैज",
    "game.streak": "स्ट्रीक",
    "game.leaderboard": "लीडरबोर्ड",
  },
  mr: {
    // Common translations
    "common.loading": "लोड होत आहे...",
    "common.error": "काहीतरी चूक झाली",
    "common.save": "सेव्ह करा",
    "common.cancel": "रद्द करा",
    "common.delete": "हटवा",
    "common.edit": "संपादित करा",
    "common.back": "मागे",
    "common.next": "पुढे",
    "common.previous": "मागील",
    "common.submit": "सबमिट करा",
    "common.close": "बंद करा",

    // Navigation
    "nav.dashboard": "डॅशबोर्ड",
    "nav.profile": "प्रोफाइल",
    "nav.settings": "सेटिंग्ज",
    "nav.logout": "लॉगआउट",
    "nav.history": "इतिहास",

    // Subjects
    "subjects.science": "विज्ञान",
    "subjects.technology": "तंत्रज्ञान",
    "subjects.engineering": "अभियांत्रिकी",
    "subjects.mathematics": "गणित",

    // Gamification
    "game.score": "स्कोअर",
    "game.level": "स्तर",
    "game.coins": "नाणी",
    "game.badges": "बॅज",
    "game.streak": "स्ट्रीक",
    "game.leaderboard": "लीडरबोर्ड",
  },
  gu: {
    // Common translations
    "common.loading": "લોડ થઈ રહ્યું છે...",
    "common.error": "કંઈક ખોટું થયું",
    "common.save": "સેવ કરો",
    "common.cancel": "રદ કરો",
    "common.delete": "ડિલીટ કરો",
    "common.edit": "એડિટ કરો",
    "common.back": "પાછળ",
    "common.next": "આગળ",
    "common.previous": "પહેલાં",
    "common.submit": "સબમિટ કરો",
    "common.close": "બંધ કરો",

    // Navigation
    "nav.dashboard": "ડેશબોર્ડ",
    "nav.profile": "પ્રોફાઇલ",
    "nav.settings": "સેટિંગ્સ",
    "nav.logout": "લોગઆઉટ",
    "nav.history": "ઇતિહાસ",

    // Subjects
    "subjects.science": "વિજ્ઞાન",
    "subjects.technology": "ટેકનોલોજી",
    "subjects.engineering": "એન્જિનિયરિંગ",
    "subjects.mathematics": "ગણિત",

    // Gamification
    "game.score": "સ્કોર",
    "game.level": "લેવલ",
    "game.coins": "સિક્કા",
    "game.badges": "બેજ",
    "game.streak": "સ્ટ્રીક",
    "game.leaderboard": "લીડરબોર્ડ",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    // Load language from localStorage or user data
    const userData = localStorage.getItem("learnquest_user")
    if (userData) {
      const parsed = JSON.parse(userData)
      if (parsed.language) {
        setLanguage(parsed.language)
      }
    }
  }, [])

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
