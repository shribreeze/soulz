"use client"

import { motion } from "framer-motion"

interface PersonalityHologramProps {
  avatar: string | null
  traits: string[]
  vibes: string[]
}

export default function PersonalityHologram({ avatar, traits, vibes }: PersonalityHologramProps) {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      {/* Outer glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full blur-3xl"
      />

      {/* Main hologram container */}
      <motion.div
        animate={{
          rotateY: [0, 360],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="relative w-48 h-48"
        style={{ perspective: "1000px" }}
      >
        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 border-2 border-pink-400/50 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-8 border-2 border-cyan-400/50 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-16 border-2 border-purple-400/50 rounded-full"
        />

        {/* Center avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-4xl"
          >
            {avatar === "celestial" && "✨"}
            {avatar === "ethereal" && "🌙"}
            {avatar === "cosmic" && "🌌"}
            {avatar === "luminous" && "💫"}
            {avatar === "mystical" && "🔮"}
            {avatar === "radiant" && "🌟"}
          </motion.div>
        </div>

        {/* Floating trait particles */}
        {traits.map((trait, i) => (
          <motion.div
            key={`trait-${i}`}
            animate={{
              x: Math.cos((i / traits.length) * Math.PI * 2) * 100,
              y: Math.sin((i / traits.length) * Math.PI * 2) * 100,
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="px-2 py-1 bg-pink-500/30 border border-pink-500/50 rounded-full text-xs text-pink-400 whitespace-nowrap">
              {trait}
            </div>
          </motion.div>
        ))}

        {/* Floating vibe particles */}
        {vibes.map((vibe, i) => (
          <motion.div
            key={`vibe-${i}`}
            animate={{
              x: Math.cos((i / vibes.length) * Math.PI * 2 + Math.PI) * 120,
              y: Math.sin((i / vibes.length) * Math.PI * 2 + Math.PI) * 120,
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="px-2 py-1 bg-cyan-500/30 border border-cyan-500/50 rounded-full text-xs text-cyan-400 whitespace-nowrap">
              {vibe}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
