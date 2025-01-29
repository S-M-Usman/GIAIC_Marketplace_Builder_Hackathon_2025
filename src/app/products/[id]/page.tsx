import { client } from "@/sanity/lib/client"
import { AddToCartButton } from "@/components/Cart/Button"
import { WishlistButton } from "@/components/Wishlist/Button"
import Image from "next/image"
import { groq } from "next-sanity"

type Product = {
  _id: string
  productName: string
  imageUrl: string
  colors?: string[]
  price: number
  description: string
}

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetail({ params }: Props) {
  // Await the params before using them
  const { id } = await params

  const query = groq`*[_type == "product" && _id == $id][0]{
    _id,
    productName,
    "imageUrl": image.asset->url,
    colors,
    price,
    description
  }`

  try {
    const product: Product = await client.fetch(query, { id })

    if (!product) {
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-gray-600">Product not found</p>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 relative aspect-square">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.productName}
              fill
              priority
              className="object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold">{product.productName}</h1>
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
            <p className="text-2xl font-semibold">MRP : ₹ {product.price.toLocaleString("en-IN")}</p>
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Available Colors:</h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <div key={index} className="relative">
                      <span
                        className="block w-8 h-8 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                      <span className="sr-only">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-4 pt-4">
              <AddToCartButton product={product} />
              <WishlistButton product={product} />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching product:", error)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg text-gray-600">Error loading product</p>
      </div>
    )
  }
}

