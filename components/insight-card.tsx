"use client"

import { motion } from "framer-motion"

interface InsightCardProps {
  insight: {
    title: string
    description: string
    value: string
    icon: string
    color: string
  }
  delay: number
}

export default function InsightCard({ insight, delay }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{insight.icon}</div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className={`text-2xl font-bold bg-gradient-to-r ${insight.color} bg-clip-text text-transparent`}
        >
          {insight.value}
        </motion.div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
      <p className="text-gray-400 text-sm">{insight.description}</p>

      {/* Progress bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: delay + 0.2 }}
        className={`mt-4 h-1 bg-gradient-to-r ${insight.color} rounded-full`}
      />
    </motion.div>
  )
}
