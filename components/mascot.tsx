"use client"

import { useState, useEffect } from "react"

interface MascotProps {
  message?: string
  mood?: "happy" | "excited" | "thinking" | "celebrating"
  size?: "sm" | "md" | "lg"
}

export function Mascot({ message, mood = "happy", size = "md" }: MascotProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const moodColors = {
    happy: "from-green-400 to-green-600",
    excited: "from-yellow-400 to-orange-500",
    thinking: "from-blue-400 to-blue-600",
    celebrating: "from-purple-400 to-pink-500",
  }

  const moodEmojis = {
    happy: "😊",
    excited: "🤩",
    thinking: "🤔",
    celebrating: "🎉",
  }

  return (
    <div className="relative">
      <div
        className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br ${moodColors[mood]} 
        rounded-full flex items-center justify-center
        ${isAnimating ? "animate-bounce-gentle" : ""}
        shadow-lg
      `}
      >
        <span className="text-2xl">{moodEmojis[mood]}</span>
      </div>

      {message && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-2 shadow-lg border-2 border-green-200 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-800">{message}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-200"></div>
        </div>
      )}
    </div>
  )
}
