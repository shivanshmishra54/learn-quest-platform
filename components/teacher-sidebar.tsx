"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Settings, LogOut, Users, BookOpen, BarChart3, X } from "lucide-react"
import { logout, type UserData } from "@/lib/auth"

interface TeacherSidebarProps {
  isOpen: boolean
  onClose: () => void
  userData: UserData
}

export function TeacherSidebar({ isOpen, onClose, userData }: TeacherSidebarProps) {
  const handleLogout = () => {
    logout()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-sm border-r border-green-200 z-50 transform transition-transform duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-green-800">LearnQuest</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 mb-8 p-4 bg-green-50 rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-green-600 text-white text-lg">
                {userData.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-green-800">{userData.username}</h3>
              <p className="text-sm text-green-600">Teacher</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-700 hover:bg-green-50 hover:text-green-800"
              onClick={() => (window.location.href = "/teacher/dashboard")}
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-700 hover:bg-green-50 hover:text-green-800"
              onClick={() => (window.location.href = "/teacher/students")}
            >
              <Users className="w-4 h-4" />
              Student Reports
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-700 hover:bg-green-50 hover:text-green-800"
              onClick={() => (window.location.href = "/teacher/questions")}
            >
              <BookOpen className="w-4 h-4" />
              Question Bank
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-700 hover:bg-green-50 hover:text-green-800"
              onClick={() => (window.location.href = "/teacher/profile")}
            >
              <User className="w-4 h-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-700 hover:bg-green-50 hover:text-green-800"
              onClick={() => (window.location.href = "/teacher/settings")}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </nav>

          {/* Logout */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
