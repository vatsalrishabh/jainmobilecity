import React from "react";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import { Product } from "@/types/product";
import BuyNowButton from "@/components/BuyNowButton";

const SingleProductPage = () => {
  // Mock product with full details
  const product: Product = {
    _id: "1",
    name: "iPhone 15 Pro",
    brand: "Apple",
    sellingPrice: 89999,
    costPrice: 75000,
    stock: 25,
    imageUrls: ["/images/products/product_1.png"],
    specifications: {
      ram: "8GB",
      storage: "256GB",
      processor: "A17 Pro Chip, 6-core CPU",
      battery: "3,650mAh with 30W fast charging",
      display: "6.1-inch Super Retina XDR OLED, 120Hz",
      camera: "48MP + 12MP + 12MP Triple Camera, 12MP Front",
      os: "iOS 17",
    },
    // Add MRP for discount calculation
    mrp: 99999,
  };

  // Calculate discount safely
  const discount =
    product?.mrp && product.mrp > product.sellingPrice
      ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      {/* Left: Product Image */}
      <div className="relative w-full aspect-square bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group">
        <Image
          src={product.imageUrls?.[0] || "/images/products/product_1.png"}
          alt={product.name}
          fill
          style={{ objectFit: "contain" }}
          className="transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favorite Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton productId={product._id} isInsideLink />
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="flex flex-col gap-6">
        {/* Brand + Name */}
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.brand}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        </div>

        {/* Price + Discount */}
        <div className="flex items-center gap-3">
          <p className="text-3xl font-bold text-green-600">
            ₹{product.sellingPrice.toLocaleString()}
          </p>
          {product.mrp && product.mrp > product.sellingPrice && (
            <>
              <p className="text-lg line-through text-gray-400">
                ₹{product.mrp.toLocaleString()}
              </p>
              <span className="text-lg font-semibold text-red-500">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Stock Info */}
        <p
          className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-lg w-fit ${
            product.stock > 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Delivery Info */}
        <p className="text-gray-700 text-sm">
          🚚 Free Delivery in 2–4 Days | 📦 1 Year Warranty
        </p>

        {/* Key Highlights */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Key Highlights
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>{product.specifications.display}</li>
            <li>{product.specifications.processor}</li>
            <li>{product.specifications.camera}</li>
            <li>{product.specifications.battery}</li>
            <li>{product.specifications.ram} RAM | {product.specifications.storage} Storage</li>
          </ul>
        </div>

        {/* Add to Cart + Buy Now */}
        <div className="flex gap-4">
          <AddToCartButton product={product} />
          <BuyNowButton product={product} />                
        </div>

        {/* Full Specifications */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Full Specifications
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p><strong>Processor:</strong> {product.specifications.processor}</p>
            <p><strong>Display:</strong> {product.specifications.display}</p>
            <p><strong>Camera:</strong> {product.specifications.camera}</p>
            <p><strong>Battery:</strong> {product.specifications.battery}</p>
            <p><strong>RAM:</strong> {product.specifications.ram}</p>
            <p><strong>Storage:</strong> {product.specifications.storage}</p>
            <p><strong>Operating System:</strong> {product.specifications.os}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
