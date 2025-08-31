"use client";

import React from "react";
import { Home, ShoppingBag, User } from "lucide-react";

interface Props {
  changeRightComponent: (key: string) => void;
}

const BottomNavbar: React.FC<Props> = ({ changeRightComponent }) => {
  const navItems = [
    { title: "Products", key: "crudOperation", icon: <ShoppingBag /> },
    { title: "Sales", key: "allSales", icon: <Home /> },
    { title: "Users", key: "allUser", icon: <User /> },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden bg-white shadow-lg border rounded-full px-6 py-3 z-50 space-x-6 flex">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => changeRightComponent(item.key)}
          className="flex flex-col items-center text-darkColor hover:text-shop_light_green transition-all"
        >
          {item.icon}
          <span className="text-xs mt-1">{item.title}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavbar;
