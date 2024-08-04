import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./language/en.json";
import ms from "./language/ms.json";
import zh from "./language/zh.json";

export const languageResources = {
  en: { translation: en },
  ms: { translation: ms },
  zh: { translation: zh },
} as const;

let clng = "en";
i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: clng,
  fallbackLng: clng,
  resources: languageResources,
});

export default i18next;
