import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Users,
  UserPlus,
  ShoppingCart,
  Server,
  Menu,
  X,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const navItem = (to: string, icon: React.ReactNode, label: string) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          active ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 m-2 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] text-white transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 flex flex-col h-full`}
      >
        {/* Close button on mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold">Menu</h2>
          {navItem("/dashboard", <Grid className="w-5 h-5" />, "Dashboard")}
        </div>
        <nav className="px-6 mt-6">
          <h3 className="uppercase text-xs font-semibold opacity-70 mb-2">
            Management
          </h3>
          <div className="space-y-1">
            {navItem(
              "/admin/product/new",
              <ShoppingCart className="w-5 h-5" />,
              "Products"
            )}
            {navItem("/admin/users", <Users className="w-5 h-5" />, "Users")}
            {navItem(
              "/admin/admins",
              <UserPlus className="w-5 h-5" />,
              "Admins"
            )}
            {navItem("/admin/orders", <Server className="w-5 h-5" />, "Orders")}
          </div>
        </nav>
      </aside>
    </>
  );
};
