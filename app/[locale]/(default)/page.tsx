import { PricingCards } from "@/components/cards/pricing-cards";
import Title from "@/components/blocks/title";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  console.log('session', session);
  
  try {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <Title />
          <div className="mt-8">
            <PricingCards />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">出错了</h1>
          <p>加载页面时发生错误，请稍后重试。</p>
        </div>
      </main>
    );
  }
}
