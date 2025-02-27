import React from 'react';
import { Star } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="pt-20">
      <div className="relative h-[60vh] mb-20">
        <img 
          src="https://images.unsplash.com/photo-1583445013874-d597973a3636?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="About Us hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-5xl font-serif text-white">Our Story</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-serif mb-6">Crafting Memories Since 1995</h2>
            <p className="text-gray-600 mb-6">
              Founded in 1995, Jorycia has been at the forefront of luxury perfumery, 
              creating exceptional fragrances that capture the essence of sophistication 
              and elegance. Our journey began with a simple vision: to craft scents that 
              tell stories and create lasting memories.
            </p>
            <p className="text-gray-600">
              Today, we continue to source the finest ingredients from around the world, 
              working with master perfumers to create unique compositions that reflect 
              our commitment to excellence and artistry.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1583445095876-b4d8a012a1ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
              alt="Perfume crafting"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="text-center py-20 bg-gray-50">
          <h3 className="text-3xl font-serif mb-8">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-xl font-serif mb-4">Artistry</h4>
              <p className="text-gray-600">
                Every fragrance is a work of art, carefully composed to create a unique olfactory experience.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-serif mb-4">Sustainability</h4>
              <p className="text-gray-600">
                We are committed to sustainable practices in sourcing and production.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-serif mb-4">Excellence</h4>
              <p className="text-gray-600">
                We maintain the highest standards in every aspect of our craft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;