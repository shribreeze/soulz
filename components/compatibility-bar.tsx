"use client"

import { motion } from "framer-motion"

interface CompatibilityBarProps {
  compatibility: number
  matchFound: boolean
}

export default function CompatibilityBar({ compatibility, matchFound }: CompatibilityBarProps) {
  const getColor = (value: number) => {
    if (value < 30) return "from-red-500 to-orange-500"
    if (value < 60) return "from-yellow-500 to-orange-500"
    if (value < 85) return "from-cyan-400 to-blue-500"
    return "from-green-400 to-emerald-500"
  }

  return (
    <div className="w-full">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Compatibility</h3>
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
        >
          {Math.floor(compatibility)}%
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden border border-purple-500/30">
        <motion.div
          animate={{
            width: `${compatibility}%`,
            boxShadow: matchFound ? "0 0 20px rgba(74, 222, 128, 0.8)" : "0 0 20px rgba(255, 153, 204, 0.6)",
          }}
          transition={{ duration: 0.3 }}
          className={`h-full bg-gradient-to-r ${getColor(compatibility)} transition-all`}
        />
      </div>

      {/* Status indicators */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 grid grid-cols-3 gap-4"
      >
        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 text-center">
          <p className="text-gray-400 text-xs mb-1">Emotional</p>
          <p className="text-pink-400 font-semibold">{Math.floor(compatibility * 0.95)}%</p>
        </div>
        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 text-center">
          <p className="text-gray-400 text-xs mb-1">Values</p>
          <p className="text-cyan-400 font-semibold">{Math.floor(compatibility * 0.92)}%</p>
        </div>
        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 text-center">
          <p className="text-gray-400 text-xs mb-1">Chemistry</p>
          <p className="text-purple-400 font-semibold">{Math.floor(compatibility * 0.88)}%</p>
        </div>
      </motion.div>
    </div>
  )
}
