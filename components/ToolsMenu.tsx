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
  calculator: Icons.CalculatorIcon,
  colorPalette: Icons.ColorPaletteIcon,
  switch: Icons.ConvertIcon,
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

  const tools = Object.entries(t.tools.list).map(([id, tool]) => ({
    id,
    ...tool,
  })) as Tool[];

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.CalculatorIcon className="w-5 h-5" />
      </button>

      <div className="absolute left-0 w-full h-2 -bottom-2" />

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="max-h-[32rem] overflow-y-auto">
            <div className="grid grid-cols-3 gap-2 p-4">
              {tools.map((tool) => {
                const IconComponent =
                  IconComponents[tool.icon] || Icons.CalculatorIcon;
                return (
                  <Link
                    key={tool.id}
                    href={`/${lang}/${tool.id}`}
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                      pathname.includes(tool.id)
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium text-center">
                      {tool.label}
                    </span>
                    <span className="text-xs text-gray-500 text-center mt-1">
                      {tool.description}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
