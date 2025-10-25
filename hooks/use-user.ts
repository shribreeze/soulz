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
        console.error('Database error:', error)
        // If table doesn't exist, return false (new user)
        if (error.code === '42P01' || error.message.includes('relation "users" does not exist')) {
          console.log('Users table does not exist. Please create it using the schema.sql file.')
        }
        return false
      }

      if (data) {
        setUser(data as User)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error checking user:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async (walletAddress: string, userData: Partial<User>) => {
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
        console.error('Database error:', error)
        if (error.code === '42P01' || error.message.includes('relation "users" does not exist')) {
          console.log('Users table does not exist. Please create it using the schema.sql file.')
        }
        throw error
      }
      
      const newUser = data as User
      setUser(newUser)
      return newUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
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