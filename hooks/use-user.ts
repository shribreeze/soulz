"use client"

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface User {
  id: string
  wallet_address: string
  name?: string
  age?: number
  bio?: string
  verified: boolean
  created_at: string
  relationships_count: number
  previous_dates: number
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkUserExists = async (walletAddress: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress.toLowerCase())
        .maybeSingle()

      if (error) {
        console.warn('Database table not ready, treating as new user')
        return false
      }

      if (data) {
        setUser(data as User)
        return true
      }
      
      return false
    } catch (error) {
      console.warn('Database not ready, treating as new user')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async (walletAddress: string, userData: Partial<User>) => {
    if (!walletAddress) {
      throw new Error('Wallet address is required')
    }
    
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          wallet_address: walletAddress.toLowerCase(),
          name: userData.name,
          age: userData.age,
          bio: userData.bio,
          verified: true,
          relationships_count: 0,
          previous_dates: 0
        })
        .select()
        .single()

      if (error) {
        console.warn('Database not ready, creating mock user')
        // Create mock user for demo
        const mockUser: User = {
          id: 'mock-' + Date.now(),
          wallet_address: walletAddress.toLowerCase(),
          name: userData.name || 'Demo User',
          age: userData.age,
          bio: userData.bio,
          verified: true,
          created_at: new Date().toISOString(),
          relationships_count: 0,
          previous_dates: 0
        }
        setUser(mockUser)
        return mockUser
      }
      
      const newUser = data as User
      setUser(newUser)
      return newUser
    } catch (error) {
      console.warn('Database not ready, creating mock user')
      // Create mock user for demo
      const mockUser: User = {
        id: 'mock-' + Date.now(),
        wallet_address: walletAddress.toLowerCase(),
        name: userData.name || 'Demo User',
        age: userData.age,
        bio: userData.bio,
        verified: true,
        created_at: new Date().toISOString(),
        relationships_count: 0,
        previous_dates: 0
      }
      setUser(mockUser)
      return mockUser
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading,
    checkUserExists,
    createUser,
    setUser
  }
}