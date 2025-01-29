"use client"

import { Trash2 } from 'lucide-react'
import { useWishlist } from "@/context/wishlist-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Wishlist() {
  const { items, removeItem } = useWishlist()

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Wishlist</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-900">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="relative bg-white rounded-lg shadow-md p-4">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500">{item.category}</p>
                <p className="font-bold mt-2">₹ {item.price.toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 hover:bg-red-50 hover:text-red-500"
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
