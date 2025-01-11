"use client";

import ToolsMenu from "./ToolsMenu";

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
