// app/(client)/checkout/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Product } from "@/types/product";

const CheckoutContent = ({ searchParams }: { searchParams?: { productId?: string; quantity?: string } }) => {
  const routerSearchParams = useSearchParams();

  // Try to get data from localStorage first (set by BuyNowButton)
  const [checkoutData, setCheckoutData] = useState<{ product: Product; quantity: number } | null>(null);

  // Try multiple sources for productId
  const productId = searchParams?.productId || routerSearchParams.get('productId');

  // Fallback: try to get productId from window.location if useSearchParams fails
  const fallbackProductId = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('productId')
    : null;

  const finalProductId = productId || fallbackProductId;

  // Load checkout data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('checkoutData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);

          if (parsedData.from === 'cart') {
            // Cart checkout
            setCheckoutType('cart');
            setCartItems(parsedData.items || []);
          } else {
            // Single product checkout
            setCheckoutType('single');
            setCheckoutData(parsedData);
          }

          // Clear the data after loading
          localStorage.removeItem('checkoutData');
        } catch (error) {
          console.error('Error parsing checkout data:', error);
        }
      }
    }
  }, []);

  const [product, setProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Array<{ product: Product; quantity: number; _id?: string; id?: string }>>([]);
  const [checkoutType, setCheckoutType] = useState<'single' | 'cart'>('single');
  const [loading, setLoading] = useState(true);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "razorpay",
  });

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if Razorpay is loaded
  useEffect(() => {
    const checkRazorpay = () => {
      if (typeof window !== 'undefined' && (window as { Razorpay?: { new (options: Record<string, unknown>): unknown } }).Razorpay) {
        setRazorpayLoaded(true);
      } else {
        // Load Razorpay script if not available
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          setRazorpayLoaded(true);
        };
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          toast.error('Payment system failed to load. Please refresh the page.');
        };
        document.head.appendChild(script);
      }
    };

    checkRazorpay();
  }, []);

  // Fetch product details or handle cart items
  useEffect(() => {
    const loadCheckoutData = async () => {
      if (!mounted) {
        return;
      }

      setLoading(true);

      try {
        if (checkoutType === 'cart') {
          // For cart checkout, we already have the items
          setLoading(false);
          return;
        }

        // For single product checkout
        if (checkoutData?.product) {
          setProduct(checkoutData.product);
          setLoading(false);
          return;
        }

        // Fallback: fetch from API if no localStorage data
        if (finalProductId) {
          const response = await fetch('/api/products');
          if (response.ok) {
            const products: Product[] = await response.json();

            // Find product by ID
            const foundProduct = products.find(p =>
              p.id === finalProductId || p._id === finalProductId
            );

            setProduct(foundProduct || null);
          }
        }
      } catch (error) {
        console.error('Error loading checkout data:', error);
        toast.error('Failed to load checkout details');
      } finally {
        setLoading(false);
      }
    };

    loadCheckoutData();
  }, [finalProductId, mounted, checkoutData, checkoutType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate totals
  const calculateTotals = () => {
    if (checkoutType === 'cart') {
      const subtotal = cartItems.reduce((sum, item) =>
        sum + (item.product.sellingPrice * item.quantity), 0
      );
      const shipping = subtotal > 1000 ? 0 : 100;
      return { subtotal, shipping, total: subtotal + shipping };
    } else {
      const subtotal = product ? product.sellingPrice * (checkoutData?.quantity || 1) : 0;
      const shipping = subtotal > 1000 ? 0 : 100;
      return { subtotal, shipping, total: subtotal + shipping };
    }
  };

  const { subtotal, shipping, total } = calculateTotals();

  const handlePayment = async () => {
    if (checkoutType === 'cart' && cartItems.length === 0) {
      toast.error('No items in cart');
      return;
    }

    if (checkoutType === 'single' && !product) {
      toast.error('Product not found');
      return;
    }

    // Check if Razorpay is loaded
    if (!razorpayLoaded || typeof window === 'undefined' || !(window as { Razorpay?: { new (options: Record<string, unknown>): unknown } }).Razorpay) {
      toast.error('Payment system is loading. Please wait a moment and try again.');
      return;
    }

    try {
      // Prepare payment description
      let description = '';
      let productInfo = '';

      if (checkoutType === 'cart') {
        description = `Purchase of ${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`;
        productInfo = cartItems.map(item =>
          `${item.product.name} (x${item.quantity})`
        ).join(', ');
      } else {
        description = `Purchase of ${product?.name}`;
        productInfo = `${product?.name} (x${checkoutData?.quantity || 1})`;
      }

      // Razorpay integration
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag', // Test key for development
        amount: total * 100, // Amount in paisa
        currency: 'INR',
        name: 'Jain Mobile City',
        description: description,
        image: '/images/logo.png',

        handler: function (response: { razorpay_payment_id: string }) {
          toast.success('Payment successful!');
          console.log('Payment response:', response);
          // Handle successful payment - redirect to success page
          window.location.href = '/success?orderId=' + response.razorpay_payment_id;
        },

        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },

        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zip}`,
          products: productInfo,
          checkoutType: checkoutType,
        },

        theme: {
          color: '#f97316', // Orange color matching theme
        },

        modal: {
          ondismiss: function() {
            toast('Payment cancelled by user');
          },
          confirm_close: true,
          animation: true,
        },
      };

      // Type assertion for Razorpay
      const RazorpayConstructor = (window as { Razorpay?: new (options: Record<string, unknown>) => unknown }).Razorpay;
      if (!RazorpayConstructor) {
        toast.error('Razorpay is not loaded. Please refresh the page.');
        return;
      }

      const razorpay = new RazorpayConstructor(options);

      // Handle payment failure
      razorpay.on('payment.failed', function (response: { error: { description: string } }) {
        console.error('Payment failed:', response.error);
        toast.error('Payment failed. Please try again.');
      });

      razorpay.open();
    } catch (error) {
      console.error('Error initializing payment:', error);
      toast.error('Unable to initialize payment. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zip) {
      toast.error('Please fill in all required fields');
      return;
    }

    handlePayment();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
          <p className="text-sm text-gray-500 mt-2">Product ID: {finalProductId || 'Not found'}</p>
        </div>
      </div>
    );
  }

  if (checkoutType === 'single' && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-2">The product you&apos;re trying to purchase is not available.</p>
          <p className="text-sm text-gray-500 mb-6">Product ID: {finalProductId || 'Not found'}</p>
          <Button onClick={() => window.location.href = '/'}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (checkoutType === 'cart' && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products to your cart before checkout.</p>
          <Button onClick={() => window.location.href = '/shop'}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          Secure Checkout
          {checkoutType === 'cart' && <span className="block text-lg font-normal text-gray-600 mt-2">
            ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})
          </span>}
      </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📦</span>
                Order Summary
              </h2>

              {checkoutType === 'cart' ? (
                // Cart items summary
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={item.product.imageUrls?.[0] || "/images/products/product_1.png"}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm">{item.product.name}</h3>
                        <p className="text-xs text-gray-600">{item.product.brand}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-green-600">
                          ₹{(item.product.sellingPrice * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Single product summary
                product && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={product.imageUrls?.[0] || "/images/products/product_1.png"}
                        alt={product.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                      <p className="text-sm text-gray-500">Quantity: {checkoutData?.quantity || 1}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">
                        ₹{product.sellingPrice.toLocaleString()}
                      </p>
                      {product.mrp && product.mrp > product.sellingPrice && (
                        <p className="text-sm line-through text-gray-400">
                          ₹{product.mrp.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-green-500">💰</span>
                Price Details
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({checkoutType === 'cart' ? cartItems.length : 1} item{checkoutType === 'cart' && cartItems.length > 1 ? 's' : ''})
                  </span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600">Free shipping on orders above ₹1000</p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Personal Info */}
        <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-purple-500">👤</span>
            Personal Information
          </h2>
                <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={handleChange}
            />
          <input
            type="email"
            name="email"
                    placeholder="Email Address *"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            onChange={handleChange}
          />
                </div>
        </div>

              {/* Shipping Address */}
        <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-500">📍</span>
            Shipping Address
          </h2>
                <div className="space-y-4">
          <textarea
            name="address"
                    placeholder="Street Address, Building, Landmark *"
            required
            rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            onChange={handleChange}
          />
                  <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City *"
              required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={handleChange}
            />
                  </div>
            <input
              type="text"
              name="zip"
                    placeholder="PIN Code *"
              required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={handleChange}
            />
          </div>
        </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-green-500">💳</span>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={formData.paymentMethod === "razorpay"}
                      onChange={handleChange}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💳</span>
                      <div>
                        <p className="font-medium text-gray-800">Credit/Debit Card, UPI, Net Banking</p>
                        <p className="text-sm text-gray-600">Secure payment powered by Razorpay</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
          <Button
            type="submit"
                disabled={!razorpayLoaded}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg shadow-md transition-all duration-300 text-lg"
              >
                {!razorpayLoaded ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Loading Payment System...
                  </span>
                ) : (
                  `Pay ₹${total.toLocaleString()} Securely`
                )}
          </Button>

              <p className="text-xs text-gray-500 text-center">
                🔒 Your payment information is secure and encrypted
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ searchParams }: { searchParams?: { productId?: string; quantity?: string } }) => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent searchParams={searchParams} />
    </Suspense>
  );
};

export default CheckoutPage;
