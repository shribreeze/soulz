"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWallet } from "@/hooks/use-wallet"
import { useUser } from "@/hooks/use-user"
import AvatarSelector from "@/components/avatar-selector"
import TraitsInput from "@/components/traits-input"
import PersonalityHologram from "@/components/personality-hologram"

export default function ProfilePage() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [traits, setTraits] = useState<string[]>([])
  const [vibes, setVibes] = useState<string[]>([])
  const [step, setStep] = useState<"avatar" | "traits" | "review">("avatar")

  const router = useRouter()
  const { isConnected, account } = useWallet()
  const { createUser } = useUser()

  const handleAdd = (value: string, setter: any, list: string[]) => {
    if (value && !list.includes(value) && list.length < 5) setter([...list, value])
  }

  const handleRemove = (value: string, setter: any, list: string[]) => {
    setter(list.filter((i: string) => i !== value))
  }

  const handleFinish = async () => {
    if (!account) return
    try {
      await createUser(account, {
        name: `Soul_${account.slice(-6)}`,
        age: Math.floor(Math.random() * 30) + 20,
        bio: `${selectedAvatar} soul with traits: ${traits.join(", ")} and vibes: ${vibes.join(", ")}`
      })
      router.push("/ai-interaction")
    } catch (error) {
      console.error("Error saving profile:", error)
      router.push("/ai-interaction")
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Connecting Wallet...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

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

        {/* Step indicators */}
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

        {/* Animated step transitions */}
        <AnimatePresence mode="wait">
          {step === "avatar" && (
            <motion.section
              key="avatar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-2 text-center">Choose Your AI Avatar</h2>
              <p className="text-gray-400 text-center mb-8">Select the visual representation of your AI companion</p>
              <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep("traits")}
                disabled={!selectedAvatar}
                className="w-full mt-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </motion.button>
            </motion.section>
          )}

          {step === "traits" && (
            <motion.section
              key="traits"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-2 text-center">Define Your Personality</h2>
              <p className="text-gray-400 text-center mb-8">Add traits and vibes that define your AI companion</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <TraitsInput
                  title="Traits"
                  placeholder="e.g., Empathetic, Witty"
                  items={traits}
                  onAdd={(t) => handleAdd(t, setTraits, traits)}
                  onRemove={(t) => handleRemove(t, setTraits, traits)}
                  suggestions={["Empathetic", "Creative", "Adventurous", "Calm", "Witty", "Mysterious"]}
                />
                <TraitsInput
                  title="Favorite Vibes"
                  placeholder="e.g., Cosmic, Dreamy"
                  items={vibes}
                  onAdd={(v) => handleAdd(v, setVibes, vibes)}
                  onRemove={(v) => handleRemove(v, setVibes, vibes)}
                  suggestions={["Cosmic", "Ethereal", "Dreamy", "Bold", "Gentle", "Zen", "Electric"]}
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep("avatar")}
                  className="flex-1 py-4 border border-gray-600 text-gray-300 font-semibold rounded-full hover:bg-gray-700 transition-all"
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
                  Continue
                </motion.button>
              </div>
            </motion.section>
          )}

          {step === "review" && (
            <motion.section
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-2 text-center">Your AI Companion</h2>
              <p className="text-gray-400 text-center mb-8">Review your AI personality hologram</p>

              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                <PersonalityHologram avatar={selectedAvatar} traits={traits} vibes={vibes} />
                <div className="space-y-6">
                  <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30">
                    <p className="text-gray-400 text-sm mb-2">AI Avatar</p>
                    <p className="text-white font-semibold capitalize">{selectedAvatar}</p>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30">
                    <p className="text-gray-400 text-sm mb-3">Traits</p>
                    <div className="flex flex-wrap gap-2">
                      {traits.map((t) => (
                        <span key={t} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30">
                    <p className="text-gray-400 text-sm mb-3">Vibes</p>
                    <div className="flex flex-wrap gap-2">
                      {vibes.map((v) => (
                        <span key={v} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep("traits")}
                  className="flex-1 py-4 border border-gray-600 text-gray-300 font-semibold rounded-full hover:bg-gray-700 transition-all"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFinish}
                  className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                >
                  Meet Your Match
                </motion.button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
