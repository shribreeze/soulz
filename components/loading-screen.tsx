"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full mx-auto mb-6"
        />
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Finding Your Soulz...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400"
        >
          Checking your soul connection
        </motion.p>
      </div>
    </div>
  )
}