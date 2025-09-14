"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
}

const FeaturedCategories: React.FC = () => {
  const router = useRouter();

  const categories: CategoryItem[] = [
    {
      id: 'smartphone',
      name: 'Smartphones',
      image: '/images/products/product_1.png',
      description: 'Latest smartphones from top brands',
      productCount: 15
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: '/images/products/product_3.png',
      description: 'Cases, chargers, and more',
      productCount: 25
    },
    {
      id: 'audio',
      name: 'Audio Devices',
      image: '/images/products/product_2.jpg',
      description: 'Headphones, earbuds, speakers',
      productCount: 12
    },
    {
      id: 'tablets',
      name: 'Tablets',
      image: '/images/products/product_4.png',
      description: 'Tablets and e-readers',
      productCount: 8
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/shop?category=${categoryId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
        <Button
          onClick={() => router.push('/shop')}
          variant="outline"
          className="text-shop_light_green border-shop_light_green hover:bg-shop_light_green hover:text-white"
        >
          View All Categories
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-3 aspect-square">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Badge className="bg-shop_light_green text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.productCount} products
                </Badge>
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-shop_light_green transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {category.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
