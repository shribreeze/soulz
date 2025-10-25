"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import BrainHologram from "./brain-hologram"

interface EEGScanProps {
  onSuccess: (profile: any) => void
}

export default function EEGScan({ onSuccess }: EEGScanProps) {
  const [scanProgress, setScanProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [emotionalProfile, setEmotionalProfile] = useState({
    empathy: 0,
    adventure: 0,
    calmness: 0,
  })

  useEffect(() => {
    if (isComplete) return

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          // Generate emotional profile
          const profile = {
            empathy: Math.floor(Math.random() * 30) + 70,
            adventure: Math.floor(Math.random() * 40) + 50,
            calmness: Math.floor(Math.random() * 30) + 60,
          }
          setEmotionalProfile(profile)
          setTimeout(() => {
            onSuccess(profile)
          }, 1500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)

    return () => clearInterval(interval)
  }, [isComplete, onSuccess])

  return (
    <div className="w-full max-w-md">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Emotional Scan</h2>
        <p className="text-gray-400">Processing your emotional frequencies locally...</p>
      </motion.div>

      {/* Brain hologram */}
      <div className="flex justify-center mb-12">
        <BrainHologram isScanning={!isComplete} />
      </div>

      {/* Progress bar */}
      <motion.div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Scan Progress</span>
          <span className="text-cyan-400 font-semibold">{Math.floor(scanProgress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${scanProgress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-pink-500 to-cyan-400"
          />
        </div>
      </motion.div>

      {/* Emotional profile display */}
      {isComplete && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-8">
          <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Empathy</span>
              <span className="text-pink-400 font-semibold">{emotionalProfile.empathy}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${emotionalProfile.empathy}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-pink-500"
              />
            </div>
          </div>

          <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Adventure</span>
              <span className="text-cyan-400 font-semibold">{emotionalProfile.adventure}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${emotionalProfile.adventure}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-cyan-400"
              />
            </div>
          </div>

          <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Calmness</span>
              <span className="text-purple-400 font-semibold">{emotionalProfile.calmness}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${emotionalProfile.calmness}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-purple-400"
              />
            </div>
          </div>
        </motion.div>
      )}

      {!isComplete && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-center text-gray-400 text-sm"
        >
          <p>Analyzing emotional frequencies...</p>
        </motion.div>
      )}
    </div>
  )
}
