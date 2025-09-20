"use client"

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  requirement: string
  earned: boolean
  earnedDate?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  points: number
  icon: string
  category: "learning" | "streak" | "social" | "mastery"
  unlocked: boolean
  progress: number
  maxProgress: number
}

export interface UserProgress {
  level: number
  totalXP: number
  coins: number
  streak: number
  badges: Badge[]
  achievements: Achievement[]
  subjectProgress: {
    [subject: string]: {
      level: number
      xp: number
      gamesCompleted: number
      averageScore: number
      timeSpent: number
    }
  }
}

export const BADGES: Badge[] = [
  {
    id: "first_game",
    name: "First Steps",
    description: "Complete your first game",
    icon: "🎯",
    color: "text-green-600",
    requirement: "Complete 1 game",
    earned: false,
  },
  {
    id: "math_master",
    name: "Math Master",
    description: "Score 90% or higher in 5 math games",
    icon: "🧮",
    color: "text-blue-600",
    requirement: "5 math games with 90%+ score",
    earned: false,
  },
  {
    id: "science_explorer",
    name: "Science Explorer",
    description: "Complete 10 science experiments",
    icon: "🔬",
    color: "text-purple-600",
    requirement: "Complete 10 science games",
    earned: false,
  },
  {
    id: "tech_wizard",
    name: "Tech Wizard",
    description: "Master all technology challenges",
    icon: "💻",
    color: "text-indigo-600",
    requirement: "Complete all tech games",
    earned: false,
  },
  {
    id: "engineering_genius",
    name: "Engineering Genius",
    description: "Build 5 successful engineering projects",
    icon: "⚙️",
    color: "text-orange-600",
    requirement: "Complete 5 engineering simulations",
    earned: false,
  },
  {
    id: "week_warrior",
    name: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "⚡",
    color: "text-yellow-600",
    requirement: "7-day streak",
    earned: false,
  },
  {
    id: "month_champion",
    name: "Month Champion",
    description: "Learn every day for a month",
    icon: "🏆",
    color: "text-gold-600",
    requirement: "30-day streak",
    earned: false,
  },
  {
    id: "helping_hand",
    name: "Helping Hand",
    description: "Help 3 classmates with questions",
    icon: "🤝",
    color: "text-pink-600",
    requirement: "Help 3 students",
    earned: false,
  },
  {
    id: "perfect_score",
    name: "Perfect Score",
    description: "Get 100% on any game",
    icon: "⭐",
    color: "text-yellow-500",
    requirement: "Score 100% on a game",
    earned: false,
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    description: "Complete a timed challenge in record time",
    icon: "🚀",
    color: "text-red-600",
    requirement: "Top 10% completion time",
    earned: false,
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "games_completed_10",
    title: "Game Explorer",
    description: "Complete 10 games across all subjects",
    points: 100,
    icon: "🎮",
    category: "learning",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: "games_completed_50",
    title: "Game Master",
    description: "Complete 50 games across all subjects",
    points: 500,
    icon: "🏅",
    category: "learning",
    unlocked: false,
    progress: 0,
    maxProgress: 50,
  },
  {
    id: "streak_7",
    title: "Consistent Learner",
    description: "Maintain a 7-day learning streak",
    points: 200,
    icon: "📅",
    category: "streak",
    unlocked: false,
    progress: 0,
    maxProgress: 7,
  },
  {
    id: "streak_30",
    title: "Dedication Master",
    description: "Maintain a 30-day learning streak",
    points: 1000,
    icon: "🔥",
    category: "streak",
    unlocked: false,
    progress: 0,
    maxProgress: 30,
  },
  {
    id: "subject_master_math",
    title: "Mathematics Mastery",
    description: "Reach level 10 in Mathematics",
    points: 300,
    icon: "📊",
    category: "mastery",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: "subject_master_science",
    title: "Science Mastery",
    description: "Reach level 10 in Science",
    points: 300,
    icon: "🔬",
    category: "mastery",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: "leaderboard_top10",
    title: "Rising Star",
    description: "Reach top 10 in class leaderboard",
    points: 250,
    icon: "⭐",
    category: "social",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "leaderboard_top3",
    title: "Elite Performer",
    description: "Reach top 3 in class leaderboard",
    points: 500,
    icon: "🏆",
    category: "social",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
]

export function calculateLevel(xp: number): number {
  // Level formula: level = floor(sqrt(xp / 100))
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function getXPForNextLevel(currentLevel: number): number {
  // XP needed for next level: (level^2) * 100
  return currentLevel * currentLevel * 100
}

export function getXPProgress(currentXP: number, currentLevel: number): { current: number; needed: number } {
  const currentLevelXP = (currentLevel - 1) * (currentLevel - 1) * 100
  const nextLevelXP = currentLevel * currentLevel * 100
  return {
    current: currentXP - currentLevelXP,
    needed: nextLevelXP - currentLevelXP,
  }
}

export function awardPoints(
  gameType: string,
  score: number,
  difficulty: "easy" | "medium" | "hard",
  timeBonus = false,
): { xp: number; coins: number } {
  let baseXP = 0
  let baseCoins = 0

  // Base points by game type
  switch (gameType) {
    case "quiz":
      baseXP = 20
      baseCoins = 10
      break
    case "simulation":
      baseXP = 30
      baseCoins = 15
      break
    case "puzzle":
      baseXP = 25
      baseCoins = 12
      break
    case "memory":
      baseXP = 15
      baseCoins = 8
      break
    case "timed":
      baseXP = 35
      baseCoins = 18
      break
    default:
      baseXP = 20
      baseCoins = 10
  }

  // Difficulty multiplier
  const difficultyMultiplier = {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0,
  }

  // Score multiplier (0.5 to 1.5 based on score percentage)
  const scoreMultiplier = 0.5 + score / 100

  // Time bonus
  const timeBonusMultiplier = timeBonus ? 1.2 : 1.0

  const finalXP = Math.round(baseXP * difficultyMultiplier[difficulty] * scoreMultiplier * timeBonusMultiplier)
  const finalCoins = Math.round(baseCoins * difficultyMultiplier[difficulty] * scoreMultiplier * timeBonusMultiplier)

  return { xp: finalXP, coins: finalCoins }
}

export function checkBadgeEligibility(userProgress: UserProgress, gameResult: any): Badge[] {
  const newBadges: Badge[] = []

  // Check each badge requirement
  BADGES.forEach((badge) => {
    if (badge.earned) return

    let eligible = false

    switch (badge.id) {
      case "first_game":
        eligible = userProgress.subjectProgress
          ? Object.values(userProgress.subjectProgress).some((subject) => subject.gamesCompleted >= 1)
          : false
        break
      case "math_master":
        eligible = userProgress.subjectProgress?.mathematics?.gamesCompleted >= 5
        break
      case "science_explorer":
        eligible = userProgress.subjectProgress?.science?.gamesCompleted >= 10
        break
      case "week_warrior":
        eligible = userProgress.streak >= 7
        break
      case "month_champion":
        eligible = userProgress.streak >= 30
        break
      case "perfect_score":
        eligible = gameResult?.score === 100
        break
      // Add more badge checks as needed
    }

    if (eligible) {
      newBadges.push({ ...badge, earned: true, earnedDate: new Date().toISOString() })
    }
  })

  return newBadges
}

export function updateAchievementProgress(userProgress: UserProgress): Achievement[] {
  return ACHIEVEMENTS.map((achievement) => {
    let progress = achievement.progress

    switch (achievement.id) {
      case "games_completed_10":
      case "games_completed_50":
        progress = userProgress.subjectProgress
          ? Object.values(userProgress.subjectProgress).reduce((total, subject) => total + subject.gamesCompleted, 0)
          : 0
        break
      case "streak_7":
      case "streak_30":
        progress = userProgress.streak
        break
      case "subject_master_math":
        progress = userProgress.subjectProgress?.mathematics?.level || 0
        break
      case "subject_master_science":
        progress = userProgress.subjectProgress?.science?.level || 0
        break
      // Add more achievement progress calculations
    }

    const unlocked = progress >= achievement.maxProgress

    return {
      ...achievement,
      progress: Math.min(progress, achievement.maxProgress),
      unlocked,
    }
  })
}
