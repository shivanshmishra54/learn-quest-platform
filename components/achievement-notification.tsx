"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Trophy, Star, Award } from "lucide-react"
import type { Badge as BadgeType, Achievement } from "@/lib/gamification"

interface AchievementNotificationProps {
  badge?: BadgeType
  achievement?: Achievement
  onClose: () => void
}

export function AchievementNotification({ badge, achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!badge && !achievement) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 shadow-lg max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {badge && <Trophy className="w-5 h-5 text-yellow-600" />}
              {achievement && <Award className="w-5 h-5 text-yellow-600" />}
              <span className="font-semibold text-yellow-800">{badge ? "Badge Earned!" : "Achievement Unlocked!"}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-3xl">{badge?.icon || achievement?.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{badge?.name || achievement?.title}</h3>
              <p className="text-sm text-gray-600">{badge?.description || achievement?.description}</p>
              {achievement && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs font-medium text-yellow-700">{achievement.points} points</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <Button size="sm" variant="outline" onClick={() => setIsVisible(false)}>
              Awesome!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
