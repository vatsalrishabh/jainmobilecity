"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import Title from "./Title";
import ProductFilters from "./ProductFilters";
import { FilterState } from "./filters/types";
import { Product } from "@/types/product";
import { Button } from "@mui/material";

// Custom hook for window size management
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Lazy load ProductCard for better performance
const LazyProductCard = dynamic(() => import("./ProductCard"), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-full max-w-xs mx-auto animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
});

const ProductGrid = React.memo(() => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Toggle function for filters
  const toggleFilters = () => {
    console.log('toggleFilters called - current state:', filtersOpen);
    setFiltersOpen(prevState => {
      const newState = !prevState;
      console.log('toggleFilters - setting to:', newState);
      return newState;
    });
  };
  const { width: windowWidth } = useWindowSize();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    priceRange: [0, 200000],
    brands: [],
    ram: [],
    storage: [],
    os: [],
    inStock: false,
  });

  // Handle responsive filter behavior
  // Close filters only when switching from desktop to mobile, not during normal mobile usage
  const [prevWindowWidth, setPrevWindowWidth] = useState(windowWidth);

  useEffect(() => {
    const wasDesktop = prevWindowWidth >= 1024;
    const isNowMobile = windowWidth < 1024;

    if (wasDesktop && isNowMobile && filtersOpen) {
      setFiltersOpen(false);
    }

    setPrevWindowWidth(windowWidth);
  }, [windowWidth, filtersOpen, prevWindowWidth]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async (retryCount = 0) => {
      try {
        setError(null);
        const response = await fetch('/api/products', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        if (retryCount < 2) {
          // Retry up to 2 times with exponential backoff
          setTimeout(() => fetchProducts(retryCount + 1), Math.pow(2, retryCount) * 1000);
          return;
        }
        setError('Failed to load products. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Price range filter
      if (
        product.sellingPrice < currentFilters.priceRange[0] ||
        product.sellingPrice > currentFilters.priceRange[1]
      ) {
        return false;
      }

      // Brand filter
      if (currentFilters.brands.length > 0 && !currentFilters.brands.includes(product.brand)) {
        return false;
      }

      // RAM filter
      if (currentFilters.ram.length > 0 && (!product.specifications?.ram || !currentFilters.ram.includes(product.specifications.ram))) {
        return false;
      }

      // Storage filter
      if (currentFilters.storage.length > 0 && (!product.specifications?.storage || !currentFilters.storage.includes(product.specifications.storage))) {
        return false;
      }

      // OS filter
      if (currentFilters.os.length > 0 && (!product.specifications?.os || !currentFilters.os.includes(product.specifications.os))) {
        return false;
      }

      // In stock filter
      if (currentFilters.inStock && product.stock <= 0) {
        return false;
      }

      return true;
    });
  }, [products, currentFilters]);

  // Debounced filter changes for better performance
  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setCurrentFilters(newFilters);
    }, 300); // 300ms debounce delay
  }, []);

  // Memoized grid columns based on window size
  const gridCols = useMemo(() => {
    if (windowWidth >= 1536) return "grid-cols-6"; // 2xl
    if (windowWidth >= 1280) return "grid-cols-5"; // xl
    if (windowWidth >= 1024) return "grid-cols-4"; // lg
    if (windowWidth >= 768) return "grid-cols-3"; // md
    if (windowWidth >= 640) return "grid-cols-2"; // sm
    return "grid-cols-1"; // default
  }, [windowWidth]);

  const getActiveFilterCount = () => {
    return (
      currentFilters.brands.length +
      currentFilters.ram.length +
      currentFilters.storage.length +
      currentFilters.os.length +
      (currentFilters.inStock ? 1 : 0)
    );
  };

  if (loading) {
    return (
      <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
        <Title className="border-b pb-3">Featured Products</Title>
        <div className="mt-5 flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 my-10 md:my-20 p-5 lg:p-7 rounded-md">
        <Title className="border-b pb-3 text-red-600">Error Loading Products</Title>
        <div className="mt-5 flex flex-col justify-center items-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-center mb-4">{error}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex gap-6 px-4 lg:px-8 py-8">
        {/* Filters Sidebar */}
        <div className={`w-full lg:w-64 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
          <ProductFilters
            products={products}
            onFiltersChange={handleFiltersChange}
            isOpen={filtersOpen}
            onToggle={toggleFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* Header with Results Count and Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Title className="text-2xl font-bold text-gray-800">
                  Featured Products ({filteredProducts.length})
                </Title>

                {/* Active Filters Badge */}
                {getActiveFilterCount() > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} applied
                    </span>
                    <button
                      onClick={() => setCurrentFilters({
                        priceRange: [0, 200000],
                        brands: [],
                        ram: [],
                        storage: [],
                        os: [],
                        inStock: false,
                      })}
                      className="text-sm text-shop_light_green hover:text-shop_dark_green underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={toggleFilters}
                className="lg:hidden bg-shop_light_green hover:bg-shop_dark_green text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Filters
                {getActiveFilterCount() > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={() => setCurrentFilters({
                      priceRange: [0, 200000],
                      brands: [],
                      ram: [],
                      storage: [],
                      os: [],
                      inStock: false,
                    })}
                    className="bg-shop_light_green hover:bg-shop_dark_green text-white px-6 py-3 rounded-lg"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className={`grid ${gridCols} gap-4`}>
                  {filteredProducts.map((product) => (
                    <Suspense key={`product-${product._id || product.id}`} fallback={
                      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-full max-w-xs mx-auto animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-6 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    }>
                      <LazyProductCard product={product} />
                    </Suspense>
                  ))}
                </div>

                {/* Results Summary */}
                <div className="mt-8 text-center text-sm text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
