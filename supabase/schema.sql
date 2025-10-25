-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  name TEXT,
  age INTEGER,
  bio TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  relationships_count INTEGER DEFAULT 0,
  previous_dates INTEGER DEFAULT 0
);

-- Create index on wallet_address for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own data
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (true);

-- Create policy to allow users to insert their own data
CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to update their own data
CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (true);