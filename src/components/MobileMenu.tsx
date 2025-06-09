import {
  ListOrdered,
  LogIn,
  LogOut,
  ShoppingBag,
  User as UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "../models/User.model";
import { useUser } from "../contexts/user.context";

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
}) => {
  type pageType = {
    label: string;
    link: string;
  };
  const Pages: pageType[] = [
    { label: "Home", link: "/" },
    { label: "Collections", link: "collections" },
    { label: "About Us", link: "about" },
    { label: "Contact", link: "contact" },
  ];
  const { logout } = useUser();
  return (
    <div
      className={`

         pt-[20%] fixed top-20 left-0 w-full transform transition-all duration-300 ease-in-out z-[90]
          ${isScrolled ? "bg-white shadow-lg" : "bg-black/50 backdrop-blur-md"}
          ${
            isMenuOpen
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-full opacity-0 invisible"
          }
        `}
    >
      <div className=" flex flex-col items-center justify-center gap-6 text-lg font-medium">
        {Pages.map((item) => (
          <Link
            to={item.link}
            className={`flex flex-row items-center justify-center cursor-pointer ${
              isScrolled || !isTransparentAllowed
                ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                : "text-white border-white/10 hover:bg-white/10"
            }`}
          >
            {item.label}
          </Link>
        ))}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className={`flex flex-row items-center justify-center px-8 py-2 border-b w-full ${
              isScrolled || !isTransparentAllowed
                ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                : "text-white border-white/10 hover:bg-white/10"
            }`}
          >
            Admin
          </Link>
        )}
      </div>
      <div>
        {user && user != null ? (
          <>
            <Link
              to="#"
              onClick={logout}
              className={` block px-8 py-2 border-b ${
                isScrolled || !isTransparentAllowed
                  ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                  : "text-white border-white/10 hover:bg-white/10"
              }`}
            >
              <LogOut className="h-6 w-6 mr-2 inline" />
              Log Out
            </Link>
            <Link
              to="/login"
              className={` block px-8 py-2 border-b ${
                isScrolled || !isTransparentAllowed
                  ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                  : "text-white border-white/10 hover:bg-white/10"
              }`}
            >
              <UserIcon className="h-6 w-6 mr-2 inline" />
              Account
            </Link>
            <Link
              to="/orders"
              className={` block px-8 py-2 border-b ${
                isScrolled || !isTransparentAllowed
                  ? "text-gray-800 border-gray-200 hover:bg-gray-50"
                  : "text-white border-white/10 hover:bg-white/10"
              }`}
            >
              <ListOrdered className="h-6 w-6 mr-2 inline" />
              Orders
            </Link>
          </>
        ) : (
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
          className={` block px-8 py-2 border-b ${
            isScrolled || !isTransparentAllowed
              ? "text-gray-800 border-gray-200 hover:bg-gray-50"
              : "text-white border-white/10 hover:bg-white/10"
          }`}
        >
          <ShoppingBag className="h-6 w-6 mr-2 inline" />
          Cart
        </Link>
      </div>
    </div>
  );
};
