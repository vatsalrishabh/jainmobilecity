"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Timer, TrendingUp, ArrowRight } from "lucide-react";

interface HotDeal {
  id: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  image: string;
  timeLeft?: string;
  badge?: string;
  stock?: number;
  brand?: string;
  category?: string;
}

interface HotDealsSectionProps {
  className?: string;
}

const HotDealsSection: React.FC<HotDealsSectionProps> = ({ className = "" }) => {
  const [deals, setDeals] = useState<HotDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchHotDeals();
  }, []);

  const fetchHotDeals = async () => {
    try {
      const response = await fetch('/api/deals', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setDeals(data.flashDeals || []);
      }
    } catch (error) {
      console.error('Error fetching hot deals:', error);
      // Fallback deals
      setDeals([
        {
          id: "1",
          title: "iPhone 15 Pro Max",
          originalPrice: 150000,
          discountPrice: 129999,
          discountPercentage: 13,
          image: "/images/products/product_2.jpg",
          timeLeft: "02:15:30",
          badge: "🔥 FLASH DEAL",
          stock: 15,
          brand: "Apple",
          category: "Smartphone"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleBuyNow = (productId: string) => {
    router.push(`/checkout/${productId}`);
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4">
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

  if (deals.length === 0) return null;

  return (
    <div className={`bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-800">Hot Deals</h2>
          <Badge className="bg-red-500 hover:bg-red-600">
            🔥 Limited Time
          </Badge>
        </div>
        <Button
          onClick={() => router.push('/deal')}
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          View All Deals
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deals.slice(0, 3).map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden"
            onClick={() => handleProductClick(deal.id)}
          >
            <div className="relative">
              {deal.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                    {deal.badge}
                  </Badge>
                </div>
              )}
              {deal.discountPercentage > 0 && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white">
                    -{deal.discountPercentage}%
                  </Badge>
                </div>
              )}

              <Image
                src={deal.image}
                alt={deal.title}
                width={300}
                height={200}
                className="w-full h-32 object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {deal.title}
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-green-600">
                  ₹{deal.discountPrice.toLocaleString()}
                </span>
                {deal.originalPrice > deal.discountPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{deal.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {deal.timeLeft && (
                <div className="flex items-center gap-2 mb-3">
                  <Timer className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">
                    {deal.timeLeft} left
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow(deal.id);
                  }}
                  size="sm"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  Buy Now
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(deal.id);
                  }}
                  size="sm"
                  variant="outline"
                >
                  View
                </Button>
              </div>

              {deal.stock && deal.stock < 10 && (
                <p className="text-xs text-orange-600 mt-2">
                  Only {deal.stock} left in stock!
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotDealsSection;
