"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import WorldIDVerification from "@/components/world-id-verification"
import EEGScan from "@/components/eeg-scan"
import VerificationSuccess from "@/components/verification-success"

type VerificationStep = "world-id" | "eeg" | "success"

export default function VerifyPage() {
  const [step, setStep] = useState<VerificationStep>("world-id")
  const [userData, setUserData] = useState({
    worldIdVerified: false,
    emotionalProfile: null as any,
  })

  const handleWorldIDSuccess = () => {
    setUserData((prev) => ({ ...prev, worldIdVerified: true }))
    setStep("eeg")
  }

  const handleEEGSuccess = (profile: any) => {
    setUserData((prev) => ({ ...prev, emotionalProfile: profile }))
    setStep("success")
  }

  return (
    <main className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-purple-900/20" />

      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <Link href="/">
            <motion.h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              Soulz
            </motion.h1>
          </Link>
          <p className="text-gray-400 text-lg">Verify Your Soul</p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div className="mb-12 flex gap-4 items-center">
          {["world-id", "eeg", "success"].map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <motion.div
                animate={{
                  scale: step === s ? 1.2 : 1,
                  backgroundColor:
                    step === s
                      ? "rgba(255, 153, 204, 0.8)"
                      : userData.worldIdVerified && i < 1
                        ? "rgba(94, 234, 212, 0.6)"
                        : userData.emotionalProfile && i < 2
                          ? "rgba(94, 234, 212, 0.6)"
                          : "rgba(100, 100, 120, 0.3)",
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white"
              >
                {i + 1}
              </motion.div>
              {i < 2 && <div className="w-8 h-1 bg-gray-600" />}
            </div>
          ))}
        </motion.div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === "world-id" && (
            <motion.div
              key="world-id"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <WorldIDVerification onSuccess={handleWorldIDSuccess} />
            </motion.div>
          )}

          {step === "eeg" && (
            <motion.div
              key="eeg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <EEGScan onSuccess={handleEEGSuccess} />
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <VerificationSuccess profile={userData.emotionalProfile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
