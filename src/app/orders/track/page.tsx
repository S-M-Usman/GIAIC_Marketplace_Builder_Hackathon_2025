import { OrderTracking } from "@/components/Cart/order-tracking"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Track Your Order | Nike Store",
  description: "Track your Nike order status and delivery",
}

export default function OrderTrackingPage() {
  return <OrderTracking />
}

