"use client"

import { motion } from "framer-motion"

export default function PulsingHeart() {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="text-pink-400"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />
    </motion.svg>
  )
}
