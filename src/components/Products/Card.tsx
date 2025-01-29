import Image from "next/image"
import Link from "next/link"

interface Card {
  id: string
  image: string
  label?: string
  name: string
  colors: string[] | undefined
  price: number
}

export default function ProductCard({ id, image, label, name, colors, price }: Card) {
  return (
    <Link href={`/products/${id}`} key={id} className="block group">
      <div className="space-y-2">
        <div className="relative aspect-square ">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={348}
            height={348}
            className="object-cover w-full h-full group-hover:opacity-90 transition-opacity"
          />
        </div>
        <div className="space-y-1">
          {label && <span className="text-red-600 text-sm font-medium">{label}</span>}
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-600">{colors?.join(", ")}</p>
          <p className="font-medium">MRP : ₹ {price.toLocaleString("en-IN")}</p>
        </div>
      </div>
    </Link>
  )
}

