import React from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import { Product } from "@/types/product";

const ProductCard = ({ product }: { product: Product }) => {
  const discount =
    product.mrp && product.mrp > product.sellingPrice
      ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
      : 0;


     

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group relative">
      {/* Image Section */}
      <Link href={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrls?.[0] || "/images/products/product_1.png"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }} // ✅ replaces legacy objectFit
            className="group-hover:scale-110 transition-transform duration-500"
          />

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <FavoriteButton productId={product._id} isInsideLink />
          </div>

          {/* Hover Overlay with Specs */}
          <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-sm p-4">
            {product.specifications.ram && (
              <p className="mb-1">{product.specifications.ram}</p>
            )}
            {product.specifications.storage && (
              <p className="mb-1">{product.specifications.storage}</p>
            )}
            {product.specifications.processor && (
              <p className="mb-1">{product.specifications.processor}</p>
            )}
            {product.specifications.battery && (
              <p>{product.specifications.battery}</p>
            )}
          </div>
        </div>
      </Link>

      {/* Details Section */}
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.brand}
        </p>

        <Link href={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="mt-3 flex items-center gap-2">
          <p className="text-lg font-bold text-green-600">
            ₹{product.sellingPrice.toLocaleString()}
          </p>
          {product.mrp && product.mrp > product.sellingPrice && (
            <>
              <p className="text-sm line-through text-gray-400">
                ₹{product.mrp.toLocaleString()}
              </p>
              <span className="text-sm font-semibold text-red-500">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Cart Button */}
        <div className="mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
