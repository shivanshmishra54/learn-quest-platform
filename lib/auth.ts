"use client"

export interface UserData {
  role: "student" | "teacher"
  language: string
  username: string
  grade?: string
  difficulty?: string
}

export function getUserData(): UserData | null {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("learnquest_user")
  return userData ? JSON.parse(userData) : null
}

export function setUserData(data: UserData): void {
  if (typeof window === "undefined") return

  localStorage.setItem("learnquest_user", JSON.stringify(data))
}

export function logout(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("learnquest_user")
  window.location.href = "/"
}

export function requireAuth(requiredRole?: "student" | "teacher"): UserData | null {
  const userData = getUserData()

  if (!userData) {
    window.location.href = "/"
    return null
  }

  if (requiredRole && userData.role !== requiredRole) {
    window.location.href = "/"
    return null
  }

  return userData
}
