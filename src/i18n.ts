import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import aboutUsFr from "./locales/fr/aboutUs.json";
import aboutUsEn from "./locales/en/aboutUs.json";

const resources = {
  en: { translation: translationEN, aboutUs: aboutUsEn },
  fr: { translation: translationFR, aboutUs: aboutUsFr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
  });

export default i18n;
