"use client"

export interface OfflineGame {
  id: string
  name: string
  subject: string
  difficulty: string
  questions: Array<{
    question: string
    options: string[]
    correct: number
    explanation: string
  }>
  cachedAt: string
}

export interface OfflineProgress {
  gameId: string
  score: number
  completedAt: string
  synced: boolean
}

const OFFLINE_GAMES_KEY = "learnquest_offline_games"
const OFFLINE_PROGRESS_KEY = "learnquest_offline_progress"
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export class OfflineManager {
  static cacheGame(game: OfflineGame): void {
    if (typeof window === "undefined") return

    try {
      const cached = this.getCachedGames()
      const updated = cached.filter((g) => g.id !== game.id)
      updated.push({ ...game, cachedAt: new Date().toISOString() })

      localStorage.setItem(OFFLINE_GAMES_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to cache game:", error)
    }
  }

  static getCachedGames(): OfflineGame[] {
    if (typeof window === "undefined") return []

    try {
      const cached = localStorage.getItem(OFFLINE_GAMES_KEY)
      if (!cached) return []

      const games: OfflineGame[] = JSON.parse(cached)
      const now = Date.now()

      // Filter out expired games
      return games.filter((game) => {
        const cacheTime = new Date(game.cachedAt).getTime()
        return now - cacheTime < CACHE_DURATION
      })
    } catch (error) {
      console.error("Failed to get cached games:", error)
      return []
    }
  }

  static getCachedGame(gameId: string): OfflineGame | null {
    const games = this.getCachedGames()
    return games.find((game) => game.id === gameId) || null
  }

  static saveOfflineProgress(progress: OfflineProgress): void {
    if (typeof window === "undefined") return

    try {
      const existing = this.getOfflineProgress()
      const updated = existing.filter((p) => p.gameId !== progress.gameId)
      updated.push(progress)

      localStorage.setItem(OFFLINE_PROGRESS_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to save offline progress:", error)
    }
  }

  static getOfflineProgress(): OfflineProgress[] {
    if (typeof window === "undefined") return []

    try {
      const progress = localStorage.getItem(OFFLINE_PROGRESS_KEY)
      return progress ? JSON.parse(progress) : []
    } catch (error) {
      console.error("Failed to get offline progress:", error)
      return []
    }
  }

  static getUnsyncedProgress(): OfflineProgress[] {
    return this.getOfflineProgress().filter((p) => !p.synced)
  }

  static markProgressSynced(gameId: string): void {
    if (typeof window === "undefined") return

    try {
      const progress = this.getOfflineProgress()
      const updated = progress.map((p) => (p.gameId === gameId ? { ...p, synced: true } : p))

      localStorage.setItem(OFFLINE_PROGRESS_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to mark progress as synced:", error)
    }
  }

  static clearExpiredCache(): void {
    if (typeof window === "undefined") return

    try {
      const games = this.getCachedGames() // This already filters expired games
      localStorage.setItem(OFFLINE_GAMES_KEY, JSON.stringify(games))
    } catch (error) {
      console.error("Failed to clear expired cache:", error)
    }
  }

  static isOnline(): boolean {
    return typeof navigator !== "undefined" ? navigator.onLine : true
  }

  static async syncWhenOnline(): Promise<void> {
    if (!this.isOnline()) return

    const unsyncedProgress = this.getUnsyncedProgress()
    if (unsyncedProgress.length === 0) return

    try {
      // In a real app, you would send this to your backend
      console.log("Syncing offline progress:", unsyncedProgress)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mark all as synced
      unsyncedProgress.forEach((progress) => {
        this.markProgressSynced(progress.gameId)
      })

      console.log("Offline progress synced successfully")
    } catch (error) {
      console.error("Failed to sync offline progress:", error)
    }
  }

  static getStorageUsage(): { used: number; available: number } {
    if (typeof navigator === "undefined" || !("storage" in navigator)) {
      return { used: 0, available: 0 }
    }

    try {
      // Estimate storage usage
      let used = 0
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length
        }
      }

      // Convert to MB
      used = used / (1024 * 1024)

      // Estimate available storage (most browsers have ~5-10MB for localStorage)
      const available = 5 - used

      return { used, available }
    } catch (error) {
      console.error("Failed to get storage usage:", error)
      return { used: 0, available: 0 }
    }
  }
}

// Auto-sync when coming back online
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    OfflineManager.syncWhenOnline()
  })

  // Clear expired cache on app start
  OfflineManager.clearExpiredCache()
}
