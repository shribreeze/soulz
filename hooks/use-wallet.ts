"use client"

import { useState, useEffect } from 'react'

declare global {
  interface Window {
    ethereum?: any
  }
}

const HEDERA_TESTNET = {
  chainId: '0x128', // 296 in hex
  chainName: 'Hedera Testnet',
  rpcUrls: ['https://testnet.hashio.io/api'],
  nativeCurrency: {
    name: 'HBAR',
    symbol: 'HBAR',
    decimals: 18,
  },
  blockExplorerUrls: ['https://hashscan.io/testnet'],
}

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!')
      return
    }

    setIsLoading(true)
    try {
      // Add Hedera Testnet
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [HEDERA_TESTNET],
      })

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      setAccount(accounts[0])
      setIsConnected(true)
    } catch (error) {
      console.error('Error connecting wallet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
  }

  return {
    isConnected,
    account,
    isLoading,
    connectWallet,
    disconnectWallet,
  }
}