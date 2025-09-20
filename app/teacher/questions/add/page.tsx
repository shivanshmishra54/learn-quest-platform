"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Save, Eye } from "lucide-react"
import { Mascot } from "@/components/mascot"
import { requireAuth, type UserData } from "@/lib/auth"
import Link from "next/link"

export default function AddQuestion() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [formData, setFormData] = useState({
    subject: "",
    game: "",
    difficulty: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
    mediaType: "",
    mediaUrl: "",
  })

  useEffect(() => {
    const user = requireAuth("teacher")
    if (user) {
      setUserData(user)
    }
  }, [])

  const subjects = [
    { id: "science", name: "Science", icon: "🔬" },
    { id: "technology", name: "Technology", icon: "💻" },
    { id: "engineering", name: "Engineering", icon: "⚙️" },
    { id: "mathematics", name: "Mathematics", icon: "📊" },
  ]

  const gameTypes = [
    { id: "quiz", name: "KBC-Style Quiz" },
    { id: "memory", name: "Memory Match" },
    { id: "puzzle", name: "Puzzle Challenge" },
    { id: "timed", name: "Timed Challenge" },
    { id: "simulation", name: "Virtual Lab" },
  ]

  const difficulties = [
    { id: "easy", name: "Easy", color: "bg-green-100 text-green-800" },
    { id: "medium", name: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { id: "hard", name: "Hard", color: "bg-red-100 text-red-800" },
  ]

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log("Saving question:", formData)
    alert("Question saved successfully!")
    window.location.href = "/teacher/dashboard"
  }

  const handlePreview = () => {
    // Show preview modal or navigate to preview page
    console.log("Preview question:", formData)
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="text-center">
          <Mascot mood="thinking" size="lg" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/teacher/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Mascot mood="thinking" size="sm" />
              <div>
                <h1 className="text-2xl font-bold text-green-800">Add New Question</h1>
                <p className="text-sm text-green-600">Create engaging content for your students</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Question
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            <div className="flex items-center gap-2">
                              <span>{subject.icon}</span>
                              {subject.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Game Type</Label>
                    <Select value={formData.game} onValueChange={(value) => setFormData({ ...formData, game: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select game type" />
                      </SelectTrigger>
                      <SelectContent>
                        {gameTypes.map((game) => (
                          <SelectItem key={game.id} value={game.id}>
                            {game.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <RadioGroup
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                    className="flex gap-4"
                  >
                    {difficulties.map((diff) => (
                      <div key={diff.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={diff.id} id={diff.id} />
                        <Label htmlFor={diff.id}>
                          <Badge className={diff.color}>{diff.name}</Badge>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Question Content */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Question Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Question Text</Label>
                  <Textarea
                    placeholder="Enter your question here..."
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Answer Options</Label>
                  <div className="space-y-3">
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-semibold text-green-700">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <Input
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Correct Answer</Label>
                  <RadioGroup
                    value={formData.correctAnswer}
                    onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                    className="flex gap-4"
                  >
                    {["A", "B", "C", "D"].map((letter, index) => (
                      <div key={letter} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`correct-${letter}`} />
                        <Label htmlFor={`correct-${letter}`} className="font-semibold">
                          {letter}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Explanation (Optional)</Label>
                  <Textarea
                    placeholder="Provide an explanation for the correct answer..."
                    value={formData.explanation}
                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Media (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Media Type</Label>
                  <Select
                    value={formData.mediaType}
                    onValueChange={(value) => setFormData({ ...formData, mediaType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.mediaType && (
                  <div className="space-y-2">
                    <Label>Upload {formData.mediaType}</Label>
                    <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop your {formData.mediaType} file here
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Choose File
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Question Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.question ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3">{formData.question}</h3>
                      <div className="space-y-2">
                        {formData.options.map((option, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded border ${
                              formData.correctAnswer === index.toString()
                                ? "bg-green-100 border-green-300"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                            {option || `Option ${String.fromCharCode(65 + index)}`}
                          </div>
                        ))}
                      </div>
                      {formData.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {formData.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>Start typing your question to see the preview</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Question Stats */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Question Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subject:</span>
                  <span className="text-sm font-medium">{formData.subject || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Game Type:</span>
                  <span className="text-sm font-medium">{formData.game || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Difficulty:</span>
                  <span className="text-sm font-medium">{formData.difficulty || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Media:</span>
                  <span className="text-sm font-medium">{formData.mediaType || "None"}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
