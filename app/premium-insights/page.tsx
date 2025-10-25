"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import SoulTransparencyMap from "@/components/soul-transparency-map"
import InsightCard from "@/components/insight-card"

export default function PremiumInsightsPage() {
  const insights = [
    {
      title: "Emotional Resonance",
      description: "Your emotional frequencies align on 7 out of 8 core dimensions",
      value: "87%",
      icon: "💕",
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Values Alignment",
      description: "Shared beliefs in creativity, authenticity, and growth",
      value: "84%",
      icon: "🎯",
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Communication Style",
      description: "Complementary communication patterns for deep connection",
      value: "91%",
      icon: "💬",
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Future Compatibility",
      description: "Long-term potential based on growth trajectories",
      value: "89%",
      icon: "🚀",
      color: "from-yellow-400 to-orange-500",
    },
  ]

  return (
    <main className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />

      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <Link href="/">
            <motion.h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              Soulz
            </motion.h1>
          </Link>
          <p className="text-gray-400 text-lg">Premium Soul Insights</p>
        </motion.div>

        {/* Main container */}
        <div className="max-w-6xl mx-auto">
          {/* Soul Transparency Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Soul Transparency Map</h2>
            <SoulTransparencyMap />
          </motion.div>

          {/* Insight cards grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {insights.map((insight, i) => (
              <InsightCard key={insight.title} insight={insight} delay={0.5 + i * 0.1} />
            ))}
          </motion.div>

          {/* Detailed analysis section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-purple-900/30 border border-purple-500/30 rounded-2xl p-8 mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Detailed Analysis</h3>

            <div className="space-y-6">
              {/* Emotional Mapping */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-pink-400">💭</span> Emotional Mapping
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: "Empathy", you: 87, them: 91 },
                    { label: "Passion", you: 79, them: 85 },
                    { label: "Stability", you: 82, them: 88 },
                  ].map((metric) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-purple-900/50 rounded-lg p-4 border border-purple-500/20"
                    >
                      <p className="text-gray-400 text-sm mb-3">{metric.label}</p>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-pink-400 text-xs">You</span>
                            <span className="text-pink-400 text-xs font-semibold">{metric.you}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.you}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-pink-500"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-cyan-400 text-xs">Them</span>
                            <span className="text-cyan-400 text-xs font-semibold">{metric.them}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.them}%` }}
                              transition={{ duration: 1, delay: 0.6 }}
                              className="h-full bg-cyan-400"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Compatibility Factors */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-cyan-400">🔗</span> Compatibility Factors
                </h4>
                <div className="space-y-3">
                  {[
                    { factor: "Shared Interests", score: 88 },
                    { factor: "Communication Compatibility", score: 91 },
                    { factor: "Life Goals Alignment", score: 85 },
                    { factor: "Personality Harmony", score: 89 },
                  ].map((item) => (
                    <motion.div
                      key={item.factor}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 bg-purple-900/50 rounded-lg border border-purple-500/20"
                    >
                      <span className="text-gray-300">{item.factor}</span>
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        className="text-lg font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
                      >
                        {item.score}%
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-400">✨</span> Recommendations
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>Explore your shared passion for creative pursuits together</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>Schedule regular deep conversations to strengthen emotional bonds</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>Plan adventures that align with both your growth trajectories</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>Celebrate your complementary communication styles</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Verification badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <div className="px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-400 font-semibold">World ID Verified</span>
            </div>
            <div className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-cyan-400 font-semibold">Emotion Synced</span>
            </div>
            <div className="px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-purple-400 font-semibold">ENS Identity</span>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/match-reveal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
              >
                Back to Chat
              </motion.button>
            </Link>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 transition-all"
              >
                Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
