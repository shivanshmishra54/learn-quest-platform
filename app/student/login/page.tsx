"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Lock, GraduationCap } from "lucide-react"
import { Mascot } from "@/components/mascot"
import Link from "next/link"

export default function StudentLogin() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    grade: "",
    difficulty: "",
  })

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  ]

  const translations = {
    en: {
      title: "Student Login",
      subtitle: "Ready to start your learning adventure?",
      username: "Username",
      password: "Password",
      grade: "Select Your Grade",
      difficulty: "Choose Difficulty Level",
      login: "Start Learning!",
      backToHome: "Back to Home",
      grades: {
        "6": "Grade 6",
        "7": "Grade 7",
        "8": "Grade 8",
        "9": "Grade 9",
        "10": "Grade 10",
        "11": "Grade 11",
        "12": "Grade 12",
      },
      difficulties: {
        easy: "Easy - I'm just starting",
        medium: "Medium - I know some basics",
        hard: "Hard - I love challenges!",
      },
      mascotMessage: "Let's learn together!",
    },
    hi: {
      title: "छात्र लॉगिन",
      subtitle: "अपनी सीखने की यात्रा शुरू करने के लिए तैयार हैं?",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      grade: "अपनी कक्षा चुनें",
      difficulty: "कठिनाई स्तर चुनें",
      login: "सीखना शुरू करें!",
      backToHome: "होम पर वापस",
      grades: {
        "6": "कक्षा 6",
        "7": "कक्षा 7",
        "8": "कक्षा 8",
        "9": "कक्षा 9",
        "10": "कक्षा 10",
        "11": "कक्षा 11",
        "12": "कक्षा 12",
      },
      difficulties: {
        easy: "आसान - मैं अभी शुरुआत कर रहा हूं",
        medium: "मध्यम - मुझे कुछ बुनियादी बातें पता हैं",
        hard: "कठिन - मुझे चुनौतियां पसंद हैं!",
      },
      mascotMessage: "आइए एक साथ सीखते हैं!",
    },
    mr: {
      title: "विद्यार्थी लॉगिन",
      subtitle: "तुमचा शिकण्याचा प्रवास सुरू करायला तयार आहात?",
      username: "वापरकर्ता नाव",
      password: "पासवर्ड",
      grade: "तुमचा वर्ग निवडा",
      difficulty: "अडचणी पातळी निवडा",
      login: "शिकायला सुरुवात करा!",
      backToHome: "घरी परत",
      grades: {
        "6": "वर्ग 6",
        "7": "वर्ग 7",
        "8": "वर्ग 8",
        "9": "वर्ग 9",
        "10": "वर्ग 10",
        "11": "वर्ग 11",
        "12": "वर्ग 12",
      },
      difficulties: {
        easy: "सोपे - मी नुकतेच सुरुवात करत आहे",
        medium: "मध्यम - मला काही मूलभूत गोष्टी माहित आहेत",
        hard: "कठीण - मला आव्हाने आवडतात!",
      },
      mascotMessage: "चला एकत्र शिकूया!",
    },
    gu: {
      title: "વિદ્યાર્થી લોગિન",
      subtitle: "તમારી શીખવાની સફર શરૂ કરવા માટે તૈયાર છો?",
      username: "વપરાશકર્તા નામ",
      password: "પાસવર્ડ",
      grade: "તમારો ધોરણ પસંદ કરો",
      difficulty: "મુશ્કેલી સ્તર પસંદ કરો",
      login: "શીખવાની શરૂઆત કરો!",
      backToHome: "ઘર પર પાછા",
      grades: {
        "6": "ધોરણ 6",
        "7": "ધોરણ 7",
        "8": "ધોરણ 8",
        "9": "ધોરણ 9",
        "10": "ધોરણ 10",
        "11": "ધોરણ 11",
        "12": "ધોરણ 12",
      },
      difficulties: {
        easy: "સરળ - હું હમણાં જ શરૂઆત કરી રહ્યો છું",
        medium: "મધ્યમ - મને કેટલીક મૂળભૂત બાબતો ખબર છે",
        hard: "મુશ્કેલ - મને પડકારો ગમે છે!",
      },
      mascotMessage: "ચાલો સાથે શીખીએ!",
    },
  }

  const t = translations[selectedLanguage as keyof typeof translations]

  const handleLogin = () => {
    // Store user preferences in localStorage
    const userData = {
      role: "student",
      language: selectedLanguage,
      grade: formData.grade,
      difficulty: formData.difficulty,
      username: formData.username,
    }
    localStorage.setItem("learnquest_user", JSON.stringify(userData))

    // Redirect to student dashboard
    window.location.href = "/student/dashboard"
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
            <Mascot message={t.mascotMessage} mood="excited" size="lg" />
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

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">{t.grade}</Label>
            <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t.grade} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.grades).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">{t.difficulty}</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.difficulty} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.difficulties).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          value === "easy"
                            ? "border-green-500 text-green-700"
                            : value === "medium"
                              ? "border-yellow-500 text-yellow-700"
                              : "border-red-500 text-red-700"
                        }
                      >
                        {label}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 animate-pulse-glow"
            disabled={!formData.username || !formData.password || !formData.grade || !formData.difficulty}
          >
            {t.login}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
