"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import messages from "@/app/i18n";
import { Tool } from "@/app/i18n/types";
import * as Icons from "@/components/icons";

interface ToolsMenuProps {
  lang: string;
}

const IconComponents: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  casino: Icons.RouletteIcon,
  functions: Icons.CalculatorIcon,
  palette: Icons.ColorConverterIcon,
  qr_code_2: Icons.QRGeneratorIcon,
  straighten: Icons.UnitConverterIcon,
  image: Icons.ImageConverterIcon,
  currency_exchange: Icons.CurrencyExchangeIcon,
  article: Icons.ArticleGeneratorIcon,
};

export default function ToolsMenu({ lang }: ToolsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const t = messages[lang as keyof typeof messages];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const aiTools = Object.entries(t.tools.list).filter(
    ([_, tool]) => tool.category === "ai"
  );
  const otherTools = Object.entries(t.tools.list).filter(
    ([_, tool]) => tool.category !== "ai"
  );

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center space-x-2 p-2 sm:px-4 sm:py-2 rounded-lg hover:bg-yellow-50"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.ConvertIcon className="w-5 h-5" />
      </button>

      <div className="absolute left-0 w-full h-2 -bottom-2" />

      {isOpen && (
        <div className="fixed sm:absolute inset-0 sm:inset-auto sm:top-[calc(100%+8px)] sm:right-0 sm:w-96 bg-white sm:rounded-lg shadow-xl sm:border border-gray-200 z-50">
          <div className="h-full sm:max-h-[80vh] overflow-y-auto">
            {/* AI Tools Section */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                {t.tools.categories.ai}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {aiTools.map(([id, tool]) => {
                  const IconComponent =
                    IconComponents[tool.icon] || Icons.ConvertIcon;
                  return (
                    <Link
                      key={id}
                      href={`/${lang}/${id}`}
                      className={`flex sm:flex-col items-center p-4 transition-colors ${
                        pathname.includes(id)
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 sm:mb-2 text-blue-500" />
                      <span className="ml-3 sm:ml-0 text-sm font-medium sm:text-center line-clamp-2">
                        {tool.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Other Tools Section */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                {t.tools.categories.widget}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {otherTools.map(([id, tool]) => {
                  const IconComponent =
                    IconComponents[tool.icon] || Icons.ConvertIcon;
                  return (
                    <Link
                      key={id}
                      href={`/${lang}/${id}`}
                      className={`flex sm:flex-col items-center p-4 transition-colors ${
                        pathname.includes(id)
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 sm:mb-2 text-blue-500" />
                      <span className="ml-3 sm:ml-0 text-sm font-medium sm:text-center line-clamp-2">
                        {tool.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
