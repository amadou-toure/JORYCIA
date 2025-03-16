import { Droplets, Heart, Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <div className="py-20 bg-[#f8f5f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-6">The Jorycia Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each fragrance is meticulously crafted using the world's finest
            ingredients, creating an unforgettabl sensory journey that captures
            the essence of luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Droplets className="w-12 h-12 text-gray-800" />
            </div>
            <h3 className="text-xl font-serif mb-4">Pure Ingredients</h3>
            <p className="text-gray-600">
              Sourced from the world's finest suppliers, ensuring unparalleled
              quality in every bottle.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Heart className="w-12 h-12 text-gray-800" />
            </div>
            <h3 className="text-xl font-serif mb-4">Crafted with Love</h3>
            <p className="text-gray-600">
              Each fragrance is carefully composed by master perfumers with
              decades of experience.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-12 h-12 text-gray-800" />
            </div>
            <h3 className="text-xl font-serif mb-4">Lasting Impression</h3>
            <p className="text-gray-600">
              Our unique formulations ensure your signature scent stays with you
              throughout the day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
