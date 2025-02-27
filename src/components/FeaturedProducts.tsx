import React from 'react';
import { Star } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      name: "Midnight Rose",
      description: "A seductive blend of Bulgarian rose and midnight jasmine",
      price: "$185",
      image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Ocean Mist",
      description: "Fresh marine accord with hints of citrus and amber",
      price: "$165",
      image: "https://www.sephora.com/productimages/sku/s2546281-main-zoom.jpg?imwidth=1224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Golden Oud",
      description: "Rich blend of rare oud wood and golden amber",
      price: "$225",
      image: "https://i.etsystatic.com/22726893/r/il/49061e/5457830765/il_fullxfull.5457830765_ndfq.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-16">Bestsellers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-serif mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-medium">{product.price}</p>
                <div className="flex justify-center mt-2">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;