"use client"

import { motion } from "framer-motion"

interface FloatingAIProps {
  position: string
  delay: number
}

export default function FloatingAI({ position, delay }: FloatingAIProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration: 1, delay }}
      className={`absolute ${position} w-24 h-24`}
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          delay,
        }}
        className="w-full h-full"
      >
        {/* AI Avatar Circle */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-30 blur-xl" />
          <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full opacity-20" />
          <div className="absolute inset-4 border-2 border-pink-400/50 rounded-full" />

          {/* Inner glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute inset-6 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full opacity-40 blur-md"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
