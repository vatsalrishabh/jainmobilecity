"use client";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Product } from "@/types/product";

const FavoriteButton = ({
  showProduct = false,
  product,
  productId,
  isInsideLink = false,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
  productId?: string;
  isInsideLink?: boolean;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === (product?._id || productId)
    );
    setExistingProduct(availableItem || null);
  }, [product, productId, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (product?._id || productId) {
      const productToAdd = product || { _id: productId } as Product;
      addToFavorite(productToAdd).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };

  // If inside a Link component, render as button to avoid nested anchors
  if (isInsideLink || !showProduct) {
    return (
      <button
        onClick={handleFavorite}
        className="group relative hover:text-shop_light_green hoverEffect border border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm bg-white/90 backdrop-blur-sm"
      >
        {existingProduct ? (
          <Heart
            fill="#3b9c3c"
            className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5"
          />
        ) : (
          <Heart className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5" />
        )}
        <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
          {favoriteProduct?.length ? favoriteProduct?.length : 0}
        </span>
      </button>
    );
  }

  // If not inside Link and showProduct is true, render with Link to wishlist
  return (
    <Link href={"/wishlist"} className="group relative">
      <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {favoriteProduct?.length ? favoriteProduct?.length : 0}
      </span>
    </Link>
  );
};

export default FavoriteButton;
