"use client";

import React, { useState } from "react";
import { Home, ShoppingBag, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  changeRightComponent: (key: string) => void;
}

const SideNavbar: React.FC<Props> = ({ changeRightComponent }) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { title: "Products", key: "crudOperation", icon: <ShoppingBag /> },
    { title: "Sales", key: "allSales", icon: <Home /> },
    { title: "Users", key: "allUser", icon: <User /> },
  ];

  return (
    <div className="lg:block md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg border hover:shadow-xl transition-all"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white z-40 shadow-lg transition-transform duration-300 ease-in-out border-r",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-darkColor">Admin Menu</h2>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                changeRightComponent(item.key);
                setOpen(false);
              }}
              className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-shop_light_green/10 hover:text-shop_light_green transition-all font-medium text-darkColor"
            >
              {item.icon}
              {item.title}
            </button>
          ))}
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default SideNavbar;
