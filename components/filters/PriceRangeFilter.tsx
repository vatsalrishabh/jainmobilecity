"use client";

import React from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Box, Slider } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FilterState } from "./types";

interface PriceRangeFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = React.memo(({
  filters,
  onFilterChange,
}) => {
  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as [number, number];
    onFilterChange({ priceRange: value });
  };

  return (
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
  );
});

PriceRangeFilter.displayName = 'PriceRangeFilter';

export default PriceRangeFilter;
