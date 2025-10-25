"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ScanningOrb from "./scanning-orb"

interface WorldIDVerificationProps {
  onSuccess: () => void
}

export default function WorldIDVerification({ onSuccess }: WorldIDVerificationProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleStartScan = () => {
    setIsScanning(true)
    // Simulate scan duration
    setTimeout(() => {
      setIsComplete(true)
      setTimeout(() => {
        onSuccess()
      }, 1500)
    }, 3000)
  }

  return (
    <div className="w-full max-w-md">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">World ID Verification</h2>
        <p className="text-gray-400">Prove your humanity with Worldcoin</p>
      </motion.div>

      {/* Scanning orb */}
      <div className="flex justify-center mb-12">
        <ScanningOrb isScanning={isScanning} isComplete={isComplete} />
      </div>

      {/* Status text */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="text-center mb-8"
      >
        {!isScanning && !isComplete && <p className="text-gray-300">Ready to verify your unique humanity</p>}
        {isScanning && !isComplete && <p className="text-cyan-400 font-semibold">Scanning your soul signature...</p>}
        {isComplete && (
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-green-400 font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Soul Verified
          </motion.p>
        )}
      </motion.div>

      {/* Action button */}
      {!isScanning && !isComplete && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartScan}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
        >
          Start Verification
        </motion.button>
      )}

      {isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-gray-400">
          <p>Proceeding to emotional scan...</p>
        </motion.div>
      )}
    </div>
  )
}
