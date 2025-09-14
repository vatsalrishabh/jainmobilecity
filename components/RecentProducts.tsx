"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

interface Product {
  _id: string;
  id: string;
  name: string;
  brand: string;
  category: string;
  sellingPrice: number;
  costPrice?: number;
  discountPercentage: number;
  imageUrls: string[];
  stock: number;
  specifications?: {
    ram?: string;
    storage?: string;
    processor?: string;
    battery?: string;
    display?: string;
    camera?: string;
    os?: string;
  };
  createdAt: string;
}

const RecentProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRecentProducts();
  }, []);

  const fetchRecentProducts = async () => {
    try {
      const response = await fetch('/api/shop?sort=createdAt&order=desc&limit=8', {
        cache: 'no-store'
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching recent products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4">
                <div className="h-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-shop_light_green" />
          <h2 className="text-2xl font-bold text-gray-800">Recently Added</h2>
          <Badge className="bg-shop_light_green hover:bg-shop_dark_green">
            New Arrivals
          </Badge>
        </div>
        <Button
          onClick={() => router.push('/shop?sort=createdAt&order=desc')}
          variant="outline"
          className="text-shop_light_green border-shop_light_green hover:bg-shop_light_green hover:text-white"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <div key={product._id} className="relative">
            {/* New badge */}
            <div className="absolute -top-2 -right-2 z-10">
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                NEW
              </Badge>
            </div>
            <ProductCard
              product={product}
              className="hover:shadow-lg transition-shadow duration-300"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-4">
          Discover the latest additions to our collection
        </p>
        <Button
          onClick={() => router.push('/shop?sort=createdAt&order=desc')}
          className="bg-shop_light_green hover:bg-shop_dark_green"
        >
          Explore New Products
        </Button>
      </div>
    </div>
  );
};

export default RecentProducts;
