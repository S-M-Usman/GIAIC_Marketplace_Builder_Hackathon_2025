"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function JoinPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: "india",
    gender: "",
    emailUpdates: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Handle form submission
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center space-y-6 mb-8">
        <Image src="/assets/Nike.png" alt="Nike Logo" width={120} height={60} className="mb-2" priority />
        <h1 className="text-2xl font-bold tracking-tight">BECOME A NIKE MEMBER</h1>
        <p className="text-sm text-muted-foreground text-center">
          Create your Nike Member profile and get first access to the very best of Nike products, inspiration and
          community.
        </p>
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
        <div className="space-y-2">
          <Input
            id="firstName"
            placeholder="First Name"
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            id="lastName"
            placeholder="Last Name"
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            id="dateOfBirth"
            placeholder="Date of Birth"
            type="date"
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            required
          />
          <p className="text-xs text-muted-foreground">Get a Nike Member Reward every year on your Birthday.</p>
        </div>
        <div className="space-y-2">
          <Select defaultValue="india" onValueChange={(value) => setFormData({ ...formData, country: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              {/* Add more countries as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <RadioGroup
            defaultValue="male"
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="emailUpdates"
            onCheckedChange={(checked) => setFormData({ ...formData, emailUpdates: checked as boolean })}
          />
          <Label htmlFor="emailUpdates" className="text-sm">
            Sign up for emails to get updates from Nike on products, offers and your Member benefits
          </Label>
        </div>
        <div className="text-xs text-center text-muted-foreground">
          By creating an account, you agree to Nike&apos;s{" "}
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
          JOIN US
        </Button>
        <div className="text-sm text-center">
          Already a Member?{" "}
          <Link href="/auth/sign-in" className="underline">
            Sign in
          </Link>
          .
        </div>
      </form>
    </div>
  )
}

