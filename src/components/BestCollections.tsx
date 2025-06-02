import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Product_card } from "./Card.tsx";
import { useProduct } from "../contexts/Product.context.tsx";

const BestCollections = () => {
  const { Products } = useProduct();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Products.length);
  };

  const prevItem = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + Products.length) % Products.length
    );
  };

  return (
    <div className="py-20 relative bg-white"> 
      {/* Normal Desktop */}
      <div className="mx-auto hidden md:block lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif mb-3">
              Produits les mieux notés
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our most coveted fragrance, each telling a unique
              olfactory story.
            </p>
          </div>
          <Link
            to="/collections"
            className="md:flex items-center text-gray-800 hover:text-gray-600 transition-colors"
          >
            <span className="mr-2">View All </span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-8">
          {[...Products]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
            .map((product, index) => (
              <Product_card key={index} product={product} size="l" />
            ))}
        </div>
      </div>

      {/* Mobile View - Carousel */}
      <div className="md:hidden sm:flex sm:flex-col sm:items-center sm:justify-center">
        <div className="bg-white p-8 rounded-lg relative">
          {Products.length > 0 && (
            <Product_card
              MobileView={true}
              product={
                [...Products].sort((a, b) => b.rating - a.rating)[currentIndex]
              }
            />
          )}
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevItem}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex space-x-2 items-center">
            {[...Products]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 4)
              .map((_, index) => (
                <span
                  key={index}
                  className={`block w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                  }`}
                />
              ))}
          </div>
          <button
            onClick={nextItem}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <Link
          to="/collections"
          className="items-center text-gray-800 hover:text-gray-600 transition-colors"
        >
          <span className="mr-0">View All </span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default BestCollections;
