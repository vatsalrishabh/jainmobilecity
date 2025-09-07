import React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  Sort,
  Add,
} from "@mui/icons-material";

interface ProductControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  brandFilter: string;
  setBrandFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  uniqueBrands: string[];
  onAddProduct: () => void;
}

export const ProductControls: React.FC<ProductControlsProps> = ({
  searchTerm,
  setSearchTerm,
  brandFilter,
  setBrandFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  uniqueBrands,
  onAddProduct,
}) => {
  return (
    <Paper elevation={2} className="p-6 mb-8 rounded-xl">
      <Box display="flex" flexWrap="wrap" gap={3} alignItems="center" justifyContent="space-between">
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            className="min-w-64"
          />

          <FormControl className="min-w-32">
            <InputLabel>Brand</InputLabel>
            <Select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              label="Brand"
            >
              <MenuItem value="all">All Brands</MenuItem>
              {uniqueBrands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="min-w-32">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="brand">Brand</MenuItem>
              <MenuItem value="sellingPrice">Price</MenuItem>
              <MenuItem value="stock">Stock</MenuItem>
              <MenuItem value="createdAt">Date</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            startIcon={<Sort />}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </Button>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAddProduct}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Product
        </Button>
      </Box>
    </Paper>
  );
};
