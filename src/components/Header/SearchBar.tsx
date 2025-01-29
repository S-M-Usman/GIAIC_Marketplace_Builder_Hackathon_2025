"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { client } from "@/sanity/lib/client"

interface Product {
  _id: string
  productName: string
  category: string
  price: number
  imageUrl: string
}

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const router = useRouter()

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(`
        *[_type == "product"]{
          _id,
          productName,
          category,
          price,
          "imageUrl": image.asset->url
        }
      `)
      setProducts(data)
      setFilteredProducts(data)
    }

    fetchProducts()
  }, [])

  // Handle search query change
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }, [searchQuery, products])

  return (
    <div className="relative">
      <div className="flex relative items-center">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-48 md:w-60 rounded-full bg-gray-100 pl-10 text-sm"
        />
      </div>

      {/* Dropdown for filtered products */}
      {searchQuery && (
        <div className="absolute mt-2 w-full border border-gray-300 rounded-md shadow-lg bg-white z-50">
          <ul>
            {filteredProducts.map((product) => (
              <li key={product._id}>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setFilteredProducts([])
                    router.push(`/products/${product._id}`)
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2 text-black w-full text-left"
                >
                  <div className="text-sm">{product.productName}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar

