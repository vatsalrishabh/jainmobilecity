import { NextResponse } from "next/server";
import { Product } from "@/sanity.types"; // or define a sample type here

const allProducts: Product[] = [
  {
    _id: "1",
    name: "iPhone 14",
    price: 79999,
    description: "Apple iPhone 14 with A15 Bionic chip",
    image: "/iphone14.jpg",
    slug: { current: "iphone-14" },
    variant: "mobile",
    categories: ["Smartphones"],
  },
  {
    _id: "2",
    name: "Samsung Galaxy S22",
    price: 74999,
    description: "Samsung flagship phone",
    image: "/galaxy-s22.jpg",
    slug: { current: "samsung-galaxy-s22" },
    variant: "mobile",
    categories: ["Smartphones"],
  },
  {
    _id: "3",
    name: "Dell Inspiron 15",
    price: 55000,
    description: "Dell laptop for professionals",
    image: "/dell.jpg",
    slug: { current: "dell-inspiron" },
    variant: "laptop",
    categories: ["Computers"],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const variant = searchParams.get("variant");

  const filteredProducts = variant
    ? allProducts.filter((p) => p.variant.toLowerCase() === variant.toLowerCase())
    : allProducts;

  return NextResponse.json(filteredProducts);
}
