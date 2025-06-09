import { MobileMenu } from "./MobileMenu";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, LogIn, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/user.context"; // adjust path as needed
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useUser();

  const transparentRoutes = ["/", "/home", "/collections", "/about"]; // liste des routes autorisant la transparence
  const isTransparentAllowed = transparentRoutes.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSignOut = () => {
    // replace with your auth sign-out logic
    logout();
  };

  return (
    <>
      <nav
        className={`
        fixed w-full z-[100] transition-all duration-300
        ${
          isScrolled || !isTransparentAllowed
            ? "bg-white shadow-sm"
            : "bg-transparent"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-4">
              <Menu
                className={`h-6 w-6 cursor-pointer md:hidden ${
                  isScrolled || !isTransparentAllowed
                    ? "text-gray-800"
                    : "text-white"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <div className="md:hidden absolute left-1/2 top-6 transform -translate-x-1/2">
                <Link to="/">
                  <h1
                    className={`text-xl font-serif tracking-wide ${
                      isScrolled || !isTransparentAllowed
                        ? "text-gray-800"
                        : "text-white"
                    }`}
                  >
                    JORYCIA
                  </h1>
                </Link>
              </div>
            </div>

            <div className="text-center hidden md:block">
              <Link to="/">
                <h1
                  className={`text-3xl font-serif tracking-wide ${
                    isScrolled || !isTransparentAllowed
                      ? "text-gray-800"
                      : "text-white"
                  }`}
                >
                  JORYCIA
                </h1>
              </Link>
            </div>

            <div className="hidden md:flex gap-6 text-sm font-medium">
              <Link
                to="/"
                className={`${
                  isScrolled || !isTransparentAllowed
                    ? "text-gray-800"
                    : "text-white"
                } hover:underline transition`}
              >
                Home
              </Link>
              <Link
                to="/collections"
                className={`${
                  isScrolled || !isTransparentAllowed
                    ? "text-gray-800"
                    : "text-white"
                } hover:underline transition`}
              >
                Collections
              </Link>
              <Link
                to="/about"
                className={`${
                  isScrolled || !isTransparentAllowed
                    ? "text-gray-800"
                    : "text-white"
                } hover:underline transition`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`${
                  isScrolled || !isTransparentAllowed
                    ? "text-gray-800"
                    : "text-white"
                } hover:underline transition`}
              >
                Contact
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className={`${
                    isScrolled || !isTransparentAllowed
                      ? "text-gray-800"
                      : "text-white"
                  } hover:underline transition`}
                >
                  Admin
                </Link>
              )}
            </div>

            <div className="flex items-center gap-6">
              {user && user != null ? (
                <div className="hidden md:flex lg:flex">
                  <User
                    className={`h-6 w-6 cursor-pointer ${
                      isScrolled || !isTransparentAllowed
                        ? "text-gray-800"
                        : "text-white"
                    }`}
                    onMouseEnter={() => setIsAccountOpen(true)}
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                  />
                  {isAccountOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-50"
                      onMouseLeave={() => setIsAccountOpen(false)}
                    >
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm text-gray-600">
                          Welcome back, {user.firstName}
                        </p>
                        <button
                          onClick={handleSignOut}
                          className="mt-1 text-sm text-blue-600 hover:underline"
                        >
                          Sign Out
                        </button>
                      </div>
                      <ul className="py-1 text-sm text-gray-700">
                        <Link to="/orders">
                          <li className="px-4 py-2 hover:bg-gray-100">
                            My Orders
                          </li>
                        </Link>
                        <Link to="/">
                          <li className="px-4 py-2 hover:bg-gray-100">
                            Account
                          </li>
                        </Link>

                        <li className="px-4 py-2 hover:bg-gray-100">Payment</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link className="lg:flex hidden" to="/login">
                  <LogIn
                    className={`h-6 w-6 cursor-pointer ${
                      isScrolled || !isTransparentAllowed
                        ? "text-gray-800"
                        : "text-white"
                    }`}
                  />
                </Link>
              )}
              <Link className="hidden lg:flex" to="/cart">
                <ShoppingBag
                  className={`h-6 w-6 cursor-pointer ${
                    isScrolled || !isTransparentAllowed
                      ? "text-gray-800"
                      : "text-white"
                  }`}
                />
              </Link>
              <LanguageSwitcher isScrolled={isScrolled} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Positioned relative to viewport */}
      <MobileMenu
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        isTransparentAllowed={isTransparentAllowed}
        user={user}
      />
    </>
  );
};

export default Navbar;
