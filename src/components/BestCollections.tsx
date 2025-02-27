import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BestCollections = () => {
  const collections = [
    {
      name: "Summer Essentials",
      description: "Light, refreshing fragrances for warm days",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
    },
    {
      name: "Noir Collection",
      description: "Mysterious and seductive scents for the evening",
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
    },
    {
      name: "Botanical Garden",
      description: "Nature-inspired fragrances with floral notes",
      image: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
    },
    {
      name: "Exclusive Limited Editions",
      description: "Rare and unique compositions for the connoisseur",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
    }
  ];

  return (
    <div className="py-20 bg-[#f8f5f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif mb-3">Best Collections</h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our most coveted fragrance collections, each telling a unique olfactory story.
            </p>
          </div>
          <Link to="/collections" className="hidden md:flex items-center text-gray-800 hover:text-gray-600 transition-colors">
            <span className="mr-2">View All Collections</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-6 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Explore
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-serif mb-2">{collection.name}</h3>
              <p className="text-gray-600 text-sm">{collection.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link to="/collections" className="inline-flex items-center text-gray-800 hover:text-gray-600 transition-colors">
            <span className="mr-2">View All Collections</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BestCollections;