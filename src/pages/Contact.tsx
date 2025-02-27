import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-20">
      <div className="relative h-[60vh] mb-20">
        <img 
          src="https://images.unsplash.com/photo-1583445013765-cc6d9b604d6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Contact hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-5xl font-serif text-white">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-serif mb-8">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-serif mb-6">Visit Our Boutique</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-600 mr-3" />
                  <p className="text-gray-600">123 Luxury Lane, Beverly Hills, CA 90210</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-600 mr-3" />
                  <p className="text-gray-600">+1 (310) 555-0123</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-600 mr-3" />
                  <p className="text-gray-600">contact@jorycia.com</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif mb-6">Opening Hours</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Monday - Friday: 10:00 AM - 8:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sunday: 12:00 PM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;