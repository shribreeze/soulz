"use client"

import { motion } from "framer-motion"

interface NamecardPreviewProps {
  ensName: string
  isAvailable: boolean | null
}

export default function NamecardPreview({ ensName, isAvailable }: NamecardPreviewProps) {
  const displayName = ensName || "your_soul"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        animate={{
          boxShadow:
            isAvailable === true
              ? "0 0 40px rgba(74, 222, 128, 0.4)"
              : isAvailable === false
                ? "0 0 40px rgba(239, 68, 68, 0.4)"
                : "0 0 40px rgba(255, 153, 204, 0.3)",
        }}
        className="absolute inset-0 rounded-2xl"
      />

      {/* Card */}
      <motion.div
        animate={{
          borderColor:
            isAvailable === true
              ? "rgba(74, 222, 128, 0.5)"
              : isAvailable === false
                ? "rgba(239, 68, 68, 0.5)"
                : "rgba(255, 153, 204, 0.3)",
        }}
        className="relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 rounded-2xl p-8 backdrop-blur-sm"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-2xl shimmer opacity-50" />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Avatar placeholder */}
          <div className="flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-white">{displayName.charAt(0).toUpperCase()}</span>
            </motion.div>
          </div>

          {/* Name */}
          <div className="text-center">
            <motion.h3
              key={displayName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-white mb-1"
            >
              {displayName}
            </motion.h3>
            <p className="text-gray-400 text-sm">.soulz.eth</p>
          </div>

          {/* Status badge */}
          <motion.div
            animate={{
              scale: isAvailable !== null ? 1 : 0.8,
              opacity: isAvailable !== null ? 1 : 0,
            }}
            className="flex justify-center"
          >
            {isAvailable === true && (
              <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-semibold">Available</span>
              </div>
            )}
            {isAvailable === false && (
              <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full" />
                <span className="text-red-400 text-sm font-semibold">Taken</span>
              </div>
            )}
          </motion.div>

          {/* Verification badges */}
          <div className="flex justify-center gap-3 pt-4 border-t border-purple-500/30">
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 text-xs text-cyan-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              World ID
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 text-xs text-pink-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Emotion Synced
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
