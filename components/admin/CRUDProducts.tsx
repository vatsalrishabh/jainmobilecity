"use client";

import React from "react";
import {
  Typography,
  Box,
  Grid,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useProductManagement } from "./hooks/useProductManagement";
import { ProductStatsCards } from "./products/ProductStatsCards";
import { ProductControls } from "./products/ProductControls";
import { ProductCard } from "./products/ProductCard";
import { AddProductDialog } from "./products/AddProductDialog";
import { EditProductDialog } from "./products/EditProductDialog";
import { DeleteProductDialog } from "./products/DeleteProductDialog";

interface CRUDProductsProps {
  changeRightComponent: (component: string) => void;
}

const CRUDProducts: React.FC<CRUDProductsProps> = () => {
  const {
    products,
    filteredProducts,
    loading,
    searchTerm,
    setSearchTerm,
    brandFilter,
    setBrandFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deletingProduct,
    setDeletingProduct,
    snackbar,
    setSnackbar,
    form,
    uploadingImages,
    handleImageUpload,
    removeImage,
    handleInputChange,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    getProfitMargin,
    uniqueBrands,
  } = useProductManagement();

  return (
    <Box className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h4" className="text-gray-800 font-bold mb-2">
          Product Management
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Manage your smartphone inventory with full CRUD operations
        </Typography>
      </Box>

      {/* Stats Cards */}
      <ProductStatsCards
        products={products}
        getProfitMargin={getProfitMargin}
      />

      {/* Controls */}
      <ProductControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        uniqueBrands={uniqueBrands}
        onAddProduct={() => setIsAddDialogOpen(true)}
      />

      {/* Products Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={8}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              getProfitMargin={getProfitMargin}
              onEdit={handleEdit}
              onDelete={(product) => {
                setDeletingProduct(product);
                setIsDeleteDialogOpen(true);
              }}
            />
          ))}
        </Grid>
      )}

      {/* Add Product Dialog */}
      <AddProductDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        form={form}
        uploadingImages={uploadingImages}
        onInputChange={handleInputChange}
        onImageUpload={handleImageUpload}
        onRemoveImage={removeImage}
        onCreate={handleCreate}
      />

      {/* Edit Product Dialog */}
      <EditProductDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        form={form}
        uploadingImages={uploadingImages}
        onInputChange={handleInputChange}
        onImageUpload={handleImageUpload}
        onRemoveImage={removeImage}
        onUpdate={handleUpdate}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        product={deletingProduct}
        onConfirm={handleDelete}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          className="w-full"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CRUDProducts;
