"use client"

import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { Loader2, ArrowLeft, Check } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function CheckoutSummary() {
  const router = useRouter()
  const { items, getCartTotal, isLoading, createOrder } = useCart()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Redirect to cart if no items
  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const subtotal = getCartTotal()
  const tax = subtotal * 0.18 // 18% tax
  const total = subtotal + tax
  const deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/cart/checkout" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to checkout
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                <div className="flex items-center gap-4 text-green-600">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Your order is confirmed</p>
                    <p className="text-sm text-gray-500">Estimated delivery by {deliveryDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
                <div className="grid gap-4">
                  <div>
                    <p className="font-medium">Standard Delivery</p>
                    <p className="text-sm text-gray-500">Delivery by {deliveryDate}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-medium">Shipping Address</p>
                    <p className="text-sm text-gray-500">
                      John Doe
                      <br />
                      123 Main St
                      <br />
                      Apartment 4B
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <p className="font-medium">₹ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (18%)</span>
                    <span>₹ {tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹ {total.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-900"
                    size="lg"
                    onClick={async () => {
                      try {
                        // Here you would typically integrate with a payment gateway
                        // For now, we'll just create the order
                        const orderId = await createOrder({
                          firstName: "John",
                          lastName: "Doe",
                          addressLine1: "123 Main St",
                          addressLine2: "Apartment 4B",
                          postalCode: "10001",
                          locality: "New York",
                          state: "NY",
                          country: "United States",
                          email: "john@example.com",
                          phone: "1234567890",
                          pan: "ABCDE1234F",
                        })
                        router.push(`/orders/${orderId}`)
                      } catch (error) {
                        console.error("Error creating order:", error)
                      }
                    }}
                  >
                    Place Order
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    By placing this order, you agree to our{" "}
                    <Link href="/terms" className="underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

