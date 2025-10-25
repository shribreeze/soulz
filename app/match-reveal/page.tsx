"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWallet } from "@/hooks/use-wallet"
import MatchCard from "@/components/match-card"
import Confetti from "@/components/confetti"

export default function MatchRevealPage() {
  const [showConfetti, setShowConfetti] = useState(true)
  const [activeTab, setActiveTab] = useState<"match" | "chat">("match")
  const router = useRouter()
  const { isConnected } = useWallet()

  // 🔒 Wallet connection check
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Connecting wallet...</p>
        </div>
      </div>
    )
  }

  const handleStartChatting = () => {
    setActiveTab("chat")
    // Optional redirect if you want to go to chat tab in URL
    // router.push("/?tab=chats")
  }

  const matchData = {
    name: "Luna",
    ensName: "luna.soulz.eth",
    avatar: "🌙",
    traits: ["Empathetic", "Creative", "Adventurous"],
    vibes: ["Ethereal", "Romantic", "Mysterious"],
    compatibility: 94,
    emotionalAlignment: 91,
    valuesMatch: 88,
    chemistryScore: 96,
  }

  return (
    <main className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* 🎉 Confetti animation */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />

      {/* Animated blurred circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <Link href="/">
            <motion.h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              Soulz
            </motion.h1>
          </Link>
          <p className="text-gray-400 text-lg">Your Soulz AI Found Your Match</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <div className="flex gap-4 mb-8 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab("match")}
              animate={{
                borderColor:
                  activeTab === "match" ? "rgba(255, 153, 204, 0.8)" : "rgba(255, 153, 204, 0.2)",
                backgroundColor:
                  activeTab === "match" ? "rgba(255, 153, 204, 0.1)" : "transparent",
              }}
              className="px-6 py-3 border-2 rounded-full font-semibold text-white transition-all"
            >
              Meet Your Match
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleStartChatting}
              animate={{
                borderColor:
                  activeTab === "chat" ? "rgba(94, 234, 212, 0.8)" : "rgba(94, 234, 212, 0.2)",
                backgroundColor:
                  activeTab === "chat" ? "rgba(94, 234, 212, 0.1)" : "transparent",
              }}
              className="px-6 py-3 border-2 rounded-full font-semibold text-white transition-all"
            >
              Start Chatting
            </motion.button>
          </div>

          {/* Match tab */}
          {activeTab === "match" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MatchCard match={matchData} />
            </motion.div>
          )}

          {/* Chat tab */}
          {activeTab === "chat" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-purple-900/30 border border-purple-500/30 rounded-2xl overflow-hidden"
            >
              {/* Chat header */}
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-b border-purple-500/30 p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-xl">
                  🌙
                </div>
                <div>
                  <h3 className="text-white font-semibold">{matchData.name}</h3>
                  <p className="text-gray-400 text-sm">{matchData.ensName}</p>
                </div>
              </div>

              {/* Chat body */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 max-w-xs"
                >
                  <p className="text-cyan-400 text-sm">
                    <span className="font-semibold">AI Insight:</span> Your AIs found mutual empathy
                    alignment. You both value deep emotional connections.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="bg-pink-500/20 border border-pink-500/30 rounded-lg p-4 max-w-xs">
                    <p className="text-pink-400 text-sm">Hey! Your AI seems really thoughtful</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 max-w-xs"
                >
                  <p className="text-cyan-400 text-sm">
                    Thanks! I love how creative yours is. Want to grab coffee sometime?
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-end"
                >
                  <div className="bg-pink-500/20 border border-pink-500/30 rounded-lg p-4 max-w-xs">
                    <p className="text-pink-400 text-sm">I'd love that</p>
                  </div>
                </motion.div>
              </div>

              {/* Chat input */}
              <div className="border-t border-purple-500/30 p-4 flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-purple-900/30 border border-purple-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Send
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link href="/premium-insights">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              View Premium Insights
            </motion.button>
          </Link>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 transition-all"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
