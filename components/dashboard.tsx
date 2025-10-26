"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User } from "@/hooks/use-user"

interface DashboardProps {
  user: User
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("match")
  const [searchQuery, setSearchQuery] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, sender: "Luna", text: "Hey! Your AI seems really thoughtful", time: "2:30 PM" },
    { id: 2, sender: "You", text: "Thanks! I love how creative yours is. Want to grab coffee sometime?", time: "2:32 PM" },
    { id: 3, sender: "Luna", text: "I'd love that", time: "2:33 PM" }
  ])
  const [newMessage, setNewMessage] = useState("")

  // Check URL for tab parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [])

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage("")
    }
  }

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
              {[
                { name: "alex.eth", avatar: "🎨", trait: "Creative Artist" },
                { name: "sarah.crypto", avatar: "🌟", trait: "Adventurous Spirit" },
                { name: "mike.web3", avatar: "🎵", trait: "Music Lover" },
                { name: "emma.defi", avatar: "📚", trait: "Book Enthusiast" },
                { name: "david.nft", avatar: "🏃", trait: "Fitness Enthusiast" },
                { name: "luna.cosmos", avatar: "🌙", trait: "Dreamy Philosopher" }
              ].map((match, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                    {match.avatar}
                  </div>
                  <h3 className="text-white font-semibold text-center mb-2">{match.name}</h3>
                  <p className="text-gray-400 text-sm text-center mb-4">{match.trait}</p>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                    Connect
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "chats" && (
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 h-[600px] flex flex-col">
              <div className="p-4 border-b border-gray-700 flex items-center gap-3">
                <div className="text-2xl">🌙</div>
                <div>
                  <h3 className="text-white font-semibold">Luna</h3>
                  <p className="text-cyan-400 text-sm">luna.soulz.eth</p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-500/10 border-b border-gray-700">
                <p className="text-blue-300 text-sm">AI Insight: Your AIs found mutual empathy alignment. You both value deep emotional connections.</p>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'You' 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "buddy" && (
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative z-10 text-center">
                {/* Luna Avatar with animations */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl relative"
                >
                  🌙
                  {/* Floating particles */}
                  <motion.div
                    animate={{
                      y: [-10, -20, -10],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                    className="absolute -top-2 -right-2 text-cyan-400 text-xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    animate={{
                      y: [-5, -15, -5],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1
                    }}
                    className="absolute -bottom-1 -left-3 text-purple-400 text-lg"
                  >
                    💫
                  </motion.div>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  Luna
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-cyan-400 mb-4"
                >
                  luna.soulz.eth
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 mb-8"
                >
                  <div className="flex justify-center gap-2">
                    {["Empathetic", "Creative", "Adventurous"].map((trait, i) => (
                      <motion.span
                        key={trait}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm border border-pink-500/30"
                      >
                        {trait}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    {["Ethereal", "Romantic", "Mysterious"].map((vibe, i) => (
                      <motion.span
                        key={vibe}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                      >
                        {vibe}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                
                {/* Compatibility stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="grid grid-cols-2 gap-4 mb-6"
                >
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-400">94%</div>
                    <div className="text-gray-400 text-sm">Compatibility</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-400">96%</div>
                    <div className="text-gray-400 text-sm">Chemistry</div>
                  </div>
                </motion.div>
                
                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex gap-3 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("chats")}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Chat with Luna
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all"
                  >
                    View Insights
                  </motion.button>
                </motion.div>
              </div>
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