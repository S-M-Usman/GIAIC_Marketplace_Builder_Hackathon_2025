"use client"

import { createContext, useContext, useState, useCallback } from "react"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  quantity: number
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id:string) => void
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  const addItem = useCallback((item: WishlistItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === item.id)
      if (existingItem) {
        return currentItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...currentItems, { ...item, quantity: 1 }]
    })
  }, [])
  const removeItem = useCallback((itemId:string) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === itemId)
      if (existingItem?.quantity === 1) {
        return currentItems.filter((i) => i.id !== itemId)
      }
      return currentItems.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
    })
  }, [])

  const clearWishlist = useCallback(() => {
    setItems([])
  }, [])

  const value = {
    items,
    addItem,
    removeItem,
    clearWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

