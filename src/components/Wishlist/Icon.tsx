"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlist } from "@/context/wishlist-context"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function WishlistIcon() {
  const { items } = useWishlist()
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger animation when items count changes
  useEffect(() => {
    if (items.length > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [items.length])

  return (
    <Link href="/wishlist">
      <Button variant="ghost" className="relative">
        <Heart className={`h-9 w-9 ${isAnimating ? "animate-bounce" : ""} ${items.length > 0 ? "" : ""}`} />
        {items.length > 0 && (
          <span
            className={`absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
              isAnimating ? "animate-pulse" : ""
            }`}
          >
            {items.length}
          </span>
        )}
      </Button>
    </Link>
  )
}

