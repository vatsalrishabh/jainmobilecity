"use client";

import React from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Checkbox } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { BrandFilterProps } from "./types";

const BrandFilter: React.FC<BrandFilterProps> = React.memo(({
  filters,
  onFilterChange,
  uniqueBrands,
  products,
}) => {
  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ brands: newBrands });
  };

  if (uniqueBrands.length === 0) return null;

  return (
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
  );
});

BrandFilter.displayName = 'BrandFilter';

export default BrandFilter;
