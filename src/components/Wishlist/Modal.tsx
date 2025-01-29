"use client"


import { Check } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export function WishlistModal({ isOpen, onClose, productName }: WishlistModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Added to Wishlist!</DialogTitle>
          <DialogDescription>{productName} has been added to your Wishlist.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="rounded-full bg-green-100 p-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={onClose}>
            Continue Shopping
          </Button>
          <Link href="/wishlist">
            <Button>View Bag</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

