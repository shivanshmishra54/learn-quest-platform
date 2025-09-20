"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, Coins, Zap, Target, Award, Edit } from "lucide-react"
import { Mascot } from "@/components/mascot"
import { requireAuth, type UserData } from "@/lib/auth"
import { BADGES, ACHIEVEMENTS, getXPProgress } from "@/lib/gamification"
import Link from "next/link"

export default function StudentProfile() {
  const [userData, setUserData] = useState<UserData | null>(null)

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
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Mock user progress data
  const userProgress = {
    level: 8,
    totalXP: 6400,
    coins: 1250,
    streak: 12,
    totalGamesPlayed: 45,
    averageScore: 78,
    timeSpent: 1440, // minutes
    rank: 23,
    subjectProgress: {
      mathematics: { level: 9, xp: 810, gamesCompleted: 15, averageScore: 85, timeSpent: 420 },
      science: { level: 7, xp: 490, gamesCompleted: 12, averageScore: 78, timeSpent: 380 },
      technology: { level: 6, xp: 360, gamesCompleted: 8, averageScore: 72, timeSpent: 280 },
      engineering: { level: 5, xp: 250, gamesCompleted: 6, averageScore: 68, timeSpent: 200 },
    },
  }

  const earnedBadges = BADGES.filter((badge, index) => index < 4).map((badge) => ({
    ...badge,
    earned: true,
    earnedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }))

  const unlockedAchievements = ACHIEVEMENTS.filter((achievement, index) => index < 3).map((achievement) => ({
    ...achievement,
    unlocked: true,
    progress: achievement.maxProgress,
  }))

  const xpProgress = getXPProgress(userProgress.totalXP, userProgress.level)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/student/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Info Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-green-600 text-white text-2xl">
                        {userData.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-yellow-800">{userProgress.level}</span>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">{userData.username}</h2>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Grade {userData.grade}</p>
                  <p>Difficulty: {userData.difficulty}</p>
                  <p>Class Rank: #{userProgress.rank}</p>
                </div>

                {/* Level Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Level {userProgress.level}</span>
                    <span className="text-sm text-gray-600">
                      {xpProgress.current}/{xpProgress.needed} XP
                    </span>
                  </div>
                  <Progress value={(xpProgress.current / xpProgress.needed) * 100} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-700">Coins</span>
                  </div>
                  <span className="font-semibold text-yellow-700">{userProgress.coins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-700">Streak</span>
                  </div>
                  <span className="font-semibold text-orange-700">{userProgress.streak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Games Played</span>
                  </div>
                  <span className="font-semibold text-blue-700">{userProgress.totalGamesPlayed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700">Avg Score</span>
                  </div>
                  <span className="font-semibold text-purple-700">{userProgress.averageScore}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="progress" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Subject Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(userProgress.subjectProgress).map(([subject, progress]) => (
                      <div key={subject} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 capitalize">{subject}</h3>
                          <Badge className="bg-green-100 text-green-800">Level {progress.level}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-gray-800">{progress.gamesCompleted}</div>
                            <div className="text-gray-600">Games</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-800">{progress.averageScore}%</div>
                            <div className="text-gray-600">Avg Score</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-800">{Math.floor(progress.timeSpent / 60)}h</div>
                            <div className="text-gray-600">Time Spent</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-800">{progress.xp}</div>
                            <div className="text-gray-600">XP Earned</div>
                          </div>
                        </div>
                        <Progress value={(progress.level / 10) * 100} className="w-full" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Badges Tab */}
              <TabsContent value="badges" className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Earned Badges ({earnedBadges.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {earnedBadges.map((badge) => (
                        <div
                          key={badge.id}
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200"
                        >
                          <div className="text-3xl">{badge.icon}</div>
                          <div className="flex-1">
                            <h3 className={`font-semibold ${badge.color}`}>{badge.name}</h3>
                            <p className="text-sm text-gray-600">{badge.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Earned {new Date(badge.earnedDate!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Available Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {BADGES.filter((badge) => !earnedBadges.some((earned) => earned.id === badge.id)).map((badge) => (
                        <div
                          key={badge.id}
                          className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-60"
                        >
                          <div className="text-3xl grayscale">{badge.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-700">{badge.name}</h3>
                            <p className="text-sm text-gray-600">{badge.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{badge.requirement}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Unlocked Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {unlockedAchievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200"
                        >
                          <div className="text-4xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-yellow-800">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Award className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-700">{achievement.points} points</span>
                            </div>
                          </div>
                          <Badge className="bg-yellow-600 text-white">Unlocked!</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">In Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ACHIEVEMENTS.filter(
                        (achievement) => !unlockedAchievements.some((unlocked) => unlocked.id === achievement.id),
                      )
                        .slice(0, 3)
                        .map((achievement) => {
                          const progress = Math.floor(Math.random() * achievement.maxProgress)
                          return (
                            <div key={achievement.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                              <div className="text-4xl opacity-60">{achievement.icon}</div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                                <p className="text-sm text-gray-600">{achievement.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Progress value={(progress / achievement.maxProgress) * 100} className="flex-1" />
                                  <span className="text-sm text-gray-600">
                                    {progress}/{achievement.maxProgress}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          game: "Math Race",
                          subject: "Mathematics",
                          score: 95,
                          xp: 45,
                          coins: 25,
                          date: "2 hours ago",
                        },
                        {
                          game: "Science Quiz",
                          subject: "Science",
                          score: 78,
                          xp: 32,
                          coins: 18,
                          date: "1 day ago",
                        },
                        {
                          game: "Bridge Builder",
                          subject: "Engineering",
                          score: 85,
                          xp: 68,
                          coins: 35,
                          date: "2 days ago",
                        },
                        {
                          game: "Coding Basics",
                          subject: "Technology",
                          score: 72,
                          xp: 38,
                          coins: 22,
                          date: "3 days ago",
                        },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{activity.game}</h3>
                            <p className="text-sm text-gray-600">{activity.subject}</p>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-green-700">{activity.score}%</div>
                              <div className="text-gray-500">Score</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-blue-700">+{activity.xp}</div>
                              <div className="text-gray-500">XP</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-yellow-700">+{activity.coins}</div>
                              <div className="text-gray-500">Coins</div>
                            </div>
                            <div className="text-xs text-gray-500 min-w-20">{activity.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
