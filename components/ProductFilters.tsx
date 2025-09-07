"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import {
  ExpandMore,
  FilterList,
  Clear,
} from "@mui/icons-material";
import { Product } from "@/types/product";

interface ProductFiltersProps {
  products: Product[];
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  ram: string[];
  storage: string[];
  os: string[];
  inStock: boolean;
}

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

  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Handle responsive behavior
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dynamic price range
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => p.sellingPrice);
      const minPrice = Math.floor(Math.min(...prices) / 1000) * 1000;
      const maxPrice = Math.ceil(Math.max(...prices) / 1000) * 1000;
      setFilters(prev => ({
        ...prev,
        priceRange: [minPrice, maxPrice]
      }));
    }
  }, [products]);

  // Extract unique values for filters
  const uniqueBrands = Array.from(new Set(products.map(p => p.brand))).sort();
  const uniqueRam = Array.from(new Set(products.map(p => p.specifications.ram))).filter(Boolean).sort();
  const uniqueStorage = Array.from(new Set(products.map(p => p.specifications.storage))).filter(Boolean).sort();
  const uniqueOs = Array.from(new Set(products.map(p => p.specifications.os))).filter(Boolean).sort();

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as [number, number];
    handleFilterChange({ priceRange: value });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    handleFilterChange({ brands: newBrands });
  };

  const handleSpecToggle = (specType: 'ram' | 'storage' | 'os', value: string) => {
    const currentSpecs = filters[specType] as string[];
    const newSpecs = currentSpecs.includes(value)
      ? currentSpecs.filter(s => s !== value)
      : [...currentSpecs, value];
    handleFilterChange({ [specType]: newSpecs });
  };

  const clearAllFilters = () => {
    const resetFilters: FilterState = {
      priceRange: filters.priceRange, // Keep price range
      brands: [],
      ram: [],
      storage: [],
      os: [],
      inStock: false,
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getActiveFilterCount = () => {
    return (
      filters.brands.length +
      filters.ram.length +
      filters.storage.length +
      filters.os.length +
      (filters.inStock ? 1 : 0)
    );
  };

  // Memoize responsive width
  const filterWidth = React.useMemo(() => {
    if (windowWidth >= 1280) return "lg:w-80"; // xl screens
    if (windowWidth >= 1024) return "lg:w-72"; // lg screens
    return "lg:w-80"; // default
  }, [windowWidth]);

  if (!isOpen) {
    return (
      <div className="fixed left-4 top-20 z-40 lg:relative lg:left-auto lg:top-auto">
        <Button
          variant="contained"
          startIcon={<FilterList />}
          onClick={onToggle}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 rounded-xl"
        >
          <span className="font-semibold">
            Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto lg:relative lg:left-auto lg:top-auto ${filterWidth} lg:shadow-xl lg:rounded-xl lg:border lg:border-gray-200`}>
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FilterList className="text-white" />
            </div>
            <div>
              <Typography variant="h6" className="font-bold text-white">
                Filters
              </Typography>
              <Typography variant="caption" className="text-blue-100">
                Refine your search
              </Typography>
            </div>
          </div>
          <div className="flex gap-2">
            {getActiveFilterCount() > 0 && (
              <Chip
                label={getActiveFilterCount()}
                size="small"
                className="bg-white text-blue-600 font-semibold"
              />
            )}
            <IconButton onClick={onToggle} size="small" className="text-white hover:bg-white/20 lg:hidden">
              <Clear />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Price Range */}
        <Accordion defaultExpanded className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
          <AccordionSummary
            expandIcon={<ExpandMore className="text-blue-600" />}
            className="px-6 py-4 min-h-48 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">₹</span>
              </div>
              <Typography variant="subtitle1" className="font-semibold text-gray-800">
                Price Range
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className="px-6 pb-6">
            <Box className="px-2">
              <Slider
                value={filters.priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={filters.priceRange[0]}
                max={filters.priceRange[1]}
                step={1000}
                className="text-blue-600"
                sx={{
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#2563eb',
                    border: '2px solid white',
                    boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#2563eb',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#e5e7eb',
                  },
                }}
              />
              <Box className="flex justify-between items-center mt-4">
                <div className="bg-blue-50 px-3 py-2 rounded-lg">
                  <span className="text-sm font-semibold text-blue-700">₹{filters.priceRange[0].toLocaleString()}</span>
                </div>
                <div className="text-gray-400 mx-2">to</div>
                <div className="bg-blue-50 px-3 py-2 rounded-lg">
                  <span className="text-sm font-semibold text-blue-700">₹{filters.priceRange[1].toLocaleString()}</span>
                </div>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Stock Status */}
        <Accordion className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
          <AccordionSummary
            expandIcon={<ExpandMore className="text-green-600" />}
            className="px-6 py-4 min-h-48 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">✓</span>
              </div>
              <Typography variant="subtitle1" className="font-semibold text-gray-800">
                Availability
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className="px-6 pb-6">
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange({ inStock: e.target.checked })}
                  color="success"
                  sx={{
                    '&.Mui-checked': {
                      color: '#16a34a',
                    },
                  }}
                />
              }
              label={
                <span className="text-gray-700 font-medium">In Stock Only</span>
              }
            />
          </AccordionDetails>
        </Accordion>

        {/* Brands */}
        {uniqueBrands.length > 0 && (
          <Accordion className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
            <AccordionSummary
              expandIcon={<ExpandMore className="text-purple-600" />}
              className="px-6 py-4 min-h-48 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-bold">🏷️</span>
                </div>
                <Typography variant="subtitle1" className="font-semibold text-gray-800">
                  Brands ({uniqueBrands.length})
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className="px-6 pb-6 max-h-64 overflow-y-auto">
              <div className="space-y-3">
                {uniqueBrands.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={
                      <Checkbox
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        color="secondary"
                        size="small"
                        sx={{
                          '&.Mui-checked': {
                            color: '#9333ea',
                          },
                        }}
                      />
                    }
                    label={
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-medium text-gray-700">{brand}</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {products.filter(p => p.brand === brand).length}
                        </span>
                      </div>
                    }
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        )}

        {/* RAM */}
        {uniqueRam.length > 0 && (
          <Accordion className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
            <AccordionSummary
              expandIcon={<ExpandMore className="text-orange-600" />}
              className="px-6 py-4 min-h-48 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-sm font-bold">🧠</span>
                </div>
                <Typography variant="subtitle1" className="font-semibold text-gray-800">
                  RAM ({uniqueRam.length})
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className="px-6 pb-6 max-h-48 overflow-y-auto">
              <div className="space-y-3">
                {uniqueRam.map((ram) => (
                  <FormControlLabel
                    key={ram}
                    control={
                      <Checkbox
                        checked={filters.ram.includes(ram)}
                        onChange={() => handleSpecToggle('ram', ram)}
                        color="warning"
                        size="small"
                        sx={{
                          '&.Mui-checked': {
                            color: '#ea580c',
                          },
                        }}
                      />
                    }
                    label={
                      <span className="text-sm font-medium text-gray-700">{ram}</span>
                    }
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Storage */}
        {uniqueStorage.length > 0 && (
          <Accordion className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
            <AccordionSummary
              expandIcon={<ExpandMore className="text-teal-600" />}
              className="px-6 py-4 min-h-48 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600 text-sm font-bold">💾</span>
                </div>
                <Typography variant="subtitle1" className="font-semibold text-gray-800">
                  Storage ({uniqueStorage.length})
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className="px-6 pb-6 max-h-48 overflow-y-auto">
              <div className="space-y-3">
                {uniqueStorage.map((storage) => (
                  <FormControlLabel
                    key={storage}
                    control={
                      <Checkbox
                        checked={filters.storage.includes(storage)}
                        onChange={() => handleSpecToggle('storage', storage)}
                        color="info"
                        size="small"
                        sx={{
                          '&.Mui-checked': {
                            color: '#0d9488',
                          },
                        }}
                      />
                    }
                    label={
                      <span className="text-sm font-medium text-gray-700">{storage}</span>
                    }
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Operating System */}
        {uniqueOs.length > 0 && (
          <Accordion className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
            <AccordionSummary
              expandIcon={<ExpandMore className="text-indigo-600" />}
              className="px-6 py-4 min-h-48 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 text-sm font-bold">💻</span>
                </div>
                <Typography variant="subtitle1" className="font-semibold text-gray-800">
                  Operating System ({uniqueOs.length})
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className="px-6 pb-6 max-h-48 overflow-y-auto">
              <div className="space-y-3">
                {uniqueOs.map((os) => (
                  <FormControlLabel
                    key={os}
                    control={
                      <Checkbox
                        checked={filters.os.includes(os)}
                        onChange={() => handleSpecToggle('os', os)}
                        color="primary"
                        size="small"
                        sx={{
                          '&.Mui-checked': {
                            color: '#4f46e5',
                          },
                        }}
                      />
                    }
                    label={
                      <span className="text-sm font-medium text-gray-700">{os}</span>
                    }
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Active Filters Summary */}
        {getActiveFilterCount() > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">🎯</span>
                </div>
                <Typography variant="subtitle1" className="font-semibold text-gray-800">
                  Active Filters ({getActiveFilterCount()})
                </Typography>
              </div>
              <Button
                onClick={clearAllFilters}
                size="small"
                variant="outlined"
                className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.brands.map((brand) => (
                <Chip
                  key={brand}
                  label={`🏷️ ${brand}`}
                  size="small"
                  onDelete={() => handleBrandToggle(brand)}
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                />
              ))}
              {filters.ram.map((ram) => (
                <Chip
                  key={ram}
                  label={`🧠 ${ram}`}
                  size="small"
                  onDelete={() => handleSpecToggle('ram', ram)}
                  className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                />
              ))}
              {filters.storage.map((storage) => (
                <Chip
                  key={storage}
                  label={`💾 ${storage}`}
                  size="small"
                  onDelete={() => handleSpecToggle('storage', storage)}
                  className="bg-teal-100 text-teal-800 hover:bg-teal-200"
                />
              ))}
              {filters.os.map((os) => (
                <Chip
                  key={os}
                  label={`💻 ${os}`}
                  size="small"
                  onDelete={() => handleSpecToggle('os', os)}
                  className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                />
              ))}
              {filters.inStock && (
                <Chip
                  label="✅ In Stock Only"
                  size="small"
                  onDelete={() => handleFilterChange({ inStock: false })}
                  className="bg-green-100 text-green-800 hover:bg-green-200"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 -z-10 lg:hidden"
        onClick={onToggle}
      />
    </div>
  );
});

ProductFilters.displayName = 'ProductFilters';

export default ProductFilters;
