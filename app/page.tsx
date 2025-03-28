"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { LoginDialog } from "@/components/ui/login-dialog"
import { ProductCard } from "@/components/ui/product-card"

const products = [
  {
    id: 1,
    title: "产品 1",
    description: "这是产品1的描述",
    price: 99.99,
    image: "/product1.jpg",
  },
  {
    id: 2,
    title: "产品 2",
    description: "这是产品2的描述",
    price: 199.99,
    image: "/product2.jpg",
  },
  {
    id: 3,
    title: "产品 3",
    description: "这是产品3的描述",
    price: 299.99,
    image: "/product3.jpg",
  },
]

export default function Home() {
  const handleAddToCart = (productId: number) => {
    // 这里添加购物车逻辑
    console.log(`Added product ${productId} to cart`)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">我的商店</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
          <LoginDialog />
        </div>
      </header>
      <main className="container py-8">
        <h2 className="text-2xl font-bold mb-6">热门产品</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
 