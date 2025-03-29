"use client";

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"

const languages = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
]

export function LanguageToggle() {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (langCode: string) => {
    let newPathname;
    if (pathname === '/') {
      // If pathname is root, directly prepend the language code
      newPathname = `/${langCode}`;
    } else {
      // Check if pathname already has a language prefix
      const hasLangPrefix = /^\/(en|zh)/.test(pathname);
      if (hasLangPrefix) {
        // Replace existing language code
        newPathname = pathname.replace(/^\/(en|zh)/, `/${langCode}`);
      } else {
        // Add language code prefix
        newPathname = `/${langCode}${pathname}`;
      }
    }
    router.push(newPathname);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}