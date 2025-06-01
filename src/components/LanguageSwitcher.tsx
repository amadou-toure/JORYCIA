import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: "fr" | "en") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLanguage("fr")}>FR</button>
      <button onClick={() => changeLanguage("en")}>EN</button>
    </div>
  );
};
export default LanguageSwitcher;
