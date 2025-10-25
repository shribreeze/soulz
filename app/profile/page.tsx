"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import AvatarSelector from "@/components/avatar-selector"
import TraitsInput from "@/components/traits-input"
import PersonalityHologram from "@/components/personality-hologram"

export default function ProfilePage() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [traits, setTraits] = useState<string[]>([])
  const [vibes, setVibes] = useState<string[]>([])
  const [step, setStep] = useState<"avatar" | "traits" | "review">("avatar")

  const handleAddTrait = (trait: string) => {
    if (trait && !traits.includes(trait)) {
      setTraits([...traits, trait])
    }
  }

  const handleRemoveTrait = (trait: string) => {
    setTraits(traits.filter((t) => t !== trait))
  }

  const handleAddVibe = (vibe: string) => {
    if (vibe && !vibes.includes(vibe)) {
      setVibes([...vibes, vibe])
    }
  }

  const handleRemoveVibe = (vibe: string) => {
    setVibes(vibes.filter((v) => v !== vibe))
  }

  const isComplete = selectedAvatar && traits.length > 0 && vibes.length > 0

  return (
    <main className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />

      {/* Animated background elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <Link href="/">
            <motion.h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              Soulz
            </motion.h1>
          </Link>
          <p className="text-gray-400 text-lg">Create Your AI Companion</p>
        </motion.div>

        {/* Progress steps */}
        <motion.div className="mb-12 flex gap-4 items-center">
          {["avatar", "traits", "review"].map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <motion.div
                animate={{
                  scale: step === s ? 1.2 : 1,
                  backgroundColor:
                    step === s
                      ? "rgba(255, 153, 204, 0.8)"
                      : (step === "traits" && i === 0) || (step === "review" && i < 2)
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

        {/* Main content */}
        <AnimatePresence mode="wait">
          {step === "avatar" && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Choose Your AI Avatar</h2>
                <p className="text-gray-400">Select the visual representation of your AI companion</p>
              </div>
              <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep("traits")}
                disabled={!selectedAvatar}
                className="w-full mt-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Traits
              </motion.button>
            </motion.div>
          )}

          {step === "traits" && (
            <motion.div
              key="traits"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Define Your Personality</h2>
                <p className="text-gray-400">Add traits and vibes that define your AI companion</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <TraitsInput
                  title="Traits"
                  placeholder="e.g., Witty, Empathetic, Creative"
                  items={traits}
                  onAdd={handleAddTrait}
                  onRemove={handleRemoveTrait}
                  suggestions={["Witty", "Empathetic", "Creative", "Adventurous", "Thoughtful", "Playful"]}
                />
                <TraitsInput
                  title="Favorite Vibes"
                  placeholder="e.g., Cosmic, Romantic, Mysterious"
                  items={vibes}
                  onAdd={handleAddVibe}
                  onRemove={handleRemoveVibe}
                  suggestions={["Cosmic", "Romantic", "Mysterious", "Ethereal", "Futuristic", "Dreamy"]}
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep("avatar")}
                  className="flex-1 py-4 border-2 border-purple-500/50 text-purple-400 font-semibold rounded-full hover:bg-purple-500/10 transition-all"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep("review")}
                  disabled={traits.length === 0 || vibes.length === 0}
                  className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review Profile
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Your AI Companion</h2>
                <p className="text-gray-400">Review your AI personality hologram</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                {/* Hologram */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  <PersonalityHologram avatar={selectedAvatar} traits={traits} vibes={vibes} />
                </motion.div>

                {/* Profile summary */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  {/* Avatar display */}
                  <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30">
                    <p className="text-gray-400 text-sm mb-2">AI Avatar</p>
                    <p className="text-white font-semibold capitalize">{selectedAvatar}</p>
                  </div>

                  {/* Traits */}
                  <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30">
                    <p className="text-gray-400 text-sm mb-3">Traits</p>
                    <div className="flex flex-wrap gap-2">
                      {traits.map((trait) => (
                        <span
                          key={trait}
                          className="px-3 py-1 bg-pink-500/20 border border-pink-500/50 rounded-full text-pink-400 text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Vibes */}
                  <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30">
                    <p className="text-gray-400 text-sm mb-3">Vibes</p>
                    <div className="flex flex-wrap gap-2">
                      {vibes.map((vibe) => (
                        <span
                          key={vibe}
                          className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm"
                        >
                          {vibe}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep("traits")}
                  className="flex-1 py-4 border-2 border-purple-500/50 text-purple-400 font-semibold rounded-full hover:bg-purple-500/10 transition-all"
                >
                  Edit
                </motion.button>
                <Link href="/ai-interaction" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                  >
                    Meet Your Match
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
