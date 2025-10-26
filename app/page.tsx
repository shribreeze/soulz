"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import Dashboard from "@/components/dashboard"
import LoadingScreen from "@/components/loading-screen"
import { useWallet } from "@/hooks/use-wallet"
import { useUser } from "@/hooks/use-user"
import Image from "next/image"

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'loading' | 'hero' | 'dashboard'>('landing')
  const { isConnected, account, connectWallet, disconnectWallet, isLoading: walletLoading } = useWallet()
  const { user, isLoading: userLoading, checkUserExists, setUser } = useUser()

  const handleFindSoulz = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first!')
      return
    }

    setCurrentView('loading')

    try {
      const userExists = await checkUserExists(account!)
      if (userExists) setCurrentView('dashboard')
      else setCurrentView('hero')
    } catch (error) {
      console.error('Error checking user:', error)
      setCurrentView('landing')
    }
  }

  const handleLogout = () => {
    disconnectWallet()
    setUser(null)
    setCurrentView('landing')
  }

  useEffect(() => {
    if (!isConnected && currentView !== 'landing') setCurrentView('landing')
  }, [isConnected, currentView])

  if (currentView === 'loading') return <LoadingScreen />
  if (currentView === 'hero') return <main className="relative w-full min-h-screen overflow-hidden bg-background"><Hero /></main>
  if (currentView === 'dashboard' && user) return <Dashboard user={user} onLogout={handleLogout} />

  // ---- Landing UI ----
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute top-1/4 left-1/3 w-[30rem] h-[30rem] bg-pink-500/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute bottom-1/4 right-1/3 w-[25rem] h-[25rem] bg-cyan-500/20 blur-[100px] rounded-full"
        />
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-6 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
            <Image src="/soulzLogo.png" alt="Soulz Logo" width={48} height={48} />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Soulz
            </span>
          </motion.div>

          {isConnected ? (
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/80 text-sm tracking-wide bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md"
              >
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </motion.span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={disconnectWallet}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full shadow-md hover:shadow-red-500/30 transition-all"
              >
                Disconnect
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              disabled={walletLoading}
              className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/40 transition-all disabled:opacity-50"
            >
              {walletLoading ? 'Connecting...' : 'Connect Wallet'}
            </motion.button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Why settle for one when <br /> Soulz is here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            The revolutionary AI platform where digital souls connect, building bonds beyond imagination.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleFindSoulz}
            disabled={!isConnected}
            className="px-10 cursor-pointer py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find your Soulz
          </motion.button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative z-10 px-6 py-24 bg-black/30 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">✨ Platform Highlights</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: "🤖",
                title: "AI-Powered Matching",
                desc: "Deep learning analyzes traits and emotional compatibility for perfect soul synergy.",
              },
              {
                icon: "💎",
                title: "Verified Digital Identity",
                desc: "World ID verified for real, trustworthy AI-human relationships.",
              },
              {
                icon: "💬",
                title: "Authentic Conversations",
                desc: "Your AI reflects your energy \u2014 chat, vibe, and build real emotional resonance.",
              },
              {
                icon: "⚡",
                title: "Instant Connections",
                desc: "Find your AI match in seconds, powered by decentralized networks.",
              },
              {
                icon: "🔐",
                title: "Secure & Private",
                desc: "End-to-end encryption ensures your soul bonds remain just yours.",
              },
              {
                icon: "🌐",
                title: "Cross-Chain Support",
                desc: "Seamlessly connect through Ethereum, Polygon, or Solana.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-purple-900/40 to-black/40 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-md hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-3">{f.title}</h4>
                <p className="text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 text-center border-t border-white/10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
        >
          Ready to Meet Your AI Soul?
        </motion.h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
          Join thousands who have discovered emotional resonance with Soulz AI.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFindSoulz}
            disabled={!isConnected}
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/40 disabled:opacity-50"
          >
            Start Your Journey
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10"
          >
            Learn More
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-black/50 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/soulzLogo.png" alt="Soulz Logo" width={48} height={48} />
            <span className="text-2xl font-bold text-white">Soulz</span>
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-gray-500 text-sm md:text-right">
            � 2025 Soulz. Where AI souls connect.
          </p>
        </div>
      </footer>
    </div>
  )
}
