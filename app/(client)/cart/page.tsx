"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Mock user data for development
// const mockUser = {
//   _id: "1",
//   name: "Demo User",
//   email: "demo@example.com",
//   mobile: "9876543210",
//   address: "123 Demo Street, Demo City"
// };

const Cart = () => {
  const router = useRouter();
  const { items, getTotalPrice, getItemCount, addItem,  deleteCartProduct, resetCart } = useStore();
  //const [user, setUser] = useState(mockUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Mock authentication check
    setIsLoggedIn(true);
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      // Remove current quantity and add new quantity
      const currentCount = getItemCount(productId);
      if (currentCount > 0) {
        deleteCartProduct(productId);
      }
      if (newQuantity > 0) {
        const product = items.find(item => item.product._id === productId)?.product;
        if (product) {
          for (let i = 0; i < newQuantity; i++) {
            addItem(product);
          }
        }
      }
    }
  };

  const handleRemoveItem = (productId: string) => {
    deleteCartProduct(productId);
  };

  const handleClearCart = () => {
    resetCart();
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      // Store cart data in localStorage for checkout page
      const checkoutData = {
        from: 'cart',
        items: items,
        totalPrice: getTotalPrice(),
        itemCount: items.length
      };
      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

      // Navigate to checkout page
      router.push("/checkout?from=cart");
    } else {
      router.push("/admin");
    }
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container className="py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Cart Items ({items.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.product._id} className="p-6 flex items-center gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.product.imageUrls?.[0] || "/images/emptyCart.png"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.product.brand}</p>
                      <p className="text-lg font-bold text-green-600">
                        ₹{item.product.sellingPrice.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ₹{(item.product.sellingPrice * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="text-red-600 hover:text-red-800 mt-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold"
              >
                {isLoggedIn ? "Proceed to Checkout" : "Sign In to Checkout"}
              </Button>
              
              {!isLoggedIn && (
                <p className="text-sm text-gray-500 text-center mt-3">
                  Please sign in to complete your purchase
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
