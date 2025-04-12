import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import {useProduct} from "../data/contexts/Product.context.tsx";
import {Product_card} from "../components/Card.tsx";
//import {Product_card} from "../components/Card.tsx";



const Collections = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const {Products} = useProduct();

   const Notes = [
    { id: "1", name: "Fleur d'orange"},
    { id: "2", name: "Jasmin sambac"},
    { id: "3", name: "Iris Vanille"},
    { id: "4", name: "Musc"},
    { id: "5", name: "Bois de santal"},
    { id: "6", name: "Ambre"}
  ];
 const filteredProductss =
    activeFilter === "all"
      ? Products
      : Products.filter(
          (item) => item.Notes.includes(activeFilter)
        );

  return (
    <div>
      <div className="relative h-[60vh] mb-10">
        <img
          src="https://daralteeb.com.kw/wp-content/uploads/2020/11/Hero-simple.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
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
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform ${
                  filtersOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex space-x-4 overflow-x-auto pb-2">
            {Notes.map((item) => (
              <button
                key={item.id}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeFilter === item.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveFilter(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Filters */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              filtersOpen ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-2">
              {Notes.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeFilter === category.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          {filteredProductss.map((collection) => (
            <Product_card product={collection} key={collection.Id} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredProductss.length === 0 && (
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
