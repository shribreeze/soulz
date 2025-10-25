"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface TraitsInputProps {
  title: string
  placeholder: string
  items: string[]
  onAdd: (item: string) => void
  onRemove: (item: string) => void
  suggestions: string[]
}

export default function TraitsInput({ title, placeholder, items, onAdd, onRemove, suggestions }: TraitsInputProps) {
  const [input, setInput] = useState("")

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim())
      setInput("")
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Add
        </motion.button>
      </div>

      {/* Selected items */}
      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((item) => (
          <motion.div
            key={item}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-2 px-3 py-1 bg-pink-500/20 border border-pink-500/50 rounded-full"
          >
            <span className="text-pink-400 text-sm">{item}</span>
            <motion.button
              whileHover={{ scale: 1.2 }}
              onClick={() => onRemove(item)}
              className="text-pink-400 hover:text-pink-300 transition-colors"
            >
              ×
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Suggestions */}
      <div>
        <p className="text-gray-400 text-xs mb-2">Suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions
            .filter((s) => !items.includes(s))
            .map((suggestion) => (
              <motion.button
                key={suggestion}
                whileHover={{ scale: 1.05 }}
                onClick={() => onAdd(suggestion)}
                className="px-3 py-1 text-xs bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 hover:bg-purple-500/40 transition-all"
              >
                + {suggestion}
              </motion.button>
            ))}
        </div>
      </div>
    </div>
  )
}
