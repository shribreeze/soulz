"use client"

import { motion } from "framer-motion"

interface AvatarSelectorProps {
  selected: string | null
  onSelect: (avatar: string) => void
}

const avatars = [
  { id: "celestial", name: "Celestial", emoji: "✨" },
  { id: "ethereal", name: "Ethereal", emoji: "🌙" },
  { id: "cosmic", name: "Cosmic", emoji: "🌌" },
  { id: "luminous", name: "Luminous", emoji: "💫" },
  { id: "mystical", name: "Mystical", emoji: "🔮" },
  { id: "radiant", name: "Radiant", emoji: "🌟" },
]

export default function AvatarSelector({ selected, onSelect }: AvatarSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {avatars.map((avatar) => (
        <motion.button
          key={avatar.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(avatar.id)}
          animate={{
            borderColor: selected === avatar.id ? "rgba(255, 153, 204, 0.8)" : "rgba(255, 153, 204, 0.2)",
            boxShadow:
              selected === avatar.id ? "0 0 30px rgba(255, 153, 204, 0.5)" : "0 0 10px rgba(255, 153, 204, 0.1)",
          }}
          className="p-6 rounded-lg border-2 bg-purple-900/30 transition-all"
        >
          <motion.div
            animate={{
              scale: selected === avatar.id ? 1.2 : 1,
            }}
            className="text-5xl mb-3"
          >
            {avatar.emoji}
          </motion.div>
          <p className="text-white font-semibold">{avatar.name}</p>
        </motion.button>
      ))}
    </div>
  )
}
