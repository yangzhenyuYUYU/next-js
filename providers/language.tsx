'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState } from 'react';

type ClientProviderProps = {
  locale: string;
  children: React.ReactNode;
};

export default function I18nClientProvider({ locale, children }: ClientProviderProps) {
  const [messages, setMessages] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadMessages = async () => {
      try {
        // Dynamically import the language file based on locale
        const messages = await import(`@/i18n/langs/${locale}.json`);
        setMessages(messages.default);
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMessages();
  }, [locale]);
  
  if (loading || !messages) {
    // You can return a loading indicator here if needed
    return null;
  }
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 