import en from "./en.json";
import zh from "./zh.json";
import ja from "./ja.json";
import ko from "./ko.json";

export const languages = {
  en: "English",
  zh: "繁體中文",
  ja: "日本語",
  ko: "한국어",
};

const messages = {
  en,
  zh,
  ja,
  ko,
} as const;

export type SupportedLanguage = keyof typeof messages;
export type Messages = typeof messages;

export default messages;
