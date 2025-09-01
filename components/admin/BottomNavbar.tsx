"use client";

import React, { useState } from "react";
import { 
  Home, 
  Package, 
  TrendingUp, 
  Users, 
  BarChart, 
  Settings 
} from "lucide-react";

interface Props {
  changeRightComponent: (key: string) => void;
}

const BottomNavbar: React.FC<Props> = ({ changeRightComponent }) => {
  const [activeTab, setActiveTab] = useState("crudOperation");

  const navItems = [
    { title: "Dashboard", key: "dashboard", icon: <Home size={20} /> },
    { title: "Products", key: "crudOperation", icon: <Package size={20} /> },
    { title: "Sales", key: "allSales", icon: <TrendingUp size={20} /> },
    { title: "Users", key: "allUser", icon: <Users size={20} /> },
    { title: "Analytics", key: "analytics", icon: <BarChart size={20} /> },
    { title: "Settings", key: "settings", icon: <Settings size={20} /> },
  ];

  const handleNavClick = (key: string) => {
    setActiveTab(key);
    changeRightComponent(key);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50">
      <div className="bg-white shadow-2xl border border-gray-200 rounded-full px-4 py-3 flex items-center space-x-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.key)}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 min-w-[60px] ${
              activeTab === item.key
                ? "text-blue-600 bg-blue-50 scale-110"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            <div className={`transition-all duration-200 ${
              activeTab === item.key ? "scale-110" : "scale-100"
            }`}>
              {item.icon}
            </div>
            <span className={`text-xs mt-1 font-medium transition-all duration-200 ${
              activeTab === item.key ? "text-blue-600" : "text-gray-500"
            }`}>
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
