import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f8f5f1] text-gray-800 py-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-xl mb-4">About Jorycia</h3>
          <p className="text-gray-600 mb-4">
            Crafting luxurious fragrances with the finest ingredients since
            2024.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Collections
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4">Newsletter</h3>
          <p className="text-gray-600 mb-4">
            Subscribe to receive updates and exclusive offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-gray-500"
            />
            <button className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Jorycia. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
