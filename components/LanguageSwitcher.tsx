"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1];
  const currentTool = pathname.split("/")[2] || "calculator"; // 預設工具

  return (
    <div className="flex gap-2">
      <Link
        href={`/en/${currentTool}`}
        className={`px-2 py-1 rounded ${
          currentLang === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        English
      </Link>
      <Link
        href={`/zh/${currentTool}`}
        className={`px-2 py-1 rounded ${
          currentLang === "zh" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        中文
      </Link>
    </div>
  );
}
