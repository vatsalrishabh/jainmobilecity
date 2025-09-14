"use client";

import React from "react";
import { Package, Users, TrendingUp, Star } from "lucide-react";

interface ShopStatsProps {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  className?: string;
}

const ShopStats: React.FC<ShopStatsProps> = ({
  totalProducts,
  totalCategories,
  totalBrands,
  className = ""
}) => {
  const stats = [
    {
      icon: Package,
      label: "Total Products",
      value: totalProducts,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: TrendingUp,
      label: "Categories",
      value: totalCategories,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Users,
      label: "Brands",
      value: totalBrands,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Star,
      label: "Happy Customers",
      value: "1000+",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shop Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-shop_light_green to-shop_dark_green rounded-lg text-white text-center">
        <p className="text-sm font-medium">
          🏪 Serving the best mobile products in Raebareli, Uttar Pradesh
        </p>
      </div>
    </div>
  );
};

export default ShopStats;
