"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Image from "next/image"

export function OrderTracking() {
  const router = useRouter()
  const { getOrderDetails } = useCart()
  const [orderIdInput, setOrderIdInput] = useState("")

  const handleTrackOrder = () => {
    if (!orderIdInput.trim()) {
      toast.error("Please enter an order ID")
      return
    }

    const orderDetails = getOrderDetails(orderIdInput)
    if (orderDetails) {
      router.push(`/orders/${orderIdInput}`)
    } else {
      toast.error("Order not found. Please check the order ID and try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image src="/assets/Nike.png" alt="Nike Logo" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-bold">Track Your Order</h1>
            <p className="text-gray-500 mt-2">Enter your order ID to track your package</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your Order ID"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500">Your Order ID can be found in your order confirmation email</p>
            </div>

            <Button onClick={handleTrackOrder} className="w-full bg-black text-white hover:bg-gray-900" size="lg">
              Track Order
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <a href="/contact" className="text-black underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

