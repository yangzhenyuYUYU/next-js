"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProductCardProps {
  title: string
  description: string
  price: number
  image: string
  onAddToCart: () => void
}

export function ProductCard({
  title,
  description,
  price,
  image,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">¥{price}</span>
        <Button onClick={onAddToCart}>加入购物车</Button>
      </CardFooter>
    </Card>
  )
} 