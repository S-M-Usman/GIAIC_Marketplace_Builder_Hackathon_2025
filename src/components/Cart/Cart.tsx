"use client"

import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
}

export default function Cart() {
  const { items, removeItem, updateQuantity, getCartTotal, isLoading } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const recommendedProducts: Product[] = [
    {
      id: "1",
      name: "Air Jordan 1 Mid SE Craft",
      category: "Men's Shoes",
      price: 12295.0,
      image: "/assets/Shoe1.png",
    },
    {
      id: "2",
      name: "Air Jordan 1 Mid SE Craft",
      category: "Men's Shoes",
      price: 12295.0,
      image: "/assets/Shirt.png",
    },
    {
      id: "3",
      name: "Air Jordan 1 Mid SE Craft",
      category: "Men's Shoes",
      price: 12295.0,
      image: "/assets/Shoe2.png",
    },
    {
      id: "4",
      name: "Air Jordan 1 Mid SE Craft",
      category: "Men's Shoes",
      price: 12295.0,
      image: "/assets/Shirt2.png",
    },
    {
      id: "5",
      name: "Air Jordan 1 Mid SE Craft",
      category: "Men's Shoes",
      price: 12295.0,
      image: "/assets/Shoes.png",
    },
  ]

  const handleQuantityUpdate = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setIsUpdating(true)
    try {
      await updateQuantity(id, newQuantity)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bag Section */}
        <div className="lg:col-span-2 bg-[#FFFFFF] p-6">
          {/* Free Delivery Banner */}
          <div className="bg-gray-100 p-4 mb-6 rounded-md text-sm">
            <span>Free Delivery</span> applies to orders of ₹10,000 or more.{" "}
            <Link href="/shipping-details" className="text-[#111111] underline">
              View details
            </Link>
          </div>

          {/* Bag Items */}
          <h2 className="text-lg font-bold mb-4">Bag</h2>
          <div className="space-y-8">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your bag is empty.</p>
                <Link href="/products">
                  <Button className="bg-black text-white hover:bg-gray-900">Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex flex-wrap gap-4 sm:gap-6 md:flex-nowrap border-b pb-6">
                  <div className="w-full sm:w-32 h-32 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 100vw, 128px"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-500">{item.category}</p>
                      </div>
                      <p className="font-bold">₹ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isUpdating}
                          className="h-8 w-8"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center" aria-label="Quantity">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                          disabled={isUpdating}
                          className="h-8 w-8"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Favourites Section */}
          <h3 className="text-lg font-bold mt-12">Favourites</h3>
          <p className="text-gray-500">There are no items saved to your favourites.</p>
        </div>

        {/* Summary Section */}
        <div className="bg-[#FFFFFF] p-6">
          <h2 className="text-lg font-bold mb-6">Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹ {getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery & Handling:</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>₹ {getCartTotal().toFixed(2)}</span>
          </div>
          <Link href="/cart/checkout">
            <Button
              className="w-full mt-6 bg-black text-white py-6 rounded-3xl font-medium 
                disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900"
              disabled={items.length === 0}
            >
              Member Checkout
            </Button>
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      {items.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h3 className="text-lg font-bold mt-12 mb-4">You Might Also Like</h3>
          <div className="flex gap-12 overflow-x-auto pb-4 scrollbar-hide">
            {recommendedProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="flex-shrink-0 w-48 group">
                <div className="relative w-48 h-48">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md border group-hover:opacity-90 transition-opacity"
                    sizes="192px"
                  />
                </div>
                <h4 className="font-semibold mt-2 group-hover:text-gray-700">{product.name}</h4>
                <p className="text-gray-500">{product.category}</p>
                <p className="font-bold">MRP: ₹ {product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

