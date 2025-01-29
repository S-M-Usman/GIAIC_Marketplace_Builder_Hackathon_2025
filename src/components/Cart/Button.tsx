"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { CartModal } from "./Modal"

interface AddToCartButtonProps {
  product: {
    _id: string
    productName: string
    imageUrl: string
    price: number
    description: string
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddToCart = () => {
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
      <button className="bg-black text-white py-2 px-4 rounded mt-6 hover:bg-gray-800" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productName={product.productName} />
    </>
  )
}

