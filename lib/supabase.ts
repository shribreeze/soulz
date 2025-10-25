import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tsauawodratcglfsmxsk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzYXVhd29kcmF0Y2dsZnNteHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MTEzNjYsImV4cCI6MjA3Njk4NzM2Nn0.9KnAskdRTLxyR1UJt0EgYVkjz5ydPLe0YgvCrT_7a-U'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          name: string | null
          age: number | null
          bio: string | null
          verified: boolean
          created_at: string
          relationships_count: number
          previous_dates: number
        }
        Insert: {
          id?: string
          wallet_address: string
          name?: string | null
          age?: number | null
          bio?: string | null
          verified?: boolean
          created_at?: string
          relationships_count?: number
          previous_dates?: number
        }
        Update: {
          id?: string
          wallet_address?: string
          name?: string | null
          age?: number | null
          bio?: string | null
          verified?: boolean
          created_at?: string
          relationships_count?: number
          previous_dates?: number
        }
      }
    }
  }
}