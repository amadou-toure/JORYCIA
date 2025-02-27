import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
  image: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Jorycia's Midnight Rose has become my signature scent. The complexity and longevity are unmatched by any other perfume I've tried. I receive compliments everywhere I go.",
      author: "Sophia Anderson",
      location: "New York",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      text: "The Ocean Mist fragrance transports me to the Mediterranean coast every time I wear it. The attention to detail in these perfumes is remarkable. Worth every penny.",
      author: "James Wilson",
      location: "London",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      text: "As a perfume collector, I can confidently say that Jorycia stands out for their exceptional quality and unique compositions. Golden Oud is a masterpiece.",
      author: "Elena Rodriguez",
      location: "Paris",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-6">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why our customers choose Jorycia for their most precious moments.
          </p>
        </div>

        <div className="relative">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-[#f8f5f1] p-8 rounded-lg relative">
                  <Quote className="w-10 h-10 text-gray-300 absolute -top-5 -left-5" />
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.author}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - Carousel */}
          <div className="md:hidden">
            <div className="bg-[#f8f5f1] p-8 rounded-lg relative">
              <Quote className="w-10 h-10 text-gray-300 absolute -top-5 -left-5" />
              <p className="text-gray-700 mb-6 italic">"{testimonials[currentIndex].text}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonials[currentIndex].author}</h4>
                  <p className="text-gray-500 text-sm">{testimonials[currentIndex].location}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => (
                  <span 
                    key={index} 
                    className={`block w-2 h-2 rounded-full ${
                      index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;