import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X,LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`
        fixed w-full z-[100] transition-all duration-300
        ${isScrolled 
          ? 'bg-white shadow-sm' 
          : 'bg-transparent'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-4">
              <Menu
                className={`h-6 w-6 cursor-pointer md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <div className="md:hidden absolute left-1/2 top-6 transform -translate-x-1/2">
                <Link to="/">
                  <h1 className={`text-xl font-serif tracking-wide ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                    JORYCIA
                  </h1>
                </Link>
              </div>
              <Search
                className={`h-6 w-6 cursor-pointer ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                onClick={() => setIsSearchOpen(true)}
              />
              <X
                className={`h-6 w-6 cursor-pointer md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              />
              <div className={`
                relative
                transition-all
                duration-300
                ease-in-out
                overflow-hidden
                ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}
              `}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full h-8 pl-4 pr-8 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-400"
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            </div>

            <div className="text-center hidden md:block">
              <Link to="/">
                <h1 className={`text-3xl font-serif tracking-wide ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                  JORYCIA
                </h1>
              </Link>
            </div>

            <div className="hidden md:flex gap-6 text-sm font-medium">
              <Link to="/" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:underline transition`}>Home</Link>
              <Link to="/collections" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:underline transition`}>Collections</Link>
              <Link to="/about" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:underline transition`}>About Us</Link>
              <Link to="/contact" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:underline transition`}>Contact</Link>
            </div>

            <div className="flex items-center gap-6">
              <Link to="/cart">
                <ShoppingBag className={`h-6 w-6 cursor-pointer ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
              </Link>
              <Link to="/LogIn">
                <LogIn className={`h-6 w-6 cursor-pointer ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Positioned relative to viewport */}
      <div
        className={`
          fixed top-20 left-0 w-full transform transition-all duration-300 ease-in-out z-[90]
          ${isScrolled ? 'bg-white shadow-lg' : 'bg-black/50 backdrop-blur-md'}
          ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
        `}
      >
        <div className="py-6 space-y-4 text-lg font-medium">
          <Link
            to="/"
            className={`block px-8 py-2 border-b ${isScrolled 
              ? 'text-gray-800 border-gray-200 hover:bg-gray-50' 
              : 'text-white border-white/10 hover:bg-white/10'
            }`}
          >
            Home
          </Link>
          <Link
            to="/collections"
            className={`block px-8 py-2 border-b ${isScrolled 
              ? 'text-gray-800 border-gray-200 hover:bg-gray-50' 
              : 'text-white border-white/10 hover:bg-white/10'
            }`}
          >
            Collections
          </Link>
          <Link
            to="/about"
            className={`block px-8 py-2 border-b ${isScrolled 
              ? 'text-gray-800 border-gray-200 hover:bg-gray-50' 
              : 'text-white border-white/10 hover:bg-white/10'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`block px-8 py-2 border-b ${isScrolled 
              ? 'text-gray-800 border-gray-200 hover:bg-gray-50' 
              : 'text-white border-white/10 hover:bg-white/10'
            }`}
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className={`block px-8 py-2 border-b ${isScrolled 
              ? 'text-gray-800 border-gray-200 hover:bg-gray-50' 
              : 'text-white border-white/10 hover:bg-white/10'
            }`}
          >
            Cart
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;