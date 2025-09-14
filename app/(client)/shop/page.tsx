"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { Loader2, Filter, Search, SlidersHorizontal, TrendingUp } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import NoProductAvailable from "@/components/NoProductAvailable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HotDealsSection from "@/components/HotDealsSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import ShopStats from "@/components/ShopStats";
import RecentProducts from "@/components/RecentProducts";

interface Product {
  _id: string;
  id: string;
  name: string;
  brand: string;
  category: string;
  sellingPrice: number;
  costPrice: number;
  discountPercentage: number;
  imageUrls: string[];
  stock: number;
  specifications?: {
    ram?: string;
    storage?: string;
    processor?: string;
    battery?: string;
    display?: string;
    camera?: string;
    os?: string;
  };
  createdAt: string;
}

interface ShopFilters {
  categories: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

interface ShopResponse {
  products: Product[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: ShopFilters;
}

const ShopPageContent = () => {
  const searchParams = useSearchParams();

  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ShopFilters | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams?.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams?.get('brand') || '');
  const [minPrice, setMinPrice] = useState<string>(searchParams?.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState<string>(searchParams?.get('maxPrice') || '');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams?.get('search') || '');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedBrand) params.append('brand', selectedBrand);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (searchQuery) params.append('search', searchQuery);
      params.append('sort', sortBy);
      params.append('order', sortOrder);
      params.append('page', currentPage.toString());
      params.append('limit', '20');

      const response = await fetch(`/api/shop?${params.toString()}`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data: ShopResponse = await response.json();
      setProducts(data.products);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
      setFilters(data.filters);

      // Update URL without triggering reload
      const newSearchParams = new URLSearchParams();
      if (selectedCategory) newSearchParams.set('category', selectedCategory);
      if (selectedBrand) newSearchParams.set('brand', selectedBrand);
      if (minPrice) newSearchParams.set('minPrice', minPrice);
      if (maxPrice) newSearchParams.set('maxPrice', maxPrice);
      if (searchQuery) newSearchParams.set('search', searchQuery);

      const newUrl = `/shop${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;
      window.history.replaceState({}, '', newUrl);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand, minPrice, maxPrice, searchQuery, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
  };

  const handlePriceChange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const activeFiltersCount = [selectedCategory, selectedBrand, minPrice || maxPrice, searchQuery].filter(Boolean).length;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Hero Section with Hot Deals Integration */}
      <div className="bg-gradient-to-r from-shop_dark_green via-green-600 to-shop_light_green text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5" />
              <span className="font-bold">HOT DEALS AVAILABLE</span>
              <TrendingUp className="w-5 h-5" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Find the perfect mobile devices and accessories from top brands at unbeatable prices in Raebareli
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white focus:text-gray-900"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Hot Deals Section */}
      <Container className="py-8">
        <HotDealsSection />
      </Container>

      {/* Featured Categories */}
      <Container className="py-8">
        <FeaturedCategories />
      </Container>

      {/* Shop Statistics */}
      <Container className="py-8">
        <ShopStats
          totalProducts={totalCount}
          totalCategories={filters?.categories.length || 0}
          totalBrands={filters?.brands.length || 0}
        />
      </Container>

      {/* Recent Products */}
      <Container className="py-8">
        <RecentProducts />
      </Container>

      <Container className="py-8">
        {/* Header with Sort and Filter Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Title className="text-2xl font-bold text-gray-800">
              Shop Products ({totalCount})
            </Title>

            {/* Active Filters Badge */}
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-shop_light_green text-white">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sort, order] = e.target.value.split('-');
                handleSort(sort);
                setSortOrder(order);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-shop_light_green focus:border-transparent"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="sellingPrice-asc">Price: Low to High</option>
              <option value="sellingPrice-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            {/* Filter Toggle Button */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-shop_light_green text-white text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg text-gray-800 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-shop_light_green hover:text-shop_dark_green"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                <div className="space-y-2">
                  {filters?.categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-4 h-4 text-shop_light_green focus:ring-shop_light_green"
                      />
                      <span className="ml-2 text-sm text-gray-600 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Brands</h4>
                <div className="space-y-2">
                  {filters?.brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => handleBrandChange(e.target.value)}
                        className="w-4 h-4 text-shop_light_green focus:ring-shop_light_green"
                      />
                      <span className="ml-2 text-sm text-gray-600">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <Button
                    onClick={() => handlePriceChange(minPrice, maxPrice)}
                    size="sm"
                    className="w-full bg-shop_light_green hover:bg-shop_dark_green"
                  >
                    Apply Price Filter
                  </Button>
                </div>
              </div>

              {/* Quick Price Filters */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Quick Filters</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Under ₹5K', min: '', max: '5000' },
                    { label: '₹5K - ₹15K', min: '5000', max: '15000' },
                    { label: '₹15K - ₹30K', min: '15000', max: '30000' },
                    { label: 'Above ₹30K', min: '30000', max: '' },
                  ].map((range, index) => (
                    <Button
                      key={index}
                      onClick={() => handlePriceChange(range.min, range.max)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-shop_light_green animate-spin mb-4" />
                <p className="text-lg font-medium text-gray-600">Loading amazing products...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      variant="outline"
                    >
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                        return (
                          <Button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            className={currentPage === page ? "bg-shop_light_green hover:bg-shop_dark_green" : ""}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      variant="outline"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <NoProductAvailable className="bg-white rounded-lg shadow-sm" />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

const ShopPage = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <ShopPageContent />
    </Suspense>
  );
};

export default ShopPage;
