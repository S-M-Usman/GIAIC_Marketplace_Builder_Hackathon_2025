"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  quantity: number
}

export interface OrderDetails {
  orderId: string
  items: CartItem[]
  formData: CheckoutFormData
  total: number
  orderDate: string
  status: OrderStatus
}

export interface CheckoutFormData {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  postalCode: string
  locality: string
  state: string
  country: "India" | "United States" | "United Kingdom" | "Pakistan" | "Canada" | "Australia"
  email: string
  phone: string
  pan: string
}

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"

interface CartContextType {
  items: CartItem[]
  isLoading: boolean
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  createOrder: (formData: CheckoutFormData) => Promise<string>
  getOrderDetails: (orderId: string) => OrderDetails | null
  orders: OrderDetails[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "nike-cart-items"
const ORDERS_STORAGE_KEY = "nike-orders"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<OrderDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)

      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }

      if (savedOrders) {
        setOrders(JSON.parse(savedOrders))
      }
    } catch (error) {
      console.error("Error loading cart/orders:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error("Error saving cart:", error)
    }
  }, [items])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
    } catch (error) {
      console.error("Error saving orders:", error)
    }
  }, [orders])

  const addItem = useCallback((item: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === item.id)
      if (existingItem) {
        return currentItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...currentItems, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return

    setItems((currentItems) => currentItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  const createOrder = useCallback(
    async (formData: CheckoutFormData): Promise<string> => {
      try {
        const orderId = `ORD${Date.now()}`
        const newOrder: OrderDetails = {
          orderId,
          items: [...items],
          formData,
          total: getCartTotal(),
          orderDate: new Date().toISOString(),
          status: "confirmed",
        }

        setOrders((currentOrders) => [...currentOrders, newOrder])
        clearCart()

        return orderId
      } catch (error) {
        console.error("Error creating order:", error)
        throw new Error("Failed to create order")
      }
    },
    [items, getCartTotal, clearCart],
  )

  const getOrderDetails = useCallback(
    (orderId: string): OrderDetails | null => {
      return orders.find((order) => order.orderId === orderId) || null
    },
    [orders],
  )

  const value = {
    items,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    createOrder,
    getOrderDetails,
    orders,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

