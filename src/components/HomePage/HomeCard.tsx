import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import type React from "react"

const products = [
  { src: "/assets/Shoe1.png", alt: "Air Jordan 1 Mid SE Craft", type: "Men's Shoes" },
  { src: "/assets/Shirt4.png", alt: "Nike Sportswear T-Shirt", type: "Men's T-Shirt" },
  { src: "/assets/Shoe2.png", alt: "Nike Air Max 90", type: "Men's Shoes" },
  { src: "/assets/Shirt2.png", alt: "Nike Dri-FIT Shirt", type: "Men's Training Shirt" },
  { src: "/assets/Shoes.png", alt: "Nike Air Force 1", type: "Men's Shoes" },
]

const HomeCard: React.FC = () => {
  return (
    <div className="mt-28 px-4 lg:px-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold">Best of Air Max</h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm">Shop</span>
          <button className="p-2 bg-gray-100 text-zinc-400 rounded-full hover:bg-gray-200 hover:text-zinc-800 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 bg-gray-100 text-zinc-400 rounded-full hover:bg-gray-200 hover:text-zinc-800 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto font-helvetica text-[15px]">
        <div className="flex gap-8 overflow-x-auto md:overflow-x-hidden pb-4 md:pb-0">
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-48">
              <div className="relative w-full h-48 mb-2">
                <Image
                  src={product.src || "/placeholder.svg"}
                  alt={product.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h4 className="font-medium">{product.alt}</h4>
              <p className="text-gray-500">{product.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeCard

