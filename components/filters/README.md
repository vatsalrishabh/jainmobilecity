# Product Filters Components

This directory contains the segregated components for the ProductFilters functionality, breaking down a large monolithic component into smaller, maintainable pieces.

## 📁 Structure

```
components/filters/
├── index.ts              # Export file for all components
├── types.ts              # Shared TypeScript interfaces
├── utils.ts              # Utility functions
├── FilterHeader.tsx      # Header with title, close button, and active count
├── PriceRangeFilter.tsx  # Price range slider component
├── StockFilter.tsx       # In-stock availability filter
├── BrandFilter.tsx       # Brand selection filter
├── SpecFilter.tsx        # Generic component for RAM, Storage, OS filters
├── ActiveFilters.tsx     # Active filters summary and clear all
├── MobileFilterButton.tsx # Floating button for mobile devices
├── FilterOverlay.tsx     # Overlay components for mobile and desktop
└── README.md            # This documentation
```

## 🧩 Components Overview

### Core Components
- **FilterHeader**: Displays the filter title, active filter count, and close button
- **PriceRangeFilter**: Handles price range selection with a slider
- **StockFilter**: Toggle for in-stock products only
- **BrandFilter**: Multi-select for product brands with product counts
- **SpecFilter**: Reusable component for RAM, Storage, and OS specifications
- **ActiveFilters**: Shows currently active filters as chips with remove functionality

### UI Components
- **MobileFilterButton**: Floating action button for mobile devices
- **FilterOverlay**: Background overlay for both mobile and desktop

### Supporting Files
- **types.ts**: All TypeScript interfaces and types
- **utils.ts**: Helper functions for data processing and calculations
- **index.ts**: Centralized exports for easy importing

## 🎯 Benefits of Segregation

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be reused in different contexts
3. **Testability**: Smaller components are easier to test
4. **Performance**: Better code splitting and tree shaking
5. **Developer Experience**: Easier to locate and modify specific functionality

## 🔧 Usage

```tsx
import { ProductFilters } from './components/ProductFilters';
// or import individual components
import { FilterHeader, PriceRangeFilter } from './components/filters';
```

## 📝 Key Features

- **Responsive Design**: Automatic mobile/desktop behavior switching
- **Type Safety**: Full TypeScript support with proper interfaces
- **Performance Optimized**: Uses React.memo and proper key props
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Consistent Styling**: Unified design system across all components

## 🚀 Migration Notes

The original monolithic `ProductFilters.tsx` (604 lines) has been broken down into:
- 8 focused components
- 1 utility file
- 1 types file
- 1 index file

All functionality remains identical while improving code organization and maintainability.
