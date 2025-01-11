export interface Tool {
  id: string;
  icon: string;
  label: string;
  description: string;
  category: "calculator" | "converter" | "generator" | "other";
}

export interface ToolsGroup {
  category: string;
  tools: Tool[];
}
