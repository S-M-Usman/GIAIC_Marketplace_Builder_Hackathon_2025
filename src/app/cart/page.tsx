import Cart from "@/components/Cart/Cart"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shopping Bag | Nike Store",
  description: "View and manage your shopping bag items",
}

export default function CartPage() {
  return <Cart />
}

