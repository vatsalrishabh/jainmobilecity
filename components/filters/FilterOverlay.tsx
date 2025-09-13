"use client";

import React from "react";

interface FilterOverlayProps {
  isOpen: boolean;
  windowWidth: number;
  onToggle: () => void;
}

const FilterOverlay: React.FC<FilterOverlayProps> = React.memo(({
  isOpen,
  windowWidth,
  onToggle,
}) => {
  // Only render on client side to avoid SSR issues
  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && windowWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Mobile overlay clicked');
            console.log('Calling onToggle from mobile overlay');
            onToggle();
          }}
        />
      )}

      {/* Desktop Overlay */}
      {isOpen && windowWidth >= 1024 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 transition-opacity duration-200"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Desktop overlay clicked');
            console.log('Calling onToggle from desktop overlay');
            onToggle();
          }}
        />
      )}
    </>
  );
});

FilterOverlay.displayName = 'FilterOverlay';

export default FilterOverlay;
