import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

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