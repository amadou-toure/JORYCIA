import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const changeLanguage = (lng: "fr" | "en") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      {currentLanguage == "fr" ? (
        <button onClick={() => changeLanguage("en")}>EN</button>
      ) : (
        <button onClick={() => changeLanguage("fr")}>FR</button>
      )}
    </div>
  );
};
export default LanguageSwitcher;
