"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import Title from "./Title";
import ProductFilters, { FilterState } from "./ProductFilters";
import { Product } from "@/types/product";
import { FilterList } from "@mui/icons-material";
import { Button, Typography, Chip } from "@mui/material";

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
  useEffect(() => {
    if (windowWidth < 1024 && filtersOpen) {
      setFiltersOpen(false);
    }
  }, [windowWidth, filtersOpen]);

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
      if (currentFilters.ram.length > 0 && !currentFilters.ram.includes(product.specifications.ram)) {
        return false;
      }

      // Storage filter
      if (currentFilters.storage.length > 0 && !currentFilters.storage.includes(product.specifications.storage)) {
        return false;
      }

      // OS filter
      if (currentFilters.os.length > 0 && (!product.specifications.os || !currentFilters.os.includes(product.specifications.os))) {
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
    <div className="relative">
      {/* Filters Sidebar */}
      <ProductFilters
        products={products}
        onFiltersChange={handleFiltersChange}
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen(!filtersOpen)}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${filtersOpen ? 'lg:ml-72' : ''}`}>
        <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
          {/* Header with Results Count */}
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <div>
              <Title className="mb-1">Featured Products</Title>
              <p className="text-sm text-gray-600">
                {filteredProducts.length} of {products.length} products
                {getActiveFilterCount() > 0 && (
                  <span className="ml-2 text-blue-600">
                    ({getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} applied)
                  </span>
                )}
              </p>
            </div>

            {/* Filter Toggle Button for Mobile */}
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden"
            >
              Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </Button>
          </div>

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Typography variant="subtitle2" className="font-medium text-blue-900 mb-2">
                Active Filters
              </Typography>
              <div className="flex flex-wrap gap-2">
                {currentFilters.brands.map((brand) => (
                  <Chip
                    key={brand}
                    label={`Brand: ${brand}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    onDelete={() => {
                      const newBrands = currentFilters.brands.filter(b => b !== brand);
                      setCurrentFilters(prev => ({ ...prev, brands: newBrands }));
                    }}
                  />
                ))}
                {currentFilters.ram.map((ram) => (
                  <Chip
                    key={ram}
                    label={`RAM: ${ram}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    onDelete={() => {
                      const newRam = currentFilters.ram.filter(r => r !== ram);
                      setCurrentFilters(prev => ({ ...prev, ram: newRam }));
                    }}
                  />
                ))}
                {currentFilters.storage.map((storage) => (
                  <Chip
                    key={storage}
                    label={`Storage: ${storage}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    onDelete={() => {
                      const newStorage = currentFilters.storage.filter(s => s !== storage);
                      setCurrentFilters(prev => ({ ...prev, storage: newStorage }));
                    }}
                  />
                ))}
                {currentFilters.os.map((os) => (
                  <Chip
                    key={os}
                    label={`OS: ${os}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    onDelete={() => {
                      const newOs = currentFilters.os.filter(o => o !== os);
                      setCurrentFilters(prev => ({ ...prev, os: newOs }));
                    }}
                  />
                ))}
                {currentFilters.inStock && (
                  <Chip
                    label="In Stock Only"
                    size="small"
                    color="primary"
                    variant="outlined"
                    onDelete={() => setCurrentFilters(prev => ({ ...prev, inStock: false }))}
                  />
                )}
              </div>
              <Button
                size="small"
                onClick={() => setCurrentFilters({
                  priceRange: [0, 200000],
                  brands: [],
                  ram: [],
                  storage: [],
                  os: [],
                  inStock: false,
                })}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Clear All Filters
              </Button>
        </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search criteria
              </p>
              {getActiveFilterCount() > 0 && (
                <Button
                  variant="outlined"
                  onClick={() => setCurrentFilters({
                    priceRange: [0, 200000],
                    brands: [],
                    ram: [],
                    storage: [],
                    os: [],
                    inStock: false,
                  })}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
