"use client";

import React from "react";
import Container from "@/components/Container";

const DealPage = () => {
  console.log('🎯 DealPage component rendering');

  return (
    <Container className="bg-shop-light-pink">
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Hot Deals Page</h1>
          <p className="text-lg text-gray-700 mb-4">Amazing discounts on premium mobile devices!</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Component is working correctly</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DealPage;