"use client";

import React from "react";
import { Typography, IconButton, Chip } from "@mui/material";
import { FilterList, Clear } from "@mui/icons-material";
import { FilterState } from "./types";
import { getActiveFilterCount } from "./utils";

interface FilterHeaderProps {
  filters: FilterState;
  onToggle: () => void;
}

const FilterHeader: React.FC<FilterHeaderProps> = React.memo(({
  filters,
  onToggle,
}) => {
  const activeCount = getActiveFilterCount(filters);

  return (
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
          {activeCount > 0 && (
            <Chip
              label={activeCount}
              size="small"
              className="bg-white text-blue-600 font-semibold"
            />
          )}
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Close button clicked, calling onToggle');
              console.log('Current active filters count:', activeCount);
              onToggle();
            }}
            size="small"
            className="text-white hover:bg-white/20 transition-colors duration-200"
            aria-label="Close filters"
          >
            <Clear />
          </IconButton>
        </div>
      </div>
    </div>
  );
});

FilterHeader.displayName = 'FilterHeader';

export default FilterHeader;
