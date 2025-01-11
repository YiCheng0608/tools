import en from "./en.json";
import zh from "./zh.json";

const messages = {
  en,
  zh,
} as const;

export type SupportedLanguage = keyof typeof messages;
export type Messages = typeof messages;

export default messages;
