import { supabase } from './supabase'

export async function setupDatabase() {
  try {
    // Check if users table exists by trying to select from it
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1)

    if (error) {
      console.log('Users table needs to be created. Please run the schema.sql in your Supabase dashboard.')
      return false
    }

    console.log('Database is ready!')
    return true
  } catch (error) {
    console.error('Database setup error:', error)
    return false
  }
}

// Test database connection
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1)

    if (error) throw error
    
    console.log('✅ Supabase connection successful')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return false
  }
}