"use client";

import React from "react";
import { Button } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { FilterState } from "./types";
import { getActiveFilterCount } from "./utils";

interface MobileFilterButtonProps {
  filters: FilterState;
  onToggle: () => void;
}

const MobileFilterButton: React.FC<MobileFilterButtonProps> = React.memo(({
  filters,
  onToggle,
}) => {
  const activeCount = getActiveFilterCount(filters);

  return (
    <div className="fixed left-4 top-20 z-40 lg:hidden">
      <Button
        variant="contained"
        startIcon={<FilterList />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Mobile filter button clicked, calling onToggle');
          console.log('Current active filters count:', activeCount);
          onToggle();
        }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 rounded-xl"
      >
        <span className="font-semibold">
          Filters {activeCount > 0 && `(${activeCount})`}
        </span>
      </Button>
    </div>
  );
});

MobileFilterButton.displayName = 'MobileFilterButton';

export default MobileFilterButton;
