"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Search, Eye, TrendingUp, Trophy } from "lucide-react"

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null)

  // Mock student data
  const students = [
    {
      id: 1,
      name: "Arjun Sharma",
      grade: "10",
      totalProgress: 78,
      subjects: {
        science: 85,
        technology: 72,
        engineering: 65,
        mathematics: 90,
      },
      coins: 2150,
      streak: 12,
      lastActive: "2 hours ago",
      rank: 1,
    },
    {
      id: 2,
      name: "Priya Mehta",
      grade: "9",
      totalProgress: 72,
      subjects: {
        science: 78,
        technology: 68,
        engineering: 70,
        mathematics: 82,
      },
      coins: 1980,
      streak: 8,
      lastActive: "1 hour ago",
      rank: 2,
    },
    {
      id: 3,
      name: "Rahul Kumar",
      grade: "11",
      totalProgress: 65,
      subjects: {
        science: 70,
        technology: 75,
        engineering: 55,
        mathematics: 68,
      },
      coins: 1850,
      streak: 5,
      lastActive: "3 hours ago",
      rank: 3,
    },
    {
      id: 4,
      name: "Sneha Patel",
      grade: "10",
      totalProgress: 68,
      subjects: {
        science: 72,
        technology: 65,
        engineering: 62,
        mathematics: 75,
      },
      coins: 1720,
      streak: 15,
      lastActive: "30 minutes ago",
      rank: 4,
    },
    {
      id: 5,
      name: "Vikram Thakur",
      grade: "12",
      totalProgress: 58,
      subjects: {
        science: 62,
        technology: 55,
        engineering: 60,
        mathematics: 55,
      },
      coins: 1650,
      streak: 3,
      lastActive: "5 hours ago",
      rank: 5,
    },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = selectedGrade === null || student.grade === selectedGrade
    return matchesSearch && matchesGrade
  })

  const grades = ["6", "7", "8", "9", "10", "11", "12"]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-white/90 backdrop-blur-sm border-green-200">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedGrade === null ? "default" : "outline"}
                onClick={() => setSelectedGrade(null)}
                size="sm"
              >
                All Grades
              </Button>
              {grades.map((grade) => (
                <Button
                  key={grade}
                  variant={selectedGrade === grade ? "default" : "outline"}
                  onClick={() => setSelectedGrade(grade)}
                  size="sm"
                >
                  Grade {grade}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            className="bg-white/90 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-green-600 text-white">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-green-800">{student.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Grade {student.grade}</span>
                      <span>•</span>
                      <span>Rank #{student.rank}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = `/teacher/student/${student.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Overall Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-green-700">{student.totalProgress}%</span>
                </div>
                <Progress value={student.totalProgress} className="w-full" />
              </div>

              {/* Subject Progress */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(student.subjects).map(([subject, progress]) => (
                  <div key={subject} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600 capitalize">{subject}</span>
                      <span className="text-xs font-bold text-gray-800">{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full h-2" />
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">{student.coins}</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">{student.streak} days</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Active {student.lastActive}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-green-200">
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">No students found matching your criteria.</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
