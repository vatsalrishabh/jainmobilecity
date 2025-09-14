"use client";

import React from "react";
import { Typography, Button, Chip } from "@mui/material";
import { FilterState } from "./types";
import { getActiveFilterCount } from "./utils";

interface ActiveFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = React.memo(({
  filters,
  onFilterChange,
}) => {
  const activeCount = getActiveFilterCount(filters);

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.filter(b => b !== brand);
    onFilterChange({ brands: newBrands });
  };

  const handleSpecToggle = (specType: 'ram' | 'storage' | 'os', value: string) => {
    const currentSpecs = filters[specType] as string[];
    const newSpecs = currentSpecs.filter(s => s !== value);
    onFilterChange({ [specType]: newSpecs });
  };

  const clearAllFilters = () => {
    const resetFilters: Partial<FilterState> = {
      brands: [],
      ram: [],
      storage: [],
      os: [],
      inStock: false,
    };
    onFilterChange(resetFilters);
  };

  if (activeCount === 0) return null;

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-sm font-bold">🎯</span>
          </div>
          <Typography variant="subtitle1" className="font-semibold text-gray-800">
            Active Filters ({activeCount})
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

      {/* Desktop Close Button - Temporarily disabled to test black screen issue */}
      {/* <div className="hidden lg:flex justify-center mt-6 pt-4 border-t border-gray-200">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Desktop Close Filters button clicked');
            onToggle();
          }}
          variant="contained"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-2"
        >
          Close Filters
        </Button>
      </div> */}

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
            onDelete={() => onFilterChange({ inStock: false })}
            className="bg-green-100 text-green-800 hover:bg-green-200"
          />
        )}
      </div>
    </div>
  );
});

ActiveFilters.displayName = 'ActiveFilters';

export default ActiveFilters;
