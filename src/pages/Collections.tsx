import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const Collections = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const collections: Collection[] = [
    {
      id: 1,
      name: "Signature Collection",
      description: "Our flagship collection of timeless fragrances",
      image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "signature"
    },
    {
      id: 2,
      name: "Oud Collection",
      description: "Luxurious fragrances featuring precious oud wood",
      image: "https://images.unsplash.com/photo-1547887538-047f814bfb64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "oud"
    },
    {
      id: 3,
      name: "Floral Collection",
      description: "Delicate bouquets of the world's finest flowers",
      image: "https://images.unsplash.com/photo-1596536247632-5f4b34a9fd26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "floral"
    },
    {
      id: 4,
      name: "Summer Essentials",
      description: "Light, refreshing fragrances for warm days",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "seasonal"
    },
    {
      id: 5,
      name: "Noir Collection",
      description: "Mysterious and seductive scents for the evening",
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "noir"
    },
    {
      id: 6,
      name: "Botanical Garden",
      description: "Nature-inspired fragrances with floral notes",
      image: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "floral"
    },
    {
      id: 7,
      name: "Exclusive Limited Editions",
      description: "Rare and unique compositions for the connoisseur",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "limited"
    },
    {
      id: 8,
      name: "Citrus Awakening",
      description: "Vibrant, energizing scents with zesty citrus notes",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "citrus"
    },
    {
      id: 9,
      name: "Oriental Treasures",
      description: "Rich, spicy fragrances inspired by the exotic East",
      image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "oriental"
    },
    {
      id: 10,
      name: "Aquatic Depths",
      description: "Fresh, marine-inspired scents evoking the ocean",
      image: "https://images.unsplash.com/photo-1520690214124-2405c5217036?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "aquatic"
    },
    {
      id: 11,
      name: "Woody Elegance",
      description: "Sophisticated fragrances with cedarwood and sandalwood",
      image: "https://images.unsplash.com/photo-1598532213005-76f745254959?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "woody"
    },
    {
      id: 12,
      name: "Winter Warmth",
      description: "Cozy, comforting scents for the colder months",
      image: "https://images.unsplash.com/photo-1605265036253-e1e43a1c183a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      category: "seasonal"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'signature', name: 'Signature' },
    { id: 'oud', name: 'Oud' },
    { id: 'floral', name: 'Floral' },
    { id: 'seasonal', name: 'Seasonal' },
    { id: 'noir', name: 'Noir' },
    { id: 'limited', name: 'Limited Edition' },
    { id: 'citrus', name: 'Citrus' },
    { id: 'oriental', name: 'Oriental' },
    { id: 'aquatic', name: 'Aquatic' },
    { id: 'woody', name: 'Woody' }
  ];

  const filteredCollections = activeFilter === 'all' 
    ? collections 
    : collections.filter(collection => collection.category === activeFilter);

  return (
    <div className="pt-20">
      <div className="relative h-[60vh] mb-10">
        <img 
          src="https://images.unsplash.com/photo-1583445095874-174de5855353?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Collections hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-5xl font-serif text-white">Our Collections</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif">Explore Our Collections</h2>
            <button 
              className="md:hidden flex items-center text-gray-700"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filter
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex space-x-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeFilter === category.id 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Mobile Filters */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${
            filtersOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeFilter === category.id 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setFiltersOpen(false);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-6">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-6 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Explore Collection
                  </button>
                </div>
              </div>
              <h2 className="text-2xl font-serif mb-2">{collection.name}</h2>
              <p className="text-gray-600">{collection.description}</p>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCollections.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-serif mb-4">No collections found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;