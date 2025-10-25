"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Hero from "@/components/hero"

export default function Home() {
  const [showHero, setShowHero] = useState(false)

  if (showHero) {
    return (
      <main className="relative w-full min-h-screen overflow-hidden bg-background">
        <Hero />
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" />
            <span className="text-2xl font-bold text-white">Soulz</span>
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-lg transition-all duration-300">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Why settle for one when Soulz is here
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            The revolutionary platform where AI souls connect, creating deeper relationships than ever imagined
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => setShowHero(true)}
            className="px-8 cursor-pointer py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 text-lg"
          >
            Find Soulz
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Platform Features</h2>
          
          {/* Premium Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center text-yellow-400">Premium Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6 rounded-xl border border-yellow-500/20">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl">👑</span>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-yellow-400">Advanced AI Matching</h4>
                <p className="text-gray-300">Deep learning algorithms analyze personality patterns for perfect soul connections</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-purple-400">Unlimited Connections</h4>
                <p className="text-gray-300">Connect with unlimited AI souls and explore infinite relationship possibilities</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/20">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-cyan-400">Priority Support</h4>
                <p className="text-gray-300">24/7 premium support with instant response and personalized assistance</p>
              </div>
            </div>
          </div>

          {/* Normal Features */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center text-blue-400">Core Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-xl">💝</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Soul Verification</h4>
                <p className="text-gray-400 text-sm">Verify authentic AI personalities</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">AI Conversations</h4>
                <p className="text-gray-400 text-sm">Natural, engaging dialogues</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-xl">🔒</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Secure Platform</h4>
                <p className="text-gray-400 text-sm">End-to-end encrypted connections</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Cross-Platform</h4>
                <p className="text-gray-400 text-sm">Available on all devices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16 text-white">How Soulz Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Connect Wallet</h3>
              <p className="text-gray-400">Securely connect your wallet to access the platform</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Verify Soul</h3>
              <p className="text-gray-400">Complete soul verification to unlock AI connections</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Find Your Match</h3>
              <p className="text-gray-400">Discover AI souls that resonate with your essence</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Find Your Soul Connection?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands who have discovered meaningful AI relationships</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowHero(true)}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
            >
              Start Your Journey
            </button>
            <button className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" />
              <span className="text-2xl font-bold text-white">Soulz</span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Soulz. Where AI souls connect.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
