// app/(client)/checkout/page.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkout Data:", formData);
  };

  return (
    <div className="bg-white border border-gray-200 my-10 md:my-16 p-6 lg:p-10 rounded-xl shadow-sm max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold border-b pb-4 mb-6 text-gray-800">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-3">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-shop_orange"
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-shop_orange"
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-shop_orange"
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-3">
            Shipping Address
          </h2>
          <textarea
            name="address"
            placeholder="Street Address *"
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-shop_orange"
            onChange={handleChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <input
              type="text"
              name="city"
              placeholder="City *"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-shop_orange"
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-shop_orange"
              onChange={handleChange}
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code *"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-shop_orange"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t pt-6">
          <p className="text-sm text-gray-500">
            You’ll receive order updates via SMS & Email.
          </p>
          <Button
            type="submit"
            className="bg-shop_orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
