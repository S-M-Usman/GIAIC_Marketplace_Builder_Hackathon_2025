"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepSignedIn: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Handle form submission
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16 min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center space-y-6 mb-8">
        <Image src="/assets/Nike.png" alt="Nike Logo" width={120} height={60} className="mb-2" priority />
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-bold tracking-tight">YOUR ACCOUNT</h1>
          <h2 className="text-xl font-bold tracking-tight">FOR EVERYTHING</h2>
          <h3 className="text-xl font-bold tracking-tight">NIKE</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            id="email"
            placeholder="Email address"
            type="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="keepSignedIn"
              onCheckedChange={(checked) => setFormData({ ...formData, keepSignedIn: checked as boolean })}
            />
            <Label htmlFor="keepSignedIn" className="text-sm">
              Keep me signed in
            </Label>
          </div>
          <Link href="/auth/forgot-password" className="text-sm underline">
            Forgotten your password?
          </Link>
        </div>
        <div className="text-xs text-center text-muted-foreground">
          By logging in, you agree to Nike&apos;s{" "}
          <Link href="#" className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline">
            Terms of Use
          </Link>
          .
        </div>
        <Button type="submit" className="w-full bg-black hover:bg-black/90">
          SIGN IN
        </Button>
        <div className="text-sm text-center">
          Not a Member?{" "}
          <Link href="/auth/join-us" className="underline">
            Join Us
          </Link>
        </div>
      </form>
    </div>
  )
}

