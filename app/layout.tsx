import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { OfflineIndicator } from "@/components/offline-indicator"
import { InstallPrompt } from "@/components/install-prompt"
import "./globals.css"

export const metadata: Metadata = {
  title: "LearnQuest - Play. Learn. Grow.",
  description: "Gamified STEM learning platform for rural school students",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#15803d",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LearnQuest",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <OfflineIndicator />
        <InstallPrompt />
        <Analytics />
      </body>
    </html>
  )
}
