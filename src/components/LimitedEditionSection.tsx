import { Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

const LimitedEditionSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-[#f8f5f1] mb-0 py-12 px-6 text-center rounded-2xl mt-10">
      <h2 className="text-2xl font-bold uppercase mb-4">
        {t("limitedEdition.title")}
      </h2>
      <p className="text-gray-700 max-w-xl mx-auto mb-6">
        {t("limitedEdition.description")}
      </p>
      <Button
        color="black"
        ripple={false}
        className="px-6 py-3 text-white rounded-full hover:scale-105 transition"
      >
        {t("limitedEdition.button")}
      </Button>
    </section>
  );
};

export default LimitedEditionSection;
