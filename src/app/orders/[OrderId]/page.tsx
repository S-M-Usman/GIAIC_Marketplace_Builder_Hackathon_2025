"use client"

import { useCart } from "@/context/cart-context"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface OrderPageProps {
  params: {
    orderId: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  const { getOrderDetails, isLoading } = useCart()
  const [orderDetails, setOrderDetails] = useState<ReturnType<typeof getOrderDetails>>(null)

  useEffect(() => {
    const details = getOrderDetails(params.orderId)
    setOrderDetails(details)
  }, [params.orderId, getOrderDetails])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <p className="text-gray-500">The order you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/orders/track">
          <Button variant="outline">Track Another Order</Button>
        </Link>
      </div>
    )
  }

  const { items, formData, total, orderDate, status } = orderDetails

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/orders/track" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Order Tracking
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">Order #{params.orderId}</h1>
                    <p className="text-gray-500">
                      Placed on{" "}
                      {new Date(orderDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize bg-green-100 text-green-800">
                      {status}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div>
                    <h2 className="font-semibold mb-2">Shipping Address</h2>
                    <p className="text-gray-600">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.addressLine1}
                      {formData.addressLine2 && (
                        <>
                          <br />
                          {formData.addressLine2}
                        </>
                      )}
                      <br />
                      {formData.locality}, {formData.state} {formData.postalCode}
                      <br />
                      {formData.country}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-semibold mb-2">Contact Information</h2>
                    <p className="text-gray-600">
                      Email: {formData.email}
                      <br />
                      Phone: {formData.phone}
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
                    <span>₹ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (18%)</span>
                    <span>₹ {(total * 0.18).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹ {(total * 1.18).toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <Link href="/contact">
                      <Button variant="outline" className="w-full">
                        Need Help?
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

