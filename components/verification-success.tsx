"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface VerificationSuccessProps {
  profile: any
}

export default function VerificationSuccess({ profile }: VerificationSuccessProps) {
  return (
    <div className="w-full max-w-md">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-8">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block mb-4"
        >
          <svg className="w-20 h-20 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-2">Soul Verified</h2>
        <p className="text-gray-400">Your emotional essence has been mapped</p>
      </motion.div>

      {/* Verification badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 mb-8"
      >
        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-green-400 font-semibold">World ID Verified</span>
        </div>

        <div className="flex items-center gap-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-cyan-400 font-semibold">Emotion Synced</span>
        </div>
      </motion.div>

      {/* Emotional profile summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30 mb-8"
      >
        <h3 className="text-white font-semibold mb-4">Your Emotional Profile</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300 text-sm">Empathy</span>
              <span className="text-pink-400 font-semibold">{profile?.empathy || 0}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500" style={{ width: `${profile?.empathy || 0}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300 text-sm">Adventure</span>
              <span className="text-cyan-400 font-semibold">{profile?.adventure || 0}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400" style={{ width: `${profile?.adventure || 0}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300 text-sm">Calmness</span>
              <span className="text-purple-400 font-semibold">{profile?.calmness || 0}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400" style={{ width: `${profile?.calmness || 0}%` }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next step button */}
      <Link href="/ens-naming">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
        >
          Claim Your Soulz Identity
        </motion.button>
      </Link>
    </div>
  )
}
