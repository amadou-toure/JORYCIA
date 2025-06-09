import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ isScrolled }: { isScrolled: boolean }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const changeLanguage = (lng: "fr" | "en") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2 ">
      {currentLanguage == "fr" ? (
        <button
          className={`underline ${isScrolled ? "text-gray-800" : "text-white"}`}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
      ) : (
        <button
          className={`underline ${isScrolled ? "text-gray-800" : "text-white"}`}
          onClick={() => changeLanguage("fr")}
        >
          FR
        </button>
      )}
    </div>
  );
};
export default LanguageSwitcher;
