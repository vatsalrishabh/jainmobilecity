import { useState, useEffect } from "react";
import { Product, FilterState } from "./types";

export const getActiveFilterCount = (filters: FilterState): number => {
  return (
    filters.brands.length +
    filters.ram.length +
    filters.storage.length +
    filters.os.length +
    (filters.inStock ? 1 : 0)
  );
};

export const getUniqueBrands = (products: Product[]): string[] => {
  return Array.from(new Set(products.map(p => p.brand))).sort();
};

export const getUniqueSpecs = (products: Product[], specKey: keyof Product['specifications']): string[] => {
  return Array.from(new Set(products.map(p => p.specifications[specKey]))).filter(Boolean).sort() as string[];
};

export const calculatePriceRange = (products: Product[]): [number, number] => {
  if (products.length === 0) return [0, 200000];

  const prices = products.map(p => p.sellingPrice);
  const minPrice = Math.floor(Math.min(...prices) / 1000) * 1000;
  const maxPrice = Math.ceil(Math.max(...prices) / 1000) * 1000;

  return [minPrice, maxPrice];
};

export const getFilterWidth = (windowWidth: number): string => {
  if (windowWidth >= 1280) return "lg:w-80"; // xl screens
  if (windowWidth >= 1024) return "lg:w-72"; // lg screens
  return "lg:w-80"; // default
};

// Custom hook to safely get window dimensions on client side only
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 1024, // Default desktop width
    height: 768,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side
    setIsClient(true);

    // Set initial window size
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Update size on mount
    updateSize();

    // Add event listener
    window.addEventListener('resize', updateSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { windowSize, isClient };
};
