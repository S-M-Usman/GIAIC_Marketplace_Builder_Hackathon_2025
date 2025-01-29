import type { Metadata } from "next"
import CheckOut from "@/components/Cart/Checkout"

export const metadata: Metadata = {
  title: "Checkout | Nike Store",
  description: "Complete your purchase",
}

export default function CheckoutPage() {
  return <CheckOut />
}

