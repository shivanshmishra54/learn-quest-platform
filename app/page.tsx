"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Trophy, Star, Zap, Globe } from "lucide-react"

export default function LandingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  ]

  const translations = {
    en: {
      title: "LearnQuest",
      tagline: "Play. Learn. Grow.",
      subtitle: "Gamified STEM Learning for Rural Students",
      description:
        "Join thousands of students on an exciting journey through Science, Technology, Engineering, and Mathematics!",
      studentLogin: "Login as Student",
      teacherLogin: "Login as Teacher",
      features: {
        interactive: "Interactive Games",
        multilingual: "Multilingual Support",
        offline: "Offline Ready",
        progress: "Progress Tracking",
        rewards: "Rewards & Badges",
        community: "Class Competition",
      },
      stats: {
        students: "10,000+ Students",
        games: "500+ Games",
        subjects: "4 STEM Subjects",
      },
    },
    hi: {
      title: "लर्नक्वेस्ट",
      tagline: "खेलें. सीखें. बढ़ें.",
      subtitle: "ग्रामीण छात्रों के लिए गेमिफाइड STEM शिक्षा",
      description: "विज्ञान, प्रौद्योगिकी, इंजीनियरिंग और गणित की रोमांचक यात्रा में हजारों छात्रों के साथ जुड़ें!",
      studentLogin: "छात्र के रूप में लॉगिन",
      teacherLogin: "शिक्षक के रूप में लॉगिन",
      features: {
        interactive: "इंटरैक्टिव गेम्स",
        multilingual: "बहुभाषी समर्थन",
        offline: "ऑफलाइन तैयार",
        progress: "प्रगति ट्रैकिंग",
        rewards: "पुरस्कार और बैज",
        community: "कक्षा प्रतियोगिता",
      },
      stats: {
        students: "10,000+ छात्र",
        games: "500+ गेम्स",
        subjects: "4 STEM विषय",
      },
    },
    mr: {
      title: "लर्नक्वेस्ट",
      tagline: "खेळा. शिका. वाढा.",
      subtitle: "ग्रामीण विद्यार्थ्यांसाठी गेमिफाइड STEM शिक्षण",
      description: "विज्ञान, तंत्रज्ञान, अभियांत्रिकी आणि गणिताच्या रोमांचक प्रवासात हजारो विद्यार्थ्यांसोबत सामील व्हा!",
      studentLogin: "विद्यार्थी म्हणून लॉगिन",
      teacherLogin: "शिक्षक म्हणून लॉगिन",
      features: {
        interactive: "इंटरॅक्टिव्ह गेम्स",
        multilingual: "बहुभाषिक समर्थन",
        offline: "ऑफलाइन तयार",
        progress: "प्रगती ट्रॅकिंग",
        rewards: "पुरस्कार आणि बॅज",
        community: "वर्ग स्पर्धा",
      },
      stats: {
        students: "10,000+ विद्यार्थी",
        games: "500+ गेम्स",
        subjects: "4 STEM विषय",
      },
    },
    gu: {
      title: "લર્નક્વેસ્ટ",
      tagline: "રમો. શીખો. વધો.",
      subtitle: "ગ્રામીણ વિદ્યાર્થીઓ માટે ગેમિફાઇડ STEM શિક્ષણ",
      description: "વિજ્ઞાન, ટેકનોલોજી, એન્જિનિયરિંગ અને ગણિતની રોમાંચક યાત્રામાં હજારો વિદ્યાર્થીઓ સાથે જોડાઓ!",
      studentLogin: "વિદ્યાર્થી તરીકે લોગિન",
      teacherLogin: "શિક્ષક તરીકે લોગિન",
      features: {
        interactive: "ઇન્ટરેક્ટિવ ગેમ્સ",
        multilingual: "બહુભાષી સપોર્ટ",
        offline: "ઓફલાઇન તૈયાર",
        progress: "પ્રગતિ ટ્રેકિંગ",
        rewards: "પુરસ્કારો અને બેજ",
        community: "વર્ગ સ્પર્ધા",
      },
      stats: {
        students: "10,000+ વિદ્યાર્થીઓ",
        games: "500+ ગેમ્સ",
        subjects: "4 STEM વિષયો",
      },
    },
  }

  const t = translations[selectedLanguage as keyof typeof translations]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
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

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          {/* Mascot/Logo Area */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce-gentle">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl font-bold text-green-800 mb-4 text-balance">{t.title}</h1>
          <p className="text-2xl text-green-600 font-semibold mb-2">{t.tagline}</p>
          <p className="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 text-pretty">{t.description}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-green-600 hover:bg-green-700 animate-pulse-glow"
              onClick={() => (window.location.href = "/student/login")}
            >
              <Users className="w-6 h-6 mr-2" />
              {t.studentLogin}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              onClick={() => (window.location.href = "/teacher/login")}
            >
              <BookOpen className="w-6 h-6 mr-2" />
              {t.teacherLogin}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.entries(t.stats).map(([key, value]) => (
              <Card key={key} className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-700 mb-2">{value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(t.features).map(([key, value]) => {
            const icons = {
              interactive: Zap,
              multilingual: Globe,
              offline: BookOpen,
              progress: Trophy,
              rewards: Star,
              community: Users,
            }
            const Icon = icons[key as keyof typeof icons]

            return (
              <Card
                key={key}
                className="bg-white/90 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{value}</h3>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* STEM Subjects Preview */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-8">STEM Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Science", icon: "🔬", color: "bg-blue-100 text-blue-800" },
              { name: "Technology", icon: "💻", color: "bg-purple-100 text-purple-800" },
              { name: "Engineering", icon: "⚙️", color: "bg-orange-100 text-orange-800" },
              { name: "Mathematics", icon: "📊", color: "bg-red-100 text-red-800" },
            ].map((subject) => (
              <Card
                key={subject.name}
                className="bg-white/90 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{subject.icon}</div>
                  <Badge className={`${subject.color} text-sm font-medium`}>{subject.name}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
