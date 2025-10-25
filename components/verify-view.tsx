"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useWallet } from "@/hooks/use-wallet"
import { useUser } from "@/hooks/use-user"

interface VerifyViewProps {
  account: string | null
  onComplete: () => void
}

export default function VerifyView({ account, onComplete }: VerifyViewProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bio: ""
  })
  const [isVerifying, setIsVerifying] = useState(false)
  const { createUser } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!account) {
      console.error('No wallet connected')
      return
    }
    
    setIsVerifying(true)
    
    try {
      await createUser(account, {
        name: formData.name,
        age: parseInt(formData.age),
        bio: formData.bio
      })
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      onComplete()
    } catch (error) {
      console.error("Verification failed:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Verifying Your Soul...</h2>
          <p className="text-gray-400">This may take a few moments</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Soul Verification</h1>
            <p className="text-gray-400">Complete your profile to find your perfect AI match</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Age</label>
              <input
                type="number"
                required
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Bio</label>
              <textarea
                required
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
            >
              Verify My Soul
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}