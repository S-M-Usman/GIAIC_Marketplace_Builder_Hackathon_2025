"use client"

import { useCart } from "@/context/cart-context"
import { useState, type FormEvent } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import type { CheckoutFormData } from "@/context/cart-context"

const COUNTRIES = ["India", "United States", "United Kingdom", "Pakistan", "Canada", "Australia"] as const

type Country = (typeof COUNTRIES)[number]

const TERRITORIES: Record<Country, string[]> = {
  India: ["Maharashtra", "Karnataka", "Kerala", "Tamil Nadu", "Delhi", "Gujarat"],
  "United States": ["California", "New York", "Texas", "Florida", "Illinois"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Pakistan: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
  Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia"],
}

const CURRENCY_SYMBOLS: Record<Country, string> = {
  India: "₹",
  "United States": "$",
  "United Kingdom": "£",
  Pakistan: "Rs",
  Canada: "C$",
  Australia: "A$",
}

const INITIAL_FORM_DATA: CheckoutFormData = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  postalCode: "",
  locality: "",
  state: "",
  country: "India",
  email: "",
  phone: "",
  pan: "",
}



export default function CheckOut() {
  const router = useRouter()
  const { items, getCartTotal, createOrder, isLoading } = useCart()
  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({})
  const [saveAddress, setSaveAddress] = useState(false)
  const [preferredAddress, setPreferredAddress] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const validateForm = () => {
    const newErrors: Partial<CheckoutFormData> = {}

    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.addressLine1) newErrors.addressLine1 = "Address is required"
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required"
    if (!formData.locality) newErrors.locality = "Locality is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }
    if (!formData.pan) {
      newErrors.pan = "PAN is required"
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = "Please enter a valid PAN number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Instead of creating the order, navigate to summary
      router.push("/cart/checkout/summary")
    } catch (error) {
      console.error("Checkout error:", error)
      // Handle error (show toast, error message, etc.)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Get available territories for selected country
  const availableTerritories = TERRITORIES[formData.country as Country] || []

  // Get currency symbol for selected country
  const currencySymbol = CURRENCY_SYMBOLS[formData.country as Country] || "₹"

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-6">
      <div className="flex flex-col lg:flex-row justify-center max-w-7xl mx-auto gap-8">
        {/* Left Section: Form */}
        <div className="bg-white w-full lg:w-[440px] p-6">
          <h1 className="text-[21px] font-medium mb-4">How would you like to get your order?</h1>
          <p className="text-[#757575] mb-6">
            Customs regulation for India require a copy of the recipient&apos;s KYC. The address on the KYC needs to
            match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC
            will be stored securely and used solely for the purpose of clearing customs (including sharing it with
            customs officials) for all orders and returns. If your KYC does not match your shipping address, please
            click the link for more information.{" "}
            <a href="/kyc-info" className="text-black underline">
              Learn More
            </a>
          </p>

          {/* Delivery Options */}
          <div className="mb-6">
            <button
              type="button"
              className="w-full p-4 border border-gray-300 rounded-lg flex items-center justify-start"
              aria-pressed="true"
            >
              <Image src="/assets/Delivery.png" alt="" width={24} height={24} className="rounded-md border mr-4" />
              <span className="font-medium">Deliver it</span>
            </button>
          </div>

          {/* Address Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <span className="text-[21px] font-medium text-[#111111] block">Enter your name and address:</span>

            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`p-4 border rounded-md w-full ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`p-4 border rounded-md w-full ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                  aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Address Fields */}
            <div>
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                className={`p-4 border rounded-md w-full ${errors.addressLine1 ? "border-red-500" : "border-gray-300"}`}
                aria-invalid={errors.addressLine1 ? "true" : "false"}
              />
              {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>}
            </div>

            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              className="p-4 border border-gray-300 rounded-md w-full"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`p-4 border rounded-md w-full ${errors.postalCode ? "border-red-500" : "border-gray-300"}`}
                  aria-invalid={errors.postalCode ? "true" : "false"}
                />
                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="locality"
                  placeholder="Locality"
                  value={formData.locality}
                  onChange={handleInputChange}
                  className={`p-4 border rounded-md w-full ${errors.locality ? "border-red-500" : "border-gray-300"}`}
                  aria-invalid={errors.locality ? "true" : "false"}
                />
                {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality}</p>}
              </div>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={(e) => {
                    handleInputChange(e)
                    // Reset state when country changes
                    setFormData((prev) => ({ ...prev, state: "" }))
                  }}
                  className="p-4 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Select Country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
              <div>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`p-4 border rounded-md w-full ${errors.state ? "border-red-500" : "border-gray-300"}`}
                  disabled={!formData.country}
                >
                  <option value="">Select State/Territory</option>
                  {availableTerritories.map((territory) => (
                    <option key={territory} value={territory}>
                      {territory}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>

            {/* Save Address */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <Checkbox
                  checked={saveAddress}
                  onCheckedChange={(checked) => setSaveAddress(checked as boolean)}
                  className="accent-[#111111] h-4 w-4"
                />
                <span>Save this address to my profile</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox
                  checked={preferredAddress}
                  onCheckedChange={(checked) => setPreferredAddress(checked as boolean)}
                  className="accent-[#111111] h-4 w-4"
                />
                <span>Make this my preferred address</span>
              </label>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-medium mb-4">What&apos;s your contact information?</h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`p-4 border rounded-md w-full ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`p-4 border rounded-md w-full ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* PAN */}
            <div>
              <h2 className="text-lg font-medium mb-4">What&apos;s your PAN?</h2>
              <div>
                <input
                  type="text"
                  name="pan"
                  placeholder="PAN"
                  value={formData.pan}
                  onChange={handleInputChange}
                  className={`p-4 border rounded-md w-full ${errors.pan ? "border-red-500" : "border-gray-300"}`}
                  aria-invalid={errors.pan ? "true" : "false"}
                />
                {errors.pan && <p className="text-red-500 text-sm mt-1">{errors.pan}</p>}
              </div>
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-4 bg-[#111111] text-white rounded-3xl hover:bg-[#000000]
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>

        {/* Right Section: Order Summary */}
        <div className="bg-white w-full lg:w-[320px] h-auto lg:h-[721px] p-6">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <ul className="space-y-6">
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-4">
                <div className="relative w-32 h-32">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md border"
                    sizes="128px"
                  />
                </div>
                <div>
                  <p className="font-normal text-[13px]">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                  <p className="font-medium">₹ {item.price.toLocaleString("en-IN")}</p>
                </div>
              </li>
            ))}
          </ul>

          <hr className="my-6" />

          {/* Summary */}
          <div className="space-y-4">
            <div className="text-lg font-medium flex justify-between">
              <span>Subtotal:</span>
              <span>
                {currencySymbol} {getCartTotal().toFixed(2)}
              </span>
            </div>
            <div className="text-lg font-medium flex justify-between">
              <span>Delivery:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="text-lg font-medium flex justify-between">
              <span>Tax (18%):</span>
              <span>
                {currencySymbol} {(getCartTotal() * 0.18).toFixed(2)}
              </span>
            </div>
            <div className="text-xl font-bold flex justify-between pt-4">
              <span>Total:</span>
              <span>
                {currencySymbol} {(getCartTotal() * 1.18).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

