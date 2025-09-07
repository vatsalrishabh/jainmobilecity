"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import ProductImageSlideshow from "./ProductImageSlideshow";
import { Product } from "@/types/product";

const ProductCard = memo(({ product }: { product: Product }) => {
  // Memoize all calculations to prevent unnecessary recalculations
  const discount = useMemo(() =>
    product.mrp && product.mrp > product.sellingPrice
      ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
      : 0,
    [product.mrp, product.sellingPrice]
  );

  const emiAmount = useMemo(() =>
    Math.round(product.sellingPrice / 12),
    [product.sellingPrice]
  );

  // Memoize formatted prices
  const formattedPrice = useMemo(() =>
    product.sellingPrice.toLocaleString(),
    [product.sellingPrice]
  );

  const formattedMrp = useMemo(() =>
    product.mrp?.toLocaleString(),
    [product.mrp]
  );


     

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 overflow-hidden relative w-full max-w-xs mx-auto">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      )}

      {/* Image Section */}
      <Link href={`/product/${product._id || product.id}`}>
        <div className="relative overflow-hidden bg-gray-50 h-48">
          <ProductImageSlideshow
            images={product.imageUrls || ["/images/products/product_1.png"]}
            alt={product.name}
          />

          {/* Favorite Button */}
          <div className="absolute top-3 right-3 z-20">
            <FavoriteButton productId={product._id} isInsideLink />
          </div>
        </div>
      </Link>

      {/* Details Section */}
      <div className="p-4">
        {/* Product Name */}
        <Link href={`/product/${product._id || product.id}`}>
          <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 text-sm leading-tight mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-lg font-bold text-gray-900">
              ₹{formattedPrice}
            </p>
            {product.mrp && product.mrp > product.sellingPrice && (
              <p className="text-sm line-through text-gray-500">
                ₹{formattedMrp}
              </p>
            )}
          </div>

          {/* EMI Info */}
          <p className="text-xs text-gray-600 mb-2">
            At ₹{emiAmount.toLocaleString()} with EMI
          </p>

          {/* Star Rating Placeholder */}
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-gray-300 text-sm">⭐</span>
            <span className="text-xs text-gray-500 ml-1">(42)</span>
          </div>
        </div>

        {/* Specifications - Compact */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.specifications.ram && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {product.specifications.ram} RAM
            </span>
          )}
          {product.specifications.storage && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {product.specifications.storage}
            </span>
          )}
        </div>

        {/* Cart Button */}
        <div className="mt-3">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
