import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "../models/User.model";

export const MobileMenu = ({
  isScrolled,
  isMenuOpen,
  isTransparentAllowed,
  user,
}: {
  user: User | null;
  isTransparentAllowed: boolean;
  isMenuOpen: boolean;
  isScrolled: boolean;
}) => (
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
      {user && user != null ? null : (
        <Link
          to="/login"
          className={` block px-8 py-2 border-b ${
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
);
