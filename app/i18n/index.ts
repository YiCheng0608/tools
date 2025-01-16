import en from "./en.json";
import zh from "./zh.json";
import ja from "./ja.json";
import ko from "./ko.json";

const messages = {
  en,
  zh,
  ja,
  ko,
} as const;

export type SupportedLanguage = keyof typeof messages;
export type Messages = typeof messages;

export default messages;
