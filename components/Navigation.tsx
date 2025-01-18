"use client";

import ToolsMenu from "./ToolsMenu";
import Link from "next/link";
import messages from "@/app/i18n";

interface NavigationProps {
  lang: string;
}

export default function Navigation({ lang }: NavigationProps) {
  return (
    <nav className="flex items-center space-x-4">
      <ToolsMenu lang={lang} />
    </nav>
  );
}
