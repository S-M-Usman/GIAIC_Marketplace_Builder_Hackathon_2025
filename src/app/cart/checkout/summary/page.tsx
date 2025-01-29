import type { Metadata } from "next"
import CheckoutSummary from "@/components/Cart/checkout-summary"

export const metadata: Metadata = {
  title: "Order Summary | Nike Store",
  description: "Review your order before confirming",
}

export default function CheckoutSummaryPage() {
  return <CheckoutSummary />
}

