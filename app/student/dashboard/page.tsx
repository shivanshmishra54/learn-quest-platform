"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, Trophy, Star, Coins, Zap, Target, Award } from "lucide-react"
import { Mascot } from "@/components/mascot"
import { requireAuth, type UserData } from "@/lib/auth"
import { StudentSidebar } from "@/components/student-sidebar"
import { GameCard } from "@/components/game-card"
import { Leaderboard } from "@/components/leaderboard"

export default function StudentDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  useEffect(() => {
    const user = requireAuth("student")
    if (user) {
      setUserData(user)
    }
  }, [])

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="text-center">
          <Mascot mood="thinking" size="lg" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const subjects = [
    {
      id: "science",
      name: "Science",
      icon: "🔬",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      progress: 65,
      games: [
        { id: "science-quiz", name: "Science Quiz", type: "quiz", difficulty: "medium", coins: 50 },
        { id: "lab-experiment", name: "Virtual Lab", type: "simulation", difficulty: "hard", coins: 75 },
        { id: "biology-match", name: "Biology Match", type: "memory", difficulty: "easy", coins: 30 },
      ],
    },
    {
      id: "technology",
      name: "Technology",
      icon: "💻",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      progress: 45,
      games: [
        { id: "coding-basics", name: "Coding Basics", type: "puzzle", difficulty: "medium", coins: 60 },
        { id: "tech-timeline", name: "Tech Timeline", type: "sequence", difficulty: "easy", coins: 40 },
        { id: "ai-challenge", name: "AI Challenge", type: "quiz", difficulty: "hard", coins: 80 },
      ],
    },
    {
      id: "engineering",
      name: "Engineering",
      icon: "⚙️",
      color: "bg-orange-100 text-orange-800 border-orange-200",
      progress: 30,
      games: [
        { id: "bridge-builder", name: "Bridge Builder", type: "simulation", difficulty: "hard", coins: 90 },
        { id: "machine-parts", name: "Machine Parts", type: "puzzle", difficulty: "medium", coins: 55 },
        { id: "engineering-quiz", name: "Engineering Quiz", type: "quiz", difficulty: "easy", coins: 35 },
      ],
    },
    {
      id: "mathematics",
      name: "Mathematics",
      icon: "📊",
      color: "bg-red-100 text-red-800 border-red-200",
      progress: 80,
      games: [
        { id: "math-race", name: "Math Race", type: "timed", difficulty: "medium", coins: 45 },
        { id: "geometry-puzzle", name: "Geometry Puzzle", type: "puzzle", difficulty: "hard", coins: 70 },
        { id: "number-patterns", name: "Number Patterns", type: "sequence", difficulty: "easy", coins: 25 },
      ],
    },
  ]

  const userStats = {
    totalCoins: 1250,
    currentStreak: 7,
    totalBadges: 12,
    level: 8,
    rank: 23,
    totalStudents: 156,
  }

  const recentBadges = [
    { name: "Math Master", icon: "🏆", color: "text-yellow-600" },
    { name: "Science Explorer", icon: "🔬", color: "text-blue-600" },
    { name: "Week Warrior", icon: "⚡", color: "text-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userData={userData} />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Mascot mood="happy" size="sm" />
                <div>
                  <h1 className="text-xl font-bold text-green-800">Welcome back, {userData.username}!</h1>
                  <p className="text-sm text-green-600">Grade {userData.grade} • Ready to learn?</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold text-yellow-800">{userStats.totalCoins}</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-orange-600" />
                <span className="font-semibold text-orange-800">{userStats.currentStreak}</span>
              </div>
              <Avatar>
                <AvatarFallback className="bg-green-600 text-white">
                  {userData.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{userStats.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">#{userStats.rank}</div>
                  <div className="text-sm text-gray-600">Class Rank</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{userStats.totalBadges}</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{userStats.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Badges */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Star className="w-5 h-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {recentBadges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-2xl">{badge.icon}</span>
                      <span className={`font-medium ${badge.color}`}>{badge.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subject Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedSubject === null ? "default" : "outline"}
                onClick={() => setSelectedSubject(null)}
                size="sm"
              >
                All Subjects
              </Button>
              {subjects.map((subject) => (
                <Button
                  key={subject.id}
                  variant={selectedSubject === subject.id ? "default" : "outline"}
                  onClick={() => setSelectedSubject(subject.id)}
                  size="sm"
                  className="gap-2"
                >
                  <span>{subject.icon}</span>
                  {subject.name}
                </Button>
              ))}
            </div>

            {/* Subjects and Games */}
            <div className="space-y-6">
              {subjects
                .filter((subject) => selectedSubject === null || subject.id === selectedSubject)
                .map((subject) => (
                  <Card key={subject.id} className="bg-white/90 backdrop-blur-sm border-green-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-3 text-green-800">
                          <span className="text-2xl">{subject.icon}</span>
                          {subject.name}
                          <Badge className={subject.color}>{subject.progress}% Complete</Badge>
                        </CardTitle>
                      </div>
                      <Progress value={subject.progress} className="w-full" />
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subject.games.map((game) => (
                          <GameCard
                            key={game.id}
                            game={game}
                            onPlay={() => (window.location.href = `/student/game/${game.id}`)}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            <Leaderboard
              currentUser={{ name: userData.username, rank: userStats.rank, coins: userStats.totalCoins }}
              totalStudents={userStats.totalStudents}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
