"use client";

import React, { useState } from "react";
import { 
  Home, 
  Package, 
  TrendingUp, 
  Users, 
  BarChart, 
  Settings,
  LogOut,
  Store,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  changeRightComponent: (key: string) => void;
}

const SideNavbar: React.FC<Props> = ({ changeRightComponent }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("crudOperation");

  const navItems = [
    { 
      title: "Dashboard", 
      key: "dashboard", 
      icon: <Home size={20} />,
      description: "Overview & Analytics"
    },
    { 
      title: "Products", 
      key: "crudOperation", 
      icon: <Package size={20} />,
      description: "Manage Products"
    },
    { 
      title: "Sales", 
      key: "allSales", 
      icon: <TrendingUp size={20} />,
      description: "Orders & Revenue"
    },
    { 
      title: "Users", 
      key: "allUser", 
      icon: <Users size={20} />,
      description: "Customer Management"
    },
    { 
      title: "Analytics", 
      key: "analytics", 
      icon: <BarChart size={20} />,
      description: "Reports & Insights"
    },
    { 
      title: "Settings", 
      key: "settings", 
      icon: <Settings size={20} />,
      description: "System Configuration"
    },
  ];

  const handleNavClick = (key: string) => {
    setActiveTab(key);
    changeRightComponent(key);
    setOpen(false);
  };

  return (
    <div className="lg:block md:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 p-3 bg-white rounded-full shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {open ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-white to-gray-50 z-40 shadow-2xl transition-transform duration-300 ease-in-out border-r border-gray-200",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Store size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
              <p className="text-sm text-gray-500">Jain Mobile City</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={cn(
                "flex items-start gap-4 px-4 py-4 rounded-xl transition-all duration-200 text-left group relative overflow-hidden",
                activeTab === item.key
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
              )}
            >
              {/* Active indicator */}
              {activeTab === item.key && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
              )}
              
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                activeTab === item.key
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
              )}>
                {item.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "font-semibold transition-colors duration-200",
                  activeTab === item.key ? "text-white" : "text-gray-800"
                )}>
                  {item.title}
                </div>
                <div className={cn(
                  "text-xs transition-colors duration-200 mt-1",
                  activeTab === item.key ? "text-blue-100" : "text-gray-500"
                )}>
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
              <LogOut size={18} />
            </div>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default SideNavbar;
