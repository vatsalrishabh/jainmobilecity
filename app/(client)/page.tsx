import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";

import React from "react";

// Mock data for development
const mockCategories = [
  {
    _id: "1",
    title: "Smartphones",
    slug: { current: "smartphones" },
    image: "/images/products/product_1.png",
    productCount: 25
  },
  {
    _id: "2", 
    title: "Laptops",
    slug: { current: "laptops" },
    image: "/images/products/product_2.jpg",
    productCount: 18
  },
  {
    _id: "3",
    title: "Accessories", 
    slug: { current: "accessories" },
    image: "/images/products/product_3.png",
    productCount: 32
  }
];

const Home = async () => {
  // Use mock data instead of Sanity queries
  const categories = mockCategories;

  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <div className="px-4 lg:px-8">
        <ProductGrid />
      </div>
      <HomeCategories categories={categories} />
      <ShopByBrands />
      <LatestBlog />
    </Container>
  );
};

export default Home;
