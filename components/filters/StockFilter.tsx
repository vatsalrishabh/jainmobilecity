"use client";

import React from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Checkbox } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FilterState } from "./types";

interface StockFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

const StockFilter: React.FC<StockFilterProps> = React.memo(({
  filters,
  onFilterChange,
}) => {
  return (
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
              onChange={(e) => onFilterChange({ inStock: e.target.checked })}
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
  );
});

StockFilter.displayName = 'StockFilter';

export default StockFilter;
