"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface AIConversationVisualProps {
  isActive: boolean
}

export default function AIConversationVisual({ isActive }: AIConversationVisualProps) {
  const [messages, setMessages] = useState<Array<{ id: number; side: "left" | "right"; type: string }>>([])

  useEffect(() => {
    if (!isActive) return

    const messageTypes = ["wave", "pulse", "symbol", "connection"]
    let messageId = 0

    const interval = setInterval(() => {
      const newMessage = {
        id: messageId++,
        side: Math.random() > 0.5 ? "left" : "right",
        type: messageTypes[Math.floor(Math.random() * messageTypes.length)],
      }
      setMessages((prev) => [...prev.slice(-4), newMessage])
    }, 600)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Background glow */}
      <motion.div
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
          opacity: isActive ? [0.3, 0.6, 0.3] : 0.2,
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-400/20 rounded-2xl blur-3xl"
      />

      {/* Main container */}
      <div className="relative w-full h-full flex items-center justify-between px-8">
        {/* Left AI */}
        <motion.div
          animate={{
            scale: isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-4"
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <p className="text-gray-400 text-sm">Your AI</p>
        </motion.div>

        {/* Connection visualization */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 mx-8">
          {/* Light trails */}
          <svg className="w-full h-24" viewBox="0 0 400 100" preserveAspectRatio="none">
            {/* Left to right trail */}
            <motion.path
              d="M 0 50 Q 100 30 200 50 T 400 50"
              stroke="url(#trailGradient1)"
              strokeWidth="2"
              fill="none"
              animate={{
                strokeDashoffset: [0, -400],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              strokeDasharray="400"
            />

            {/* Right to left trail */}
            <motion.path
              d="M 400 50 Q 300 70 200 50 T 0 50"
              stroke="url(#trailGradient2)"
              strokeWidth="2"
              fill="none"
              animate={{
                strokeDashoffset: [0, 400],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              strokeDasharray="400"
            />

            <defs>
              <linearGradient id="trailGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 153, 204, 0)" />
                <stop offset="50%" stopColor="rgba(255, 153, 204, 0.8)" />
                <stop offset="100%" stopColor="rgba(94, 234, 212, 0)" />
              </linearGradient>
              <linearGradient id="trailGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(94, 234, 212, 0)" />
                <stop offset="50%" stopColor="rgba(94, 234, 212, 0.8)" />
                <stop offset="100%" stopColor="rgba(255, 153, 204, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating messages */}
          <div className="relative w-full h-12 flex items-center justify-center">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{
                  x: msg.side === "left" ? -150 : 150,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
                className={`absolute flex items-center gap-2 ${msg.side === "left" ? "left-0" : "right-0"}`}
              >
                {msg.type === "wave" && (
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, 16, 8] }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.1,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className={`w-1 rounded-full ${msg.side === "left" ? "bg-pink-400" : "bg-cyan-400"}`}
                      />
                    ))}
                  </div>
                )}
                {msg.type === "pulse" && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.8 }}
                    className={`w-3 h-3 rounded-full ${msg.side === "left" ? "bg-pink-400" : "bg-cyan-400"}`}
                  />
                )}
                {msg.type === "symbol" && (
                  <span className={`text-lg ${msg.side === "left" ? "text-pink-400" : "text-cyan-400"}`}>
                    {msg.side === "left" ? "💕" : "✨"}
                  </span>
                )}
                {msg.type === "connection" && (
                  <div className={`w-2 h-2 rounded-full ${msg.side === "left" ? "bg-pink-400" : "bg-cyan-400"}`} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right AI */}
        <motion.div
          animate={{
            scale: isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <span className="text-3xl">🌙</span>
          </div>
          <p className="text-gray-400 text-sm">Their AI</p>
        </motion.div>
      </div>
    </div>
  )
}
