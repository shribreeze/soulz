"use client"

import { motion } from "framer-motion"

interface ScanningOrbProps {
  isScanning: boolean
  isComplete: boolean
}

export default function ScanningOrb({ isScanning, isComplete }: ScanningOrbProps) {
  return (
    <div className="relative w-48 h-48">
      {/* Outer glow */}
      <motion.div
        animate={{
          scale: isScanning ? [1, 1.2, 1] : 1,
          opacity: isScanning ? [0.3, 0.6, 0.3] : 0.3,
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-2xl"
      />

      {/* Main orb */}
      <motion.div
        animate={{
          scale: isComplete ? 1.1 : 1,
          boxShadow: isComplete ? "0 0 40px rgba(74, 222, 128, 0.8)" : "0 0 30px rgba(255, 153, 204, 0.6)",
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full"
      />

      {/* Scanning lines */}
      {isScanning && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink-400 border-r-cyan-400"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-8 rounded-full border-2 border-transparent border-b-pink-400 border-l-cyan-400"
          />
        </>
      )}

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isComplete ? (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </motion.svg>
        ) : (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-12 h-12 bg-white rounded-full opacity-80"
          />
        )}
      </div>

      {/* Silhouette */}
      <motion.div
        animate={{
          opacity: isScanning ? [0.3, 0.7, 0.3] : 0.2,
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-gradient-to-t from-pink-400/40 to-transparent rounded-full blur-sm"
      />
    </div>
  )
}
