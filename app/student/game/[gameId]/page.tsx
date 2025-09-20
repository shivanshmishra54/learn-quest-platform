"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Coins, Heart, Volume2 } from "lucide-react"
import { Mascot } from "@/components/mascot"
import { requireAuth, type UserData } from "@/lib/auth"
import Link from "next/link"

interface GamePageProps {
  params: {
    gameId: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  useEffect(() => {
    const user = requireAuth("student")
    if (user) {
      setUserData(user)
    }
  }, [])

  // Mock questions based on difficulty
  const questions = [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      correct: 0,
      explanation: "Water is composed of two hydrogen atoms and one oxygen atom, hence H2O.",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
      explanation: "Mars appears red due to iron oxide (rust) on its surface.",
    },
    {
      question: "What is the speed of light in vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      correct: 0,
      explanation: "Light travels at approximately 300,000 kilometers per second in vacuum.",
    },
  ]

  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameEnded) {
      handleTimeUp()
    }
  }, [timeLeft, gameStarted, gameEnded])

  const handleTimeUp = () => {
    setLives(lives - 1)
    if (lives <= 1) {
      setGameEnded(true)
    } else {
      nextQuestion()
    }
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === questions[currentQuestion].correct

    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 100)
        nextQuestion()
      } else {
        setLives(lives - 1)
        if (lives <= 1) {
          setGameEnded(true)
        } else {
          nextQuestion()
        }
      }
    }, 1500)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(30)
    } else {
      setGameEnded(true)
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(30)
  }

  const playAgain = () => {
    setCurrentQuestion(0)
    setScore(0)
    setLives(3)
    setTimeLeft(30)
    setGameStarted(false)
    setGameEnded(false)
    setSelectedAnswer(null)
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="text-center">
          <Mascot mood="thinking" size="lg" />
          <p className="mt-4 text-gray-600">Loading game...</p>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-green-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Mascot message="Ready to play?" mood="excited" size="lg" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Science Quiz</CardTitle>
            <p className="text-green-600">Test your knowledge!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-700">3</div>
                <div className="text-sm text-green-600">Questions</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">300</div>
                <div className="text-sm text-yellow-600">Max Coins</div>
              </div>
            </div>
            <Button
              onClick={startGame}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            >
              Start Game
            </Button>
            <Link href="/student/dashboard">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameEnded) {
    const coinsEarned = Math.floor(score / 10)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-green-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Mascot message="Great job!" mood="celebrating" size="lg" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Game Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-green-700">{score}</div>
              <div className="text-gray-600">Final Score</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
                  <Coins className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold text-yellow-700">{coinsEarned}</div>
                <div className="text-sm text-yellow-600">Coins Earned</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-green-700">
                  {currentQuestion + 1}/{questions.length}
                </div>
                <div className="text-sm text-green-600">Questions</div>
              </div>
            </div>
            <div className="space-y-2">
              <Button onClick={playAgain} className="w-full bg-green-600 hover:bg-green-700 text-white">
                Play Again
              </Button>
              <Link href="/student/dashboard">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      {/* Header */}
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link href="/student/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Game
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-100 px-3 py-1 rounded-full">
              <Heart className="w-4 h-4 text-red-600" />
              <span className="font-semibold text-red-800">{lives}</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <Coins className="w-4 h-4 text-yellow-600" />
              <span className="font-semibold text-yellow-800">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-800">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Badge className="bg-green-100 text-green-800">Science</Badge>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-full" />
        </div>

        {/* Question Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-green-200 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-green-800">{currentQ.question}</CardTitle>
              <Button variant="ghost" size="sm">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`p-4 h-auto text-left justify-start ${
                    selectedAnswer === index
                      ? index === currentQ.correct
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-red-100 border-red-500 text-red-800"
                      : "hover:bg-green-50"
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Explanation:</strong> {currentQ.explanation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
