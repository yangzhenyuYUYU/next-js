import { getDictionary } from "./locale";
import { ThemeToggle } from "@/components/theme/toggle";
import { LanguageToggle } from "@/components/language/toggle";
import { LoginButton } from "@/components/auth/login-button";
import { PricingCards } from "@/components/pricing/pricing-cards";

type Props = {
  params: {
    lang: string;
  };
};

export async function generateMetadata({ params }: Props) {
  try {
    const t = await getDictionary(params.lang);
    return {
      title: t.page.title,
      description: t.page.desc,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the page',
    };
  }
}

export default async function Home({ params }: Props) {
  try {
    const t = await getDictionary(params.lang);
    
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="fixed right-4 top-4 flex items-center space-x-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <div className="flex justify-end mb-4">
            <LoginButton />
          </div>
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
