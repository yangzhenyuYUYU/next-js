import { ThemeToggle } from "@/components/theme/toggle";
import { LanguageToggle } from "@/components/language/toggle";
import { LoginButton } from "@/components/auth/login-button";
export default function Header() {
  return (
    <div className="fixed right-4 top-4 flex items-center space-x-2">
        <ThemeToggle />
        <LanguageToggle />
        <LoginButton />
    </div>
  );
}