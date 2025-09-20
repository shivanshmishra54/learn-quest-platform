"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Coins } from "lucide-react"

interface LeaderboardProps {
  currentUser: {
    name: string
    rank: number
    coins: number
  }
  totalStudents: number
}

export function Leaderboard({ currentUser, totalStudents }: LeaderboardProps) {
  // Mock leaderboard data
  const topStudents = [
    { name: "Arjun S.", coins: 2150, rank: 1, avatar: "A" },
    { name: "Priya M.", coins: 1980, rank: 2, avatar: "P" },
    { name: "Rahul K.", coins: 1850, rank: 3, avatar: "R" },
    { name: "Sneha P.", coins: 1720, rank: 4, avatar: "S" },
    { name: "Vikram T.", coins: 1650, rank: 5, avatar: "V" },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 border-yellow-200"
      case 2:
        return "bg-gray-50 border-gray-200"
      case 3:
        return "bg-amber-50 border-amber-200"
      default:
        return "bg-white border-gray-200"
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Trophy className="w-5 h-5" />
          Class Leaderboard
        </CardTitle>
        <p className="text-sm text-gray-600">{totalStudents} students competing</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Top Students */}
        {topStudents.map((student) => (
          <div
            key={student.rank}
            className={`flex items-center gap-3 p-3 rounded-lg border ${getRankColor(student.rank)}`}
          >
            <div className="flex items-center justify-center">{getRankIcon(student.rank)}</div>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-green-600 text-white text-sm">{student.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-sm">{student.name}</p>
              <div className="flex items-center gap-1 text-xs text-yellow-600">
                <Coins className="w-3 h-3" />
                {student.coins}
              </div>
            </div>
          </div>
        ))}

        {/* Current User Position (if not in top 5) */}
        {currentUser.rank > 5 && (
          <>
            <div className="border-t border-gray-200 my-3"></div>
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-green-50 border-green-200">
              <div className="flex items-center justify-center">
                <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-green-600">
                  #{currentUser.rank}
                </span>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-green-600 text-white text-sm">
                  {currentUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-green-800 text-sm">{currentUser.name} (You)</p>
                <div className="flex items-center gap-1 text-xs text-yellow-600">
                  <Coins className="w-3 h-3" />
                  {currentUser.coins}
                </div>
              </div>
              <Badge className="bg-green-600 text-white">You</Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
