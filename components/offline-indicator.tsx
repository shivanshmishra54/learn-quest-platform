"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOff, Wifi, Upload, HardDrive } from "lucide-react"
import { OfflineManager } from "@/lib/offline"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [unsyncedCount, setUnsyncedCount] = useState(0)
  const [storageUsage, setStorageUsage] = useState({ used: 0, available: 0 })

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    const updateUnsyncedCount = () => {
      setUnsyncedCount(OfflineManager.getUnsyncedProgress().length)
    }

    const updateStorageUsage = () => {
      setStorageUsage(OfflineManager.getStorageUsage())
    }

    // Initial checks
    updateOnlineStatus()
    updateUnsyncedCount()
    updateStorageUsage()

    // Event listeners
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    // Periodic updates
    const interval = setInterval(() => {
      updateUnsyncedCount()
      updateStorageUsage()
    }, 5000)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
      clearInterval(interval)
    }
  }, [])

  const handleSync = async () => {
    await OfflineManager.syncWhenOnline()
    setUnsyncedCount(OfflineManager.getUnsyncedProgress().length)
  }

  if (isOnline && unsyncedCount === 0) return null

  return (
    <Card className="fixed bottom-4 right-4 z-50 bg-white/95 backdrop-blur-sm border-green-200 shadow-lg max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {isOnline ? <Wifi className="w-5 h-5 text-green-600" /> : <WifiOff className="w-5 h-5 text-orange-600" />}
          <div className="flex-1">
            <div className="font-semibold text-sm">
              {isOnline ? "Online" : "Offline Mode"}
              {unsyncedCount > 0 && (
                <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  {unsyncedCount} unsynced
                </span>
              )}
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-2 mt-1">
              <HardDrive className="w-3 h-3" />
              Storage: {storageUsage.used.toFixed(1)}MB used
            </div>
          </div>
          {isOnline && unsyncedCount > 0 && (
            <Button size="sm" onClick={handleSync} className="bg-green-600 hover:bg-green-700">
              <Upload className="w-3 h-3 mr-1" />
              Sync
            </Button>
          )}
        </div>

        {!isOnline && (
          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="text-sm text-orange-800">
              <strong>Offline Mode Active</strong>
            </div>
            <div className="text-xs text-orange-700 mt-1">
              You can still play cached games. Progress will sync when you're back online.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
