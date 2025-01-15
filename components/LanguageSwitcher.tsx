"use client";

import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import * as Icons from "@/components/icons";
import Link from "next/link";

interface Language {
  code: string;
  label: string;
}

const languages: Language[] = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1];

  const handleLanguageChange = (langCode: string) => {
    const newPath = pathname.replace(/^\/[^/]+/, `/${langCode}`);
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  const menuRef = useRef(null);
  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <button
        className="flex items-center space-x-2 p-2 sm:px-4 sm:py-2 rounded-lg hover:bg-yellow-50 text-gray-800"
        onMouseEnter={() => setIsOpen(true)}
      >
        <Icons.LanguageIcon className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">
          {currentLanguage?.label}
        </span>
      </button>

      <div className="absolute left-0 w-full h-2 -bottom-2" />

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-32 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-yellow-50 ${
                  language.code === currentLang
                    ? "text-yellow-600 font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => handleLanguageChange(language.code)}
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
