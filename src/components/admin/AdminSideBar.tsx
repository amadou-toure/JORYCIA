import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid, Users, ShoppingCart, Server, Menu, X } from "lucide-react";
import {
  IconButton,
  Button,
  Drawer,
  Typography,
  button,
} from "@material-tailwind/react";

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
    <div>
      {/* Mobile menu button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-blue-600 p-3 rounded-full shadow-lg text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="p-4 bg-[#f8f5f1] rounder-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <Grid className="w-5 h-5" />
          <Typography variant="h5" color="blue-gray">
            Menu
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="flex flex-col items-start justify-between pt-[25%] gap-2">
          <Typography variant="h5" color="blue-gray">
            Management
          </Typography>
          <div className="space-y-1 flex flex-col w-full">
            <Link
              to="/admin/product"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-black hover:bg-white"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Products</span>
            </Link>
            <Link
              to="/admin/user"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-black hover:bg-white"
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-black hover:bg-white"
            >
              <Server className="w-5 h-5" />
              <span>Orders</span>
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
