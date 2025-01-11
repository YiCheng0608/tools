"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import messages from "@/app/i18n";

interface NavigationProps {
  lang: string;
}

export default function Navigation({ lang }: NavigationProps) {
  const pathname = usePathname();
  const t = messages[lang as keyof typeof messages];
  const tools = [
    { id: "calculator", label: t.nav.calculator },
    { id: "timer", label: t.nav.timer },
    { id: "colorPicker", label: t.nav.colorPicker },
  ];

  return (
    <nav className="flex gap-4">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          href={`/${lang}/${tool.id}`}
          className={`px-3 py-2 rounded ${
            pathname.includes(tool.id)
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {tool.label}
        </Link>
      ))}
    </nav>
  );
}
