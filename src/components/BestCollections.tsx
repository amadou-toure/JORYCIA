import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import { Product_card } from "./Card.tsx";



const BestCollections = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
//    "../../public/assets/BOSS.png",
  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevItem = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };


  return (
    <div className="py-20 bg-white" >
      {/* Normal Desktop and Tablet View */}
      <div className="mx-auto hidden md:block lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif mb-3">Our selection</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.sort((a,b) => b.rating - a.rating).slice(0,3).map((product, index) => (
            <Product_card key={index} product={product} />
          ))}
        </div>
      </div>

      {/* Mobile View - Carousel */}
      <div className="md:hidden">
        <div className="bg-white p-8 rounded-lg relative">
          <Product_card MobileView={true} product={products[currentIndex]}    />
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevItem}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex space-x-2 items-center">
            {products.map((_, index) => (
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
