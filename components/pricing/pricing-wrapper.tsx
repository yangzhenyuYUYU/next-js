'use client';

import { PricingCards } from './pricing-cards';
import I18nClientProvider from '@/providers/language';
import { useParams } from 'next/navigation';

export default function PricingWrapper() {
  // Use the next/navigation hook to get the current locale
  const params = useParams();
  const locale = params.locale as string || 'zh'; // Fallback to 'zh' if no locale
  
  return (
    <I18nClientProvider locale={locale}>
      <PricingCards />
    </I18nClientProvider>
  );
} 