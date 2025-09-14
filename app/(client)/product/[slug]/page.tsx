import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import ProductImageSlideshow from "@/components/ProductImageSlideshow";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import { Product } from "@/types/product";
import BuyNowButton from "@/components/BuyNowButton";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store'
    });

    if (response.ok) {
      const products: Product[] = await response.json();
      const product = products.find(p => p._id === slug || p.id === slug);

      if (product) {
        return {
          title: `${product.name} - Jain Mobile City`,
          description: product.description || `Buy ${product.name} online at Jain Mobile City. Best prices, free delivery, and 1 year warranty.`,
          keywords: `${product.brand}, ${product.name}, mobile, smartphone, buy online`,
          openGraph: {
            title: `${product.name} - Jain Mobile City`,
            description: product.description || `Buy ${product.name} online at Jain Mobile City`,
            images: product.imageUrls?.[0] ? [{ url: product.imageUrls[0] }] : [],
          },
        };
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Product Details - Jain Mobile City',
    description: 'View product details and specifications',
  };
}

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const SingleProductPage = async ({ params }: ProductPageProps) => {
  // Await params in Next.js 15
  const { slug } = await params;

  // Fetch product from database
  let product: Product | null = null;

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store' // Ensure fresh data
    });

    if (response.ok) {
      const products: Product[] = await response.json();
      product = products.find(p => p._id === slug || p.id === slug) || null;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  if (!product) {
    notFound();
  }

  // Calculate discount safely
  const discount =
    product?.mrp && product.mrp > product.sellingPrice
      ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4 py-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?brand=${product.brand}`} className="hover:text-blue-600 transition-colors">{product.brand}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: Product Image */}
          <div className="relative w-full">
            <div className="sticky top-4">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden h-96 lg:h-[500px]">
                <ProductImageSlideshow
                  images={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : ["/images/products/product_1.png"]}
                  alt={product.name}
                />


                {/* Favorite Button */}
                <div className="absolute top-3 right-3 z-10">
                  <FavoriteButton productId={product._id || product.id} isInsideLink />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col gap-4">
            {/* Brand + Name */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-sm text-blue-600 uppercase tracking-wide font-semibold mb-1">
                {product.brand}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price + Stock + Rating in one compact section */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex flex-col gap-3">
                {/* Price and Discount */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">
                    ₹{product.sellingPrice.toLocaleString()}
                  </p>
                  {product.mrp && product.mrp > product.sellingPrice && (
                    <div className="flex items-center gap-2">
                      <p className="text-lg line-through text-gray-400">
                        ₹{product.mrp.toLocaleString()}
                      </p>
                      <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                        {discount}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* EMI Info */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span>💳</span>
                  <span className="font-medium">
                    EMI from ₹{Math.round(product.sellingPrice / 12).toLocaleString()}/month
                  </span>
                </div>

                {/* Stock and Rating in one line */}
                <div className="flex items-center justify-between">
                  <p
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    {product.stock > 0 ? `✓ In Stock (${product.stock})` : "✗ Out of Stock"}
                  </p>

                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-xs">⭐</span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">(4.2)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery & Warranty Info - Compact */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500 text-lg">🚚</span>
                  <div>
                    <p className="font-semibold text-green-700 text-sm">FREE Delivery</p>
                    <p className="text-xs text-gray-600">Tomorrow</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-blue-500 text-lg">📦</span>
                  <div>
                    <p className="font-semibold text-blue-700 text-sm">1 Year Warranty</p>
                    <p className="text-xs text-gray-600">Included</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-purple-500 text-lg">🔄</span>
                  <div>
                    <p className="font-semibold text-purple-700 text-sm">Easy Returns</p>
                    <p className="text-xs text-gray-600">7 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Highlights - Compact */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-blue-500">✨</span>
                Key Highlights
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: "📱", label: "Display", value: product.specifications?.display },
                  { icon: "⚡", label: "Processor", value: product.specifications?.processor },
                  { icon: "📷", label: "Camera", value: product.specifications?.camera },
                  { icon: "🔋", label: "Battery", value: product.specifications?.battery },
                  { icon: "🧠", label: "RAM & Storage", value: `${product.specifications?.ram || 'N/A'} RAM | ${product.specifications?.storage || 'N/A'} Storage` },
                  { icon: "💻", label: "Operating System", value: product.specifications?.os }
                ].map((spec, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="text-sm">{spec.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide leading-tight">{spec.label}</p>
                      <p className="text-xs text-gray-800 font-medium truncate">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart + Buy Now - Compact */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <AddToCartButton product={product} />
                </div>
                <div className="flex-1">
                  <BuyNowButton product={product} />
                </div>
              </div>
            </div>

            {/* Full Specifications - Compact */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-green-500">📋</span>
                Full Specifications
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "Brand", value: product.brand, icon: "🏷️" },
                  { label: "Model", value: product.name, icon: "📱" },
                  { label: "Processor", value: product.specifications?.processor, icon: "⚡" },
                  { label: "Display", value: product.specifications?.display, icon: "📺" },
                  { label: "Camera", value: product.specifications?.camera, icon: "📷" },
                  { label: "Battery", value: product.specifications?.battery, icon: "🔋" },
                  { label: "RAM", value: product.specifications?.ram, icon: "🧠" },
                  { label: "Storage", value: product.specifications?.storage, icon: "💾" },
                  { label: "Operating System", value: product.specifications?.os, icon: "💻" }
                ].map((spec, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{spec.icon}</span>
                      <span className="text-xs font-medium text-gray-600">{spec.label}:</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews Section - Compact */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-orange-500">⭐</span>
                Customer Reviews
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-800">4.2</span>
                  <span className="text-xs text-gray-600">(124 reviews)</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-green-50 rounded">
                    <p className="text-lg font-bold text-green-600">85%</p>
                    <p className="text-xs text-gray-600">Recommend</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="text-lg font-bold text-blue-600">4.1</p>
                    <p className="text-xs text-gray-600">Performance</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <p className="text-lg font-bold text-purple-600">4.3</p>
                    <p className="text-xs text-gray-600">Value</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section - Compact */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Placeholder for similar products - you can implement this later */}
            <div className="text-center text-gray-500 py-6 col-span-full">
              <span className="text-3xl">🔄</span>
              <p className="mt-2 text-sm">Similar products loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
