import { ThemeToggle } from "@/components/actions/theme/toggle";
import { LanguageToggle } from "@/components/actions/language/toggle";
import { LoginButton } from "@/components/auth/login-button";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("site");

  return (
    <div className="mx-auto fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between border-b border-muted">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            {/* Logo placeholder - replace with your logo */}
            <div className="w-full h-full rounded-full bg-gray-200" />
          </div>
          <h1 className="font-semibold text-lg">
            {t("title")}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <LanguageToggle />
          <LoginButton />
        </div>
      </div>
    </div>
  );
}