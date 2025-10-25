"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import ENSInput from "@/components/ens-input"
import NamecardPreview from "@/components/namecard-preview"

export default function ENSNamingPage() {
  const [ensName, setEnsName] = useState("")
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleNameChange = (name: string) => {
    setEnsName(name)
    if (name.length > 2) {
      setIsChecking(true)
      // Simulate availability check
      setTimeout(() => {
        setIsAvailable(Math.random() > 0.3)
        setIsChecking(false)
      }, 800)
    } else {
      setIsAvailable(null)
    }
  }

  return (
    <main className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />

      {/* Animated background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <Link href="/">
            <motion.h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              Soulz
            </motion.h1>
          </Link>
          <p className="text-gray-400 text-lg">Claim Your Soulz Identity</p>
        </motion.div>

        {/* Main content */}
        <div className="w-full max-w-2xl grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Input */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Identity</h2>
              <p className="text-gray-400">Your on-chain soul name. Connected on-chain, aligned off-chain.</p>
            </div>

            <ENSInput value={ensName} onChange={handleNameChange} isAvailable={isAvailable} isChecking={isChecking} />

            {/* Suggestions */}
            {!ensName && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                <p className="text-gray-400 text-sm mb-4">Suggested names:</p>
                <div className="space-y-2">
                  {["luna.soulz.eth", "cosmic.soulz.eth", "harmony.soulz.eth"].map((name) => (
                    <motion.button
                      key={name}
                      whileHover={{ scale: 1.02, x: 5 }}
                      onClick={() => handleNameChange(name.split(".")[0])}
                      className="w-full text-left p-3 rounded-lg border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10 transition-all text-gray-300 hover:text-white"
                    >
                      {name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right side - Preview */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <NamecardPreview ensName={ensName} isAvailable={isAvailable} />
          </motion.div>
        </div>

        {/* Next button */}
        {isAvailable && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12">
            <Link href="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
              >
                Continue to Profile Setup
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}
