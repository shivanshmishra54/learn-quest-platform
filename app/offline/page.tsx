"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, Play, WifiOff, HardDrive, Trash2 } from "lucide-react"
import { Mascot } from "@/components/mascot"
import { OfflineManager, type OfflineGame } from "@/lib/offline"
import Link from "next/link"

export default function OfflinePage() {
  const [cachedGames, setCachedGames] = useState<OfflineGame[]>([])
  const [storageUsage, setStorageUsage] = useState({ used: 0, available: 0 })
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const updateData = () => {
      setCachedGames(OfflineManager.getCachedGames())
      setStorageUsage(OfflineManager.getStorageUsage())
      setIsOnline(OfflineManager.isOnline())
    }

    updateData()

    const handleOnlineStatusChange = () => {
      updateData()
    }

    window.addEventListener("online", handleOnlineStatusChange)
    window.addEventListener("offline", handleOnlineStatusChange)

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange)
      window.removeEventListener("offline", handleOnlineStatusChange)
    }
  }, [])

  const handleCacheGame = (gameId: string) => {
    // In a real app, you would fetch the game data from your API
    const mockGame: OfflineGame = {
      id: gameId,
      name: "Sample Game",
      subject: "Science",
      difficulty: "medium",
      questions: [
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          correct: 0,
          explanation: "Water is composed of two hydrogen atoms and one oxygen atom.",
        },
      ],
      cachedAt: new Date().toISOString(),
    }

    OfflineManager.cacheGame(mockGame)
    setCachedGames(OfflineManager.getCachedGames())
    setStorageUsage(OfflineManager.getStorageUsage())
  }

  const handleClearCache = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("learnquest_offline_games")
      setCachedGames([])
      setStorageUsage(OfflineManager.getStorageUsage())
    }
  }

  const availableGames = [
    { id: "science-quiz-1", name: "Basic Science Quiz", subject: "Science", difficulty: "easy" },
    { id: "math-race-1", name: "Math Race Challenge", subject: "Mathematics", difficulty: "medium" },
    { id: "tech-puzzle-1", name: "Technology Puzzle", subject: "Technology", difficulty: "hard" },
    { id: "engineering-sim-1", name: "Bridge Builder", subject: "Engineering", difficulty: "medium" },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Mascot mood="thinking" size="sm" />
              <div>
                <h1 className="text-2xl font-bold text-green-800">Offline Learning</h1>
                <p className="text-sm text-green-600">Download games for offline play</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            ) : (
              <Badge className="bg-orange-100 text-orange-800">
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Storage Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <HardDrive className="w-5 h-5" />
                  Storage Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Used Storage</span>
                    <span className="text-sm font-medium">{storageUsage.used.toFixed(1)} MB</span>
                  </div>
                  <Progress value={(storageUsage.used / 5) * 100} className="w-full" />
                  <div className="text-xs text-gray-500 mt-1">Available: {storageUsage.available.toFixed(1)} MB</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cached Games</span>
                    <span className="font-medium">{cachedGames.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Offline Progress</span>
                    <span className="font-medium">{OfflineManager.getOfflineProgress().length}</span>
                  </div>
                </div>

                {cachedGames.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCache}
                    className="w-full bg-transparent border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                )}
              </CardContent>
            </Card>

            {!isOnline && (
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <WifiOff className="w-4 h-4 text-orange-600" />
                    <span className="font-semibold text-orange-800">Offline Mode</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    You're currently offline. You can still play cached games and your progress will sync when you're
                    back online.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cached Games */}
            {cachedGames.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Downloaded Games ({cachedGames.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cachedGames.map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{game.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {game.subject}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(game.difficulty)}`}>
                              {game.difficulty}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Cached {new Date(game.cachedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => (window.location.href = `/student/game/${game.id}?offline=true`)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Play
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available for Download */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Available for Download</CardTitle>
                <p className="text-sm text-gray-600">Download games to play offline</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableGames
                    .filter((game) => !cachedGames.some((cached) => cached.id === game.id))
                    .map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{game.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {game.subject}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(game.difficulty)}`}>
                              {game.difficulty}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">~2.5 MB download</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCacheGame(game.id)}
                          disabled={!isOnline}
                          className="bg-transparent"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                </div>

                {!isOnline && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-700">
                      You need to be online to download new games. Connect to the internet to access more content.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips for Offline Learning */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Offline Learning Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-blue-700">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Download games when you have a good internet connection</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Your progress is saved locally and will sync when you're back online</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Clear cache regularly to free up storage space</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Install the app for better offline performance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
