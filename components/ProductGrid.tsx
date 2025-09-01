"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Title from "./Title";
import { Product } from "@/types/product";

// Mock data for development
const mockProducts: Product[] = [
  {
    _id: "1",
    name: "iPhone 15 Pro",
    brand: "Apple",
    sellingPrice: 89999,
    costPrice: 75000,
    stock: 25,
    imageUrls: ["/images/products/product_1.png"],
    specifications: {
      ram: "8GB",
      storage: "256GB"
    }
  },
  {
    _id: "2",
    name: "Samsung Galaxy S24",
    brand: "Samsung", 
    sellingPrice: 79999,
    costPrice: 68000,
    stock: 30,
    imageUrls: ["/images/products/product_2.jpg"],
    specifications: {
      ram: "12GB",
      storage: "128GB"
    }
  },
  {
    _id: "3",
    name: "OnePlus 12",
    brand: "OnePlus",
    sellingPrice: 59999,
    costPrice: 52000,
    stock: 20,
    imageUrls: ["/images/products/product_3.png"],
    specifications: {
      ram: "16GB",
      storage: "256GB"
    }
  },
  {
    _id: "4",
    name: "Xiaomi 14",
    brand: "Xiaomi",
    sellingPrice: 49999,
    costPrice: 42000,
    stock: 35,
    imageUrls: ["/images/products/product_4.png"],
    specifications: {
      ram: "8GB",
      storage: "128GB"
    }
  }
];

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Featured Products</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
