"use client"

import { motion } from "framer-motion"

interface MatchCardProps {
  match: {
    name: string
    ensName: string
    avatar: string
    traits: string[]
    vibes: string[]
    compatibility: number
    emotionalAlignment: number
    valuesMatch: number
    chemistryScore: number
  }
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
      {/* Glow effect */}
      <motion.div
        animate={{
          boxShadow: "0 0 60px rgba(255, 153, 204, 0.4)",
        }}
        className="absolute inset-0 rounded-3xl"
      />

      {/* Card */}
      <div className="relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-pink-500/50 rounded-3xl p-8 backdrop-blur-sm">
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-3xl shimmer opacity-50" />

        {/* Content */}
        <div className="relative z-10 space-y-8">
          {/* Header with avatar */}
          <div className="flex items-center gap-6">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-5xl flex-shrink-0"
            >
              {match.avatar}
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{match.name}</h2>
              <p className="text-gray-400 mb-3">{match.ensName}</p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full"
              >
                <span className="text-green-400 font-semibold">Soul Match</span>
              </motion.div>
            </div>
          </div>

          {/* Compatibility scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Overall", value: match.compatibility, color: "from-pink-500 to-purple-600" },
              { label: "Emotional", value: match.emotionalAlignment, color: "from-pink-400 to-red-500" },
              { label: "Values", value: match.valuesMatch, color: "from-cyan-400 to-blue-500" },
              { label: "Chemistry", value: match.chemistryScore, color: "from-purple-400 to-pink-500" },
            ].map((score) => (
              <motion.div
                key={score.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 text-center"
              >
                <p className="text-gray-400 text-xs mb-2">{score.label}</p>
                <motion.p
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className={`text-2xl font-bold bg-gradient-to-r ${score.color} bg-clip-text text-transparent`}
                >
                  {score.value}%
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Traits and vibes */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">Traits</h3>
              <div className="flex flex-wrap gap-2">
                {match.traits.map((trait) => (
                  <motion.span
                    key={trait}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-pink-500/20 border border-pink-500/50 rounded-full text-pink-400 text-sm"
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Vibes</h3>
              <div className="flex flex-wrap gap-2">
                {match.vibes.map((vibe) => (
                  <motion.span
                    key={vibe}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm"
                  >
                    {vibe}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Verification badges */}
          <div className="flex gap-4 pt-6 border-t border-purple-500/30">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-cyan-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold">World ID Verified</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-pink-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold">Emotion Synced</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
