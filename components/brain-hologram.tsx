"use client"

import { motion } from "framer-motion"

interface BrainHologramProps {
  isScanning: boolean
}

export default function BrainHologram({ isScanning }: BrainHologramProps) {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer glow */}
      <motion.div
        animate={{
          scale: isScanning ? [1, 1.15, 1] : 1,
          opacity: isScanning ? [0.4, 0.7, 0.4] : 0.3,
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
      />

      {/* Brain container */}
      <svg viewBox="0 0 200 200" className="w-40 h-40 relative z-10" fill="none" stroke="currentColor">
        {/* Left hemisphere */}
        <motion.path
          d="M 100 50 Q 70 60 60 90 Q 55 110 65 130 Q 85 145 100 140"
          stroke="url(#brainGradient1)"
          strokeWidth="3"
          animate={{
            opacity: isScanning ? [0.5, 1, 0.5] : 0.7,
            strokeWidth: isScanning ? [3, 4, 3] : 3,
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Right hemisphere */}
        <motion.path
          d="M 100 50 Q 130 60 140 90 Q 145 110 135 130 Q 115 145 100 140"
          stroke="url(#brainGradient2)"
          strokeWidth="3"
          animate={{
            opacity: isScanning ? [0.5, 1, 0.5] : 0.7,
            strokeWidth: isScanning ? [3, 4, 3] : 3,
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
        />

        {/* Neural connections */}
        {isScanning && (
          <>
            <motion.circle
              cx="80"
              cy="80"
              r="3"
              fill="currentColor"
              className="text-cyan-400"
              animate={{
                opacity: [0, 1, 0],
                r: [2, 5, 2],
              }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.circle
              cx="120"
              cy="85"
              r="3"
              fill="currentColor"
              className="text-pink-400"
              animate={{
                opacity: [0, 1, 0],
                r: [2, 5, 2],
              }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
            />
            <motion.circle
              cx="100"
              cy="110"
              r="3"
              fill="currentColor"
              className="text-purple-400"
              animate={{
                opacity: [0, 1, 0],
                r: [2, 5, 2],
              }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
            />
          </>
        )}

        <defs>
          <linearGradient id="brainGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(94, 234, 212)" />
            <stop offset="100%" stopColor="rgb(168, 85, 247)" />
          </linearGradient>
          <linearGradient id="brainGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(255, 153, 204)" />
            <stop offset="100%" stopColor="rgb(168, 85, 247)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Electric waves */}
      {isScanning && (
        <>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="absolute inset-8 border-2 border-cyan-400/50 rounded-full"
          />
          <motion.div
            animate={{ scale: [1.2, 1.5, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
            className="absolute inset-4 border-2 border-pink-400/30 rounded-full"
          />
        </>
      )}
    </div>
  )
}
