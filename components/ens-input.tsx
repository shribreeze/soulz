"use client"

import { motion } from "framer-motion"

interface ENSInputProps {
  value: string
  onChange: (value: string) => void
  isAvailable: boolean | null
  isChecking: boolean
}

export default function ENSInput({ value, onChange, isAvailable, isChecking }: ENSInputProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <motion.div
          animate={{
            boxShadow:
              isAvailable === true
                ? "0 0 20px rgba(74, 222, 128, 0.3)"
                : isAvailable === false
                  ? "0 0 20px rgba(239, 68, 68, 0.3)"
                  : "0 0 20px rgba(255, 153, 204, 0.2)",
          }}
          className="relative"
        >
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your soul name"
            className="w-full px-6 py-4 bg-purple-900/30 border-2 border-purple-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
          <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400">.soulz.eth</span>
        </motion.div>

        {/* Status indicator */}
        {isChecking && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute right-20 top-1/2 transform -translate-y-1/2"
          >
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </motion.div>
        )}

        {isAvailable === true && !isChecking && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-20 top-1/2 transform -translate-y-1/2"
          >
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        )}

        {isAvailable === false && !isChecking && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-20 top-1/2 transform -translate-y-1/2"
          >
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Status message */}
      <motion.div animate={{ opacity: isAvailable !== null ? 1 : 0 }} transition={{ duration: 0.3 }} className="h-6">
        {isAvailable === true && <p className="text-green-400 text-sm font-semibold">Name available! Claim it now.</p>}
        {isAvailable === false && <p className="text-red-400 text-sm font-semibold">Name taken. Try another.</p>}
      </motion.div>
    </div>
  )
}
