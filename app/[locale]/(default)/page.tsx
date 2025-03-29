import { getDictionary } from "../locale";
// import PricingWrapper from "@/components/pricing/pricing-wrapper";
import { PricingCards } from "@/components/pricing/pricing-cards";

type Props = {
  params: {
    locale: string;
  };
};


export default async function Home({ params }: Props) {
  try {
    const t = await getDictionary(params.locale);
    
    return (
      <main className="flex min-h-screen flex-col items-center p-24">

        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t.home.title}</h1>
            <p className="text-xl text-muted-foreground">{t.home.desc}</p>
          </div>
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
