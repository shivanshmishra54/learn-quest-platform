"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, Users, BookOpen, BarChart3, Plus, Filter } from "lucide-react"
import { Mascot } from "@/components/mascot"
import { requireAuth, type UserData } from "@/lib/auth"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { StudentList } from "@/components/student-list"
import { ClassAnalytics } from "@/components/class-analytics"

export default function TeacherDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const user = requireAuth("teacher")
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

  // Mock class data
  const classStats = {
    totalStudents: 156,
    activeToday: 89,
    averageProgress: 67,
    totalQuestions: 245,
    subjectBreakdown: [
      { subject: "Mathematics", students: 45, avgProgress: 78 },
      { subject: "Science", students: 42, avgProgress: 65 },
      { subject: "Technology", students: 38, avgProgress: 58 },
      { subject: "Engineering", students: 31, avgProgress: 52 },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userData={userData} />

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
                  <h1 className="text-xl font-bold text-green-800">Welcome, {userData.username}!</h1>
                  <p className="text-sm text-green-600">Manage your students and content</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => (window.location.href = "/teacher/questions/add")}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
              <Avatar>
                <AvatarFallback className="bg-green-600 text-white">
                  {userData.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            size="sm"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === "students" ? "default" : "outline"}
            onClick={() => setActiveTab("students")}
            size="sm"
          >
            <Users className="w-4 h-4 mr-2" />
            Students
          </Button>
          <Button
            variant={activeTab === "questions" ? "default" : "outline"}
            onClick={() => setActiveTab("questions")}
            size="sm"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Question Bank
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-800">{classStats.totalStudents}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">{classStats.activeToday}</div>
                  <div className="text-sm text-gray-600">Active Today</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-800">{classStats.averageProgress}%</div>
                  <div className="text-sm text-gray-600">Avg Progress</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-800">{classStats.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Questions Added</div>
                </CardContent>
              </Card>
            </div>

            {/* Subject Breakdown */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classStats.subjectBreakdown.map((subject) => (
                    <div key={subject.subject} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{subject.subject}</h3>
                          <p className="text-sm text-gray-600">{subject.students} students enrolled</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-700">{subject.avgProgress}%</div>
                        <div className="text-sm text-gray-600">Average Progress</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <ClassAnalytics />
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && <StudentList />}

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-green-800">Question Bank</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button
                  onClick={() => (window.location.href = "/teacher/questions/add")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </div>

            {/* Question Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { subject: "Science", count: 78, icon: "🔬", color: "bg-blue-100 text-blue-800" },
                { subject: "Technology", count: 65, icon: "💻", color: "bg-purple-100 text-purple-800" },
                { subject: "Engineering", count: 52, icon: "⚙️", color: "bg-orange-100 text-orange-800" },
                { subject: "Mathematics", count: 89, icon: "📊", color: "bg-red-100 text-red-800" },
              ].map((category) => (
                <Card
                  key={category.subject}
                  className="bg-white/90 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => (window.location.href = `/teacher/questions/${category.subject.toLowerCase()}`)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-2">{category.subject}</h3>
                    <Badge className={category.color}>{category.count} Questions</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Questions */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Recent Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      question: "What is the chemical formula for water?",
                      subject: "Science",
                      difficulty: "Easy",
                      game: "Science Quiz",
                      date: "2 hours ago",
                    },
                    {
                      question: "Calculate the area of a circle with radius 5cm",
                      subject: "Mathematics",
                      difficulty: "Medium",
                      game: "Math Race",
                      date: "1 day ago",
                    },
                    {
                      question: "What is the primary function of a CPU?",
                      subject: "Technology",
                      difficulty: "Medium",
                      game: "Tech Timeline",
                      date: "2 days ago",
                    },
                  ].map((q, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 mb-1">{q.question}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="outline" className="text-xs">
                            {q.subject}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {q.difficulty}
                          </Badge>
                          <span>•</span>
                          <span>{q.game}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{q.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
