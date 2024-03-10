import { DB } from "./const_trans";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .init({
    detection: {
      order: ["navigator"],
    },
  });

export function Translate(textId: number) {
  const isJapanese = i18n.language === "ja-JP";
  const text = DB[textId][isJapanese ? "jp" : "en"];
  return text;
}
