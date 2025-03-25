import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
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
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Menu 
                className={`h-6 w-6 mr-4 cursor-pointer ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <div className="relative flex items-center">
                {isSearchOpen ? (
                  <X 
                    className={`h-6 w-6 cursor-pointer ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                    onClick={() => setIsSearchOpen(false)}
                  />
                ) : (
                  <Search 
                    className={`h-6 w-6 cursor-pointer ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                    onClick={() => setIsSearchOpen(true)}
                  />
                )}
                <div className={`
                  absolute 
                  left-8 
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
            </div>
            
            <div className="text-center">
              <Link to="/">
                <h1 className={`text-3xl font-serif ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                  JORYCIA
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center">
              <Link to="/cart">
                <ShoppingBag className={`h-6 w-6 cursor-pointer ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
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
        <div className="py-4">
          <Link 
            to="/" 
            className={`block px-8 py-3 ${isScrolled 
              ? 'text-gray-800 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/collections" 
            className={`block px-8 py-3 ${isScrolled 
              ? 'text-gray-800 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
            }`}
          >
            Collections
          </Link>
          <Link 
            to="/about" 
            className={`block px-8 py-3 ${isScrolled 
              ? 'text-gray-800 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
            }`}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={`block px-8 py-3 ${isScrolled 
              ? 'text-gray-800 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
            }`}
          >
            Contact
          </Link>
          <Link 
            to="/cart" 
            className={`block px-8 py-3 ${isScrolled 
              ? 'text-gray-800 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
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