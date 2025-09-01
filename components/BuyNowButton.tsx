"use client";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Product } from "@/types/product";

interface Props {
  product: Product;
  className?: string;
}

const BuyNowButton = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;

  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    // 👉 Replace with checkout logic (Stripe, Razorpay, etc.)
    toast.success(`Proceeding to checkout with ${product?.name}`);
  };

  return (
    <Button
      onClick={handleBuyNow}
      disabled={isOutOfStock}
      className={cn(
        "bg-orange-500 text-white font-semibold tracking-wide rounded-xl shadow-sm " +
          "hover:bg-orange-600 hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {isOutOfStock ? "Out of Stock" : "Buy Now"}
    </Button>
  );
};

export default BuyNowButton;
