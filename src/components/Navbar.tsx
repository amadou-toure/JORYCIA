import { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X, LogIn, User } from "lucide-react";
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
                <div className="relative">
                  <User
                    className={`h-6 w-6 cursor-pointer ${
                      isScrolled || !isTransparentAllowed
                        ? "text-gray-800"
                        : "text-white"
                    }`}
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                  />
                  {isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-50">
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
                <Link to="/login">
                  <LogIn
                    className={`h-6 w-6 cursor-pointer ${
                      isScrolled || !isTransparentAllowed
                        ? "text-gray-800"
                        : "text-white"
                    }`}
                  />
                </Link>
              )}
              <Link to="/cart">
                <ShoppingBag
                  className={`h-6 w-6 cursor-pointer ${
                    isScrolled || !isTransparentAllowed
                      ? "text-gray-800"
                      : "text-white"
                  }`}
                />
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Positioned relative to viewport */}
      <div
        className={`
          fixed top-20 left-0 w-full transform transition-all duration-300 ease-in-out z-[90]
          ${isScrolled ? "bg-white shadow-lg" : "bg-black/50 backdrop-blur-md"}
          ${
            isMenuOpen
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-full opacity-0 invisible"
          }
        `}
      >
        <div className="py-6 space-y-4 text-lg font-medium">
          <Link
            to="/"
            className={`block px-8 py-2 border-b ${
              isScrolled || !isTransparentAllowed
                ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                : "text-white border-white/10 hover:bg-white/10"
            }`}
          >
            Home
          </Link>
          <Link
            to="/collections"
            className={`block px-8 py-2 border-b ${
              isScrolled || !isTransparentAllowed
                ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                : "text-white border-white/10 hover:bg-white/10"
            }`}
          >
            Collections
          </Link>
          <Link
            to="/about"
            className={`block px-8 py-2 border-b ${
              isScrolled || !isTransparentAllowed
                ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                : "text-white border-white/10 hover:bg-white/10"
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`block px-8 py-2 border-b ${
              isScrolled || !isTransparentAllowed
                ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                : "text-white border-white/10 hover:bg-white/10"
            }`}
          >
            Contact
          </Link>
          {user && user != null ? (
            <div className="relative">
              <div
                className={`flex items-center px-8 py-2 border-b cursor-pointer ${
                  isScrolled || !isTransparentAllowed
                    ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                    : "text-white border-white/10 hover:bg-white/10"
                }`}
                onClick={() => setIsAccountOpen(!isAccountOpen)}
              >
                <User className="h-6 w-6 mr-2" />
                Account
              </div>
              {isAccountOpen && (
                <div className="absolute left-8 right-8 mt-2 w-[calc(100%-4rem)] bg-white shadow-lg rounded-lg overflow-hidden z-50">
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
                    <li className="px-4 py-2 hover:bg-gray-100">My Orders</li>
                    {/* <li className="px-4 py-2 hover:bg-gray-100">My Coins</li> */}
                    {/* <li className="px-4 py-2 hover:bg-gray-100">Message Center({user.messagesCount})</li> */}
                    <li className="px-4 py-2 hover:bg-gray-100">Payment</li>
                    {/* <li className="px-4 py-2 hover:bg-gray-100">Wish List</li> */}
                    {/* <li className="px-4 py-2 hover:bg-gray-100">My Coupons</li> */}
                  </ul>
                  <div className="border-t">
                    <ul className="py-1 text-sm text-gray-600">
                      {/* <li className="px-4 py-2 hover:bg-gray-100">Settings</li> */}
                      {/* <li className="px-4 py-2 hover:bg-gray-100">AliExpress Business</li> */}
                      {/* <li className="px-4 py-2 hover:bg-gray-100">DS Center</li> */}
                      {/* <li className="px-4 py-2 hover:bg-gray-100">Seller Log In</li> */}
                      {/* <li className="px-4 py-2 hover:bg-gray-100">Return &amp; refund policy</li> */}
                      {/* <li className="px-4 py-2 hover:bg-gray-100">Help Center</li> */}
                      {/* <li className="px-4 py-2 hover:bg-gray-100">Disputes &amp; Reports</li> */}
                      {/* <li className="px-4 py-2 hover:bg-gray-100">Report IPR infringement</li> */}
                      {/* <li className="px-4 py-2 hover:bg-gray-100">Accessibility</li> */}
                      {/* <li className="px-4 py-2 hover:bg-gray-100">Penalties information</li> */}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`block px-8 py-2 border-b ${
                isScrolled || !isTransparentAllowed
                  ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                  : "text-white border-white/10 hover:bg-white/10"
              }`}
            >
              <LogIn className="h-6 w-6 mr-2 inline" />
              Log In
            </Link>
          )}
          <Link
            to="/cart"
            className={`block px-8 py-2 border-b ${
              isScrolled || !isTransparentAllowed
                ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                : "text-white border-white/10 hover:bg-white/10"
            }`}
          >
            Cart
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={`block px-8 py-2 border-b ${
                isScrolled || !isTransparentAllowed
                  ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                  : "text-white border-white/10 hover:bg-white/10"
              }`}
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
