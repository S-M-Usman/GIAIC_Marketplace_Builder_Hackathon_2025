"use client"

import Link from "next/link"
import SearchBar from "./SearchBar"
import { useState } from "react"
import { CartIcon } from "@/components/Cart/Icon"
import { WishlistIcon } from "@/components/Wishlist/Icon"
import {Menu} from "lucide-react"

const NavBar = [
  { name: "New & Featured", link: "/products" },
  { name: "Men", link: "/products " },
  { name: "Women", link: "/products " },
  { name: "Kids", link: "/products " },
  { name: "Sale", link: "/products " },
  { name: "SNKRS", link: "/products " },
]

const BottomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="w-full h-[60px] flex justify-between items-center px-4 font-helvetica bg-[#FFFFFF]">
      {/* Left Side - Logo */}
      <div className="flex items-center">
        <Link href={"/"}>
          <img src="/assets/Nike.png" alt="Nike Logo" className="w-[50px] h-[50px]" />
        </Link>
      </div>

      {/* Middle - Navigation Links */}
      <nav className="hidden md:flex ml-44 space-x-4 text-[15px]">
        {NavBar.map((item, index) => (
          <Link key={index} href={item.link} className="hover:text-gray-600">
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Right Side - Search and Wishlist */}
      <div className="hidden md:flex space-x-4 items-center">
        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Wishlist Icon */}
        <div className="flex items-center">
          <Link href={"/cart"}>
            <WishlistIcon />
          </Link>
          <Link href={"/cart"}>
            <CartIcon />
          </Link>
        </div>
      </div>

      {/* Right Side - Menu Icon (Small Screens) */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            // Close Icon
            <div className="w-[24px] h-[24px] flex items-center justify-center bg-gray-800 text-white rounded">✖</div>
          ) : (
            // Menu Icon
            <div className="w-[24px] h-[24px] flex flex-col justify-between bg-gray-800 text-white p-[2px] rounded">
              <Menu size={20} />
            </div>
          )}
        </button>
      </div>

      {/* Navigation Links - Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-center space-y-4 p-4">
            {NavBar.map((item, index) => (
              <Link key={index} href={item.link} className="hover:text-gray-600">
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col items-center space-y-2 mt-4">
              {/* Search Bar */}
              <div className="flex relative items-center w-full">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>
              {/* Wishlist Icon */}
              <div className="flex items-center">
                <Link href={"/cart"}>
                  <WishlistIcon />
                </Link>
                <Link href={"/cart"}>
                  <CartIcon />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default BottomNav

