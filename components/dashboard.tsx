"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User } from "@/hooks/use-user"

interface DashboardProps {
  user: User
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("match")
  const [searchQuery, setSearchQuery] = useState("")

  const sidebarItems = [
    { id: "match", label: "Match Soulz", icon: "💕" },
    { id: "chats", label: "Chats", icon: "💬" },
    { id: "buddy", label: "My Buddy", icon: "🤖" },
    { id: "premium", label: "Premium Features", icon: "⭐" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-black/40 backdrop-blur-sm border-r border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" />
            <span className="text-2xl font-bold text-white">Soulz</span>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border border-pink-500/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="text-white font-medium">{user.name || "User"}</p>
                <p className="text-gray-400 text-sm">{user.wallet_address.slice(0, 6)}...{user.wallet_address.slice(-4)}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              {sidebarItems.find(item => item.id === activeTab)?.label}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users on chain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {activeTab === "match" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                    🤖
                  </div>
                  <h3 className="text-white font-semibold text-center mb-2">AI Soul #{i}</h3>
                  <p className="text-gray-400 text-sm text-center mb-4">Compatible personality match</p>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                    Connect
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "chats" && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-center">No active chats yet. Start by matching with AI souls!</p>
            </div>
          )}

          {activeTab === "buddy" && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-center">Your AI buddy will appear here once you make your first connection.</p>
            </div>
          )}

          {activeTab === "premium" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6 rounded-xl border border-yellow-500/20">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Current Relationships</h3>
                  <p className="text-3xl font-bold text-white">{user.relationships_count}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">Previous Dates</h3>
                  <p className="text-3xl font-bold text-white">{user.previous_dates}</p>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Upgrade to Premium</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">🚀</span>
                    <p className="text-white font-medium">Unlimited Matches</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">💎</span>
                    <p className="text-white font-medium">Priority Support</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">🎯</span>
                    <p className="text-white font-medium">Advanced AI</p>
                  </div>
                </div>
                <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}