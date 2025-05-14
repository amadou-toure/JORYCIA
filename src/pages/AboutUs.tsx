import { Star } from "lucide-react";
import about_us_hero from "../../public/assets/about_us_hero-90hTxhgG-90hTxhgG.jpg";
import About_us_image from "../../public/assets/About_us_image.jpeg";

const AboutUs = () => {
  return (
    <div>
      <div className="relative h-[60vh] mb-20">
        <img
          src={about_us_hero}
          alt="About Us hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-serif text-white text-center px-4">
            JORYCIA ESSENCE — L’Art du Parfum
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-serif mb-6">À propos de nos huiles</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Chez <strong>JORYCIA ESSENCE</strong>, nous croyons que le parfum
              est bien plus qu’un luxe : c’est une expression intime, une
              empreinte invisible qui accompagne chaque moment de vie...
            </p>
            <h3 className="text-2xl font-semibold font-serif mb-4">
              L’huile de parfum, sans compromis
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Tenue longue durée</li>
              <li>Texture soyeuse</li>
              <li>Sillage délicat qui épouse la peau</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Parce que le raffinement ne devrait pas être un privilège, mais
              une sensation partagée.
            </p>
            <p className="text-lg font-serif italic text-gray-800 mt-4">
              ✨ JORYCIA ESSENCE – L’Art du Parfum, Sans Compromis
            </p>
          </div>
          <div>
            <img
              src={About_us_image}
              alt="Perfume crafting"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="text-center w-full py-20 bg-[#f8f5f1]">
          <h3 className="text-3xl font-serif mb-12">Nos valeurs</h3>
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-[#c084fc] mb-4" />
              <h4 className="text-xl font-serif mb-2">Art & Création</h4>
              <p className="text-gray-600 text-sm">
                Chaque parfum est une œuvre olfactive, conçue avec passion et
                précision.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-[#34d399] mb-4" />
              <h4 className="text-xl font-serif mb-2">Durabilité</h4>
              <p className="text-gray-600 text-sm">
                Des choix responsables dans la sélection de nos ingrédients et
                emballages.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-[#60a5fa] mb-4" />
              <h4 className="text-xl font-serif mb-2">Excellence</h4>
              <p className="text-gray-600 text-sm">
                Un engagement constant pour une qualité sans compromis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
