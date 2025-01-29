"use client"

import { useState } from "react"
import { useWishlist } from "@/context/wishlist-context"
import { WishlistModal } from "./Modal"

interface WishlistButtonProps {
  product: {
    _id: string
    productName: string
    imageUrl: string
    price: number
    description: string
  }
}

export function WishlistButton({ product }: WishlistButtonProps) {
  const { addItem } = useWishlist()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddToWishlist = () => {
    addItem({
      id: product._id,
      name: product.productName,
      price: product.price,
      image: product.imageUrl,
      category: "Product",
      quantity: 1,
    })
    setIsModalOpen(true)
  }

  return (
    <>
      <button className="bg-black text-white py-2 px-4 rounded mt-6 hover:bg-gray-800" onClick={handleAddToWishlist}>
        Add to Wishlist
      </button>
      <WishlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productName={product.productName} />
    </>
  )
}

