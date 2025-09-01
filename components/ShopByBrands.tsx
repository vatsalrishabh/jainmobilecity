import React from "react";
import Title from "./Title";
import Image from "next/image";
import Link from "next/link";

// Mock data for development
const mockBrands = [
  {
    _id: "1",
    name: "Apple",
    slug: { current: "apple" },
    image: "/images/brands/brand_1.webp",
    productCount: 15
  },
  {
    _id: "2",
    name: "Samsung",
    slug: { current: "samsung" },
    image: "/images/brands/brand_2.jpg",
    productCount: 12
  },
  {
    _id: "3",
    name: "OnePlus",
    slug: { current: "oneplus" },
    image: "/images/brands/brand_3.png",
    productCount: 8
  },
  {
    _id: "4",
    name: "Xiaomi",
    slug: { current: "xiaomi" },
    image: "/images/brands/brand_4.png",
    productCount: 10
  },
  {
    _id: "5",
    name: "Google",
    slug: { current: "google" },
    image: "/images/brands/brand_5.png",
    productCount: 6
  },
  {
    _id: "6",
    name: "Nothing",
    slug: { current: "nothing" },
    image: "/images/brands/brand_6.png",
    productCount: 4
  }
];

const ShopByBrands = () => {
  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Shop by Brands</Title>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {mockBrands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brand/${brand.slug.current}`}
            className="group"
          >
            <div className="bg-shop_light_bg p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 text-sm">{brand.name}</h3>
                  <p className="text-xs text-gray-500">{brand.productCount} products</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
