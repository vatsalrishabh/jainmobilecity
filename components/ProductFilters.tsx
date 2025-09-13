"use client";

import React, { useState, useEffect } from "react";
import { X, SlidersHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Import types and utilities
import { ProductFiltersProps, FilterState } from "./filters/types";
import {
  getUniqueBrands,
  getUniqueSpecs,
  calculatePriceRange,
  useWindowSize
} from "./filters/utils";

const ProductFilters: React.FC<ProductFiltersProps> = React.memo(({
  products,
  onFiltersChange,
  isOpen,
  onToggle,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200000],
    brands: [],
    ram: [],
    storage: [],
    os: [],
    inStock: false,
  });

  // Use safe window size hook to avoid SSR issues
  const { windowSize } = useWindowSize();
  const windowWidth = windowSize.width;

  // Calculate dynamic price range
  useEffect(() => {
    if (products.length > 0) {
      const newPriceRange = calculatePriceRange(products);
      setFilters(prev => ({
        ...prev,
        priceRange: newPriceRange
      }));
    }
  }, [products]);

  // Extract unique values for filters
  const uniqueBrands = getUniqueBrands(products);
  const uniqueRam = getUniqueSpecs(products, 'ram');
  const uniqueStorage = getUniqueSpecs(products, 'storage');
  const uniqueOs = getUniqueSpecs(products, 'os');

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  // Handle price range change
  const handlePriceChange = (min: string, max: string) => {
    const minPrice = parseInt(min) || 0;
    const maxPrice = parseInt(max) || 200000;
    handleFilterChange({ priceRange: [minPrice, maxPrice] });
  };

  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    handleFilterChange({ brands: newBrands });
  };

  // Handle spec selection
  const handleSpecChange = (specType: 'ram' | 'storage' | 'os', value: string) => {
    const currentSpecs = filters[specType] as string[];
    const newSpecs = currentSpecs.includes(value)
      ? currentSpecs.filter(s => s !== value)
      : [...currentSpecs, value];
    handleFilterChange({ [specType]: newSpecs });
  };

  // Handle stock filter
  const handleStockChange = (checked: boolean) => {
    handleFilterChange({ inStock: checked });
  };

  // Clear all filters
  const clearFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 200000],
      brands: [],
      ram: [],
      storage: [],
      os: [],
      inStock: false,
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  // Count active filters
  const activeFiltersCount = [
    filters.brands.length,
    filters.ram.length,
    filters.storage.length,
    filters.os.length,
    filters.inStock ? 1 : 0
  ].reduce((sum, count) => sum + count, 0);

  // Handle mobile vs desktop behavior
  if (!isOpen && windowWidth < 1024) {
    return (
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          onClick={onToggle}
          className="bg-shop_light_green hover:bg-shop_dark_green text-white shadow-lg rounded-full p-3"
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-red-500 text-white text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  // If filter is open or we're on desktop, show the filter panel
  return (
    <>
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto lg:relative lg:left-auto lg:top-auto lg:w-64 lg:shadow-lg lg:rounded-lg lg:border lg:border-gray-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-shop_light_green" />
            <h3 className="font-semibold text-lg text-gray-800">Filters</h3>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-shop_light_green text-white">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              onClick={clearFilters}
              variant="ghost"
              size="sm"
              className="w-full text-shop_light_green hover:text-shop_dark_green"
            >
              Clear All Filters
            </Button>
          )}

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0] || ''}
                  onChange={(e) => handlePriceChange(e.target.value, filters.priceRange[1]?.toString() || '200000')}
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1] || ''}
                  onChange={(e) => handlePriceChange(filters.priceRange[0]?.toString() || '0', e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Availability</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleStockChange(e.target.checked)}
                className="w-4 h-4 text-shop_light_green focus:ring-shop_light_green rounded"
              />
              <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
            </label>
          </div>

          {/* Brands */}
          {uniqueBrands.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Brands</h4>
              <div className="space-y-2">
                {uniqueBrands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 text-shop_light_green focus:ring-shop_light_green rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* RAM */}
          {uniqueRam.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-3">RAM</h4>
              <div className="space-y-2">
                {uniqueRam.map((ram) => (
                  <label key={ram} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.ram.includes(ram)}
                      onChange={() => handleSpecChange('ram', ram)}
                      className="w-4 h-4 text-shop_light_green focus:ring-shop_light_green rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{ram}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Storage */}
          {uniqueStorage.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Storage</h4>
              <div className="space-y-2">
                {uniqueStorage.map((storage) => (
                  <label key={storage} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.storage.includes(storage)}
                      onChange={() => handleSpecChange('storage', storage)}
                      className="w-4 h-4 text-shop_light_green focus:ring-shop_light_green rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{storage}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Operating System */}
          {uniqueOs.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Operating System</h4>
              <div className="space-y-2">
                {uniqueOs.map((os) => (
                  <label key={os} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.os.includes(os)}
                      onChange={() => handleSpecChange('os', os)}
                      className="w-4 h-4 text-shop_light_green focus:ring-shop_light_green rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{os}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quick Price Filters */}
          <div>
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

      {/* Mobile Overlay */}
      {isOpen && windowWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
});

ProductFilters.displayName = 'ProductFilters';

export default ProductFilters;
