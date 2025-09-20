"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"

export function ClassAnalytics() {
  // Mock analytics data
  const weeklyData = [
    { day: "Mon", active: 45, completed: 23 },
    { day: "Tue", active: 52, completed: 31 },
    { day: "Wed", active: 48, completed: 28 },
    { day: "Thu", active: 61, completed: 35 },
    { day: "Fri", active: 58, completed: 42 },
    { day: "Sat", active: 34, completed: 18 },
    { day: "Sun", active: 29, completed: 15 },
  ]

  const topPerformers = [
    { name: "Arjun S.", improvement: "+15%", subject: "Mathematics" },
    { name: "Priya M.", improvement: "+12%", subject: "Science" },
    { name: "Rahul K.", improvement: "+8%", subject: "Technology" },
  ]

  const strugglingStudents = [
    { name: "Amit P.", decline: "-5%", subject: "Engineering" },
    { name: "Riya S.", decline: "-3%", subject: "Mathematics" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Activity */}
      <Card className="bg-white/90 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Active Students</span>
                    <span className="text-xs font-medium">{day.active}</span>
                  </div>
                  <Progress value={(day.active / 70) * 100} className="w-full h-2" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Games Completed</span>
                    <span className="text-xs font-medium">{day.completed}</span>
                  </div>
                  <Progress value={(day.completed / 50) * 100} className="w-full h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="bg-white/90 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Performance Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Top Performers */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-green-700 mb-3">
              <TrendingUp className="w-4 h-4" />
              Top Performers This Week
            </h4>
            <div className="space-y-2">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm text-gray-800">{student.name}</div>
                    <div className="text-xs text-gray-600">{student.subject}</div>
                  </div>
                  <div className="text-sm font-semibold text-green-600">{student.improvement}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Students Needing Help */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-orange-700 mb-3">
              <TrendingDown className="w-4 h-4" />
              Students Needing Support
            </h4>
            <div className="space-y-2">
              {strugglingStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm text-gray-800">{student.name}</div>
                    <div className="text-xs text-gray-600">{student.subject}</div>
                  </div>
                  <div className="text-sm font-semibold text-orange-600">{student.decline}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
