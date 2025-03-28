import "server-only";

const langs = {
  en: () => import("@/i18n/langs/en.json").then((module) => module.default),
  zh: () => import("@/i18n/langs/zh.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (!locale || !langs[locale]) {
    throw new Error(`Invalid locale: ${locale}`);
  }
  
  try {
    const dictionary = await langs[locale]();
    return dictionary;
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error);
    throw error;
  }
};
