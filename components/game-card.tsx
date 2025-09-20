"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Coins, Clock, Zap, Target, Puzzle } from "lucide-react"

interface Game {
  id: string
  name: string
  type: "quiz" | "simulation" | "memory" | "puzzle" | "timed" | "sequence"
  difficulty: "easy" | "medium" | "hard"
  coins: number
}

interface GameCardProps {
  game: Game
  onPlay: () => void
}

export function GameCard({ game, onPlay }: GameCardProps) {
  const getGameIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return Target
      case "simulation":
        return Zap
      case "memory":
        return "🧠"
      case "puzzle":
        return Puzzle
      case "timed":
        return Clock
      case "sequence":
        return "🔢"
      default:
        return Play
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const Icon = getGameIcon(game.type)

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          {typeof Icon === "string" ? (
            <span className="text-2xl">{Icon}</span>
          ) : (
            <Icon className="w-6 h-6 text-green-600" />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-sm">{game.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={`text-xs ${getDifficultyColor(game.difficulty)}`}>{game.difficulty}</Badge>
              <div className="flex items-center gap-1 text-xs text-yellow-600">
                <Coins className="w-3 h-3" />
                {game.coins}
              </div>
            </div>
          </div>
        </div>

        <Button onClick={onPlay} className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm">
          <Play className="w-4 h-4 mr-2" />
          Play Now
        </Button>
      </CardContent>
    </Card>
  )
}
