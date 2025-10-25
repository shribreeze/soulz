"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWallet } from "@/hooks/use-wallet"

import AIConversationVisual from "@/components/ai-conversation-visual"
import CompatibilityBar from "@/components/compatibility-bar"

export default function AIInteractionPage() {
  const [isConnecting, setIsConnecting] = useState(true)
  const [isConversing, setIsConversing] = useState(true)
  const [matchFound, setMatchFound] = useState(false)
  const [compatibility, setCompatibility] = useState({
    overall: 0,
    emotional: 0,
    values: 0,
    chemistry: 0,
  })

  const router = useRouter()
  const { isConnected } = useWallet()

  // --- Mock AI Interaction Process ---
  useEffect(() => {
    // Step 1: simulate connection/analysis delay
    const timer1 = setTimeout(() => {
      setCompatibility({
        overall: 94,
        emotional: 91,
        values: 88,
        chemistry: 96,
      })
      setIsConnecting(false)
    }, 3000)

    // Step 2: after some time, conversation ends & match found
    const timer2 = setTimeout(() => {
      setIsConversing(false)
      setMatchFound(true)
    }, 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />

      {/* Animated background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <Link href="/">
            <motion.h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              Soulz
            </motion.h1>
          </Link>
          <p className="text-gray-400 text-lg">Your AIs Are Connecting</p>
        </motion.div>

        {/* Main visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl mb-12"
        >
          <AIConversationVisual isActive={isConversing} />
        </motion.div>

        {/* Compatibility bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-2xl mb-12"
        >
          <CompatibilityBar compatibility={compatibility} matchFound={matchFound} />
        </motion.div>

        {/* Status text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-center mb-12"
        >
          {isConversing && (
            <p className="text-cyan-400 font-semibold">
              Analyzing emotional alignment and compatibility patterns...
            </p>
          )}
          {matchFound && (
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-green-400 font-bold text-lg"
            >
              Soul Match Found!
            </motion.p>
          )}
        </motion.div>

        {/* Action buttons */}
        {matchFound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/match-reveal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
              >
                Meet Your Match
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // restart AI conversation process
                setIsConnecting(true)
                setIsConversing(true)
                setMatchFound(false)
                setCompatibility({ overall: 0, emotional: 0, values: 0, chemistry: 0 })

                // rerun mock process
                setTimeout(() => {
                  setCompatibility({
                    overall: 94,
                    emotional: 91,
                    values: 88,
                    chemistry: 96,
                  })
                  setIsConnecting(false)
                }, 3000)

                setTimeout(() => {
                  setIsConversing(false)
                  setMatchFound(true)
                }, 5000)
              }}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 transition-all"
            >
              Let AIs Talk More
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  )
}
