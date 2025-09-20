"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Lock, BookOpen } from "lucide-react"
import { Mascot } from "@/components/mascot"
import Link from "next/link"

export default function TeacherLogin() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  ]

  const translations = {
    en: {
      title: "Teacher Login",
      subtitle: "Welcome back, educator!",
      username: "Username",
      password: "Password",
      login: "Access Dashboard",
      backToHome: "Back to Home",
      mascotMessage: "Ready to inspire minds?",
    },
    hi: {
      title: "शिक्षक लॉगिन",
      subtitle: "वापस आपका स्वागत है, शिक्षक!",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      login: "डैशबोर्ड एक्सेस करें",
      backToHome: "होम पर वापस",
      mascotMessage: "दिमागों को प्रेरित करने के लिए तैयार?",
    },
    mr: {
      title: "शिक्षक लॉगिन",
      subtitle: "परत आपले स्वागत आहे, शिक्षक!",
      username: "वापरकर्ता नाव",
      password: "पासवर्ड",
      login: "डॅशबोर्ड अॅक्सेस करा",
      backToHome: "घरी परत",
      mascotMessage: "मनांना प्रेरणा देण्यासाठी तयार?",
    },
    gu: {
      title: "શિક્ષક લોગિન",
      subtitle: "પાછા આવવા બદલ આભાર, શિક્ષક!",
      username: "વપરાશકર્તા નામ",
      password: "પાસવર્ડ",
      login: "ડેશબોર્ડ એક્સેસ કરો",
      backToHome: "ઘર પર પાછા",
      mascotMessage: "મનને પ્રેરણા આપવા માટે તૈયાર?",
    },
  }

  const t = translations[selectedLanguage as keyof typeof translations]

  const handleLogin = () => {
    // Store user preferences in localStorage
    const userData = {
      role: "teacher",
      language: selectedLanguage,
      username: formData.username,
    }
    localStorage.setItem("learnquest_user", JSON.stringify(userData))

    // Redirect to teacher dashboard
    window.location.href = "/teacher/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={selectedLanguage === lang.code ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLanguage(lang.code)}
              className="text-xs"
            >
              {lang.flag} {lang.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToHome}
        </Button>
      </Link>

      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-green-200 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Mascot message={t.mascotMessage} mood="thinking" size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">{t.title}</CardTitle>
          <p className="text-green-600 text-sm">{t.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
              {t.username}
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder={t.username}
                className="pl-10"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              {t.password}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder={t.password}
                className="pl-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 animate-pulse-glow"
            disabled={!formData.username || !formData.password}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {t.login}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
