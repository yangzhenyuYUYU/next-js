'use client'

import { useTranslations } from "next-intl";
    
export default function Title() {
  const t = useTranslations("home");
  return (
    <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground">{t("desc")}</p>
    </div>
  );
}
