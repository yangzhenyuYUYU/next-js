import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'zh'] as const;
export const defaultLocale = 'en' as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/pricing': '/pricing',
  '/about': '/about',
  '/contact': '/contact',
};