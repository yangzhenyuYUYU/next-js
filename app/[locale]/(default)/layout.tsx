'use client'

import Header from "@/components/blocks/header";
import I18nClientProvider from "@/providers/language";
import { useParams } from "next/navigation";
export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const locale = params.locale as string || 'zh'; // Fallback to 'zh' if no locale
  return (
    <I18nClientProvider locale={locale}>
    <Header />
    <main className="overflow-x-hidden">{children}</main>
    </I18nClientProvider>
  );
}
