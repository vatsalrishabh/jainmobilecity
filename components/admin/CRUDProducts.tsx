"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  Sort,
  Visibility,
  Inventory,
  AttachMoney,
  Category,
  BrandingWatermark,
  Edit,
  Delete,
  CloudUpload,
  Image,
  Close,
  Save,
  Cancel,
} from "@mui/icons-material";
import { Product } from "@/types/product";

interface CRUDProductsProps {
  changeRightComponent: (component: string) => void;
}

const CRUDProducts: React.FC<CRUDProductsProps> = ({ changeRightComponent }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const [form, setForm] = useState({
    name: "",
    brand: "",
    modelNumber: "",
    description: "",
    specifications: {
      ram: "",
      storage: "",
      processor: "",
      battery: "",
      display: "",
      camera: "",
      os: "",
    },
    costPrice: "",
    sellingPrice: "",
    stock: "",
    imageUrls: [] as string[],
  });

  const [uploadingImages, setUploadingImages] = useState(false);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      showSnackbar("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.modelNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply brand filter
    if (brandFilter !== "all") {
      filtered = filtered.filter((product) => product.brand === brandFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Product];
      let bValue: any = b[sortBy as keyof Product];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, brandFilter, sortBy, sortOrder]);

  // Handle file uploads
  const handleImageUpload = async (files: FileList) => {
    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.fileUrl);
        } else {
          throw new Error("Failed to upload image");
        }
      }

      setForm((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...uploadedUrls],
      }));

      showSnackbar("Images uploaded successfully!", "success");
    } catch (error) {
      console.error("Error uploading images:", error);
      showSnackbar("Failed to upload images", "error");
    } finally {
      setUploadingImages(false);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  // Handle form input changes
  const handleInputChange = (
    field: string,
    value: string | number,
    specField?: string
  ) => {
    if (specField) {
      setForm((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specField]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      modelNumber: "",
      description: "",
      specifications: {
        ram: "",
        storage: "",
        processor: "",
        battery: "",
        display: "",
        camera: "",
        os: "",
      },
      costPrice: "",
      sellingPrice: "",
      stock: "",
      imageUrls: [],
    });
  };

  // Create product
  const handleCreate = async () => {
    if (!form.name || !form.brand || !form.specifications.ram || !form.specifications.storage) {
      showSnackbar("Please fill in all required fields", "warning");
      return;
    }

    try {
      const productData = {
        ...form,
        costPrice: parseFloat(form.costPrice),
        sellingPrice: parseFloat(form.sellingPrice),
        stock: parseInt(form.stock),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        showSnackbar("Product created successfully!", "success");
        setIsAddDialogOpen(false);
        resetForm();
        fetchProducts();
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      showSnackbar("Failed to create product", "error");
    }
  };

  // Edit product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      brand: product.brand,
      modelNumber: product.modelNumber || "",
      description: product.description || "",
      specifications: {
        ram: product.specifications.ram,
        storage: product.specifications.storage,
        processor: product.specifications.processor || "",
        battery: product.specifications.battery || "",
        display: product.specifications.display || "",
        camera: product.specifications.camera || "",
        os: product.specifications.os || "",
      },
      costPrice: product.costPrice.toString(),
      sellingPrice: product.sellingPrice.toString(),
      stock: product.stock.toString(),
      imageUrls: product.imageUrls,
    });
    setIsEditDialogOpen(true);
  };

  // Update product
  const handleUpdate = async () => {
    if (!editingProduct) return;

    try {
      const productData = {
        ...form,
        costPrice: parseFloat(form.costPrice),
        sellingPrice: parseFloat(form.sellingPrice),
        stock: parseInt(form.stock),
      };

      const response = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...productData, _id: editingProduct._id }),
      });

      if (response.ok) {
        showSnackbar("Product updated successfully!", "success");
        setIsEditDialogOpen(false);
        setEditingProduct(null);
        resetForm();
        fetchProducts();
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showSnackbar("Failed to update product", "error");
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (!deletingProduct) return;

    try {
      const response = await fetch(`/api/products?id=${deletingProduct._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showSnackbar("Product deleted successfully!", "success");
        setIsDeleteDialogOpen(false);
        setDeletingProduct(null);
        fetchProducts();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showSnackbar("Failed to delete product", "error");
    }
  };

  // Show snackbar
  const showSnackbar = (message: string, severity: "success" | "error" | "warning" | "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // Get profit margin
  const getProfitMargin = (costPrice: number, sellingPrice: number) => {
    if (costPrice === 0) return 0;
    return ((sellingPrice - costPrice) / costPrice) * 100;
  };

  // Get unique brands for filter
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));

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
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="font-bold">
                    {products.length}
                  </Typography>
                  <Typography variant="body2" className="opacity-90">
                    Total Products
                  </Typography>
                </Box>
                <Inventory sx={{ fontSize: 60, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="font-bold">
                    {products.reduce((sum, p) => sum + p.stock, 0)}
                  </Typography>
                  <Typography variant="body2" className="opacity-90">
                    Total Stock
                  </Typography>
                </Box>
                <Inventory sx={{ fontSize: 60, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="font-bold">
                    {uniqueBrands.length}
                  </Typography>
                  <Typography variant="body2" className="opacity-90">
                    Brands
                  </Typography>
                </Box>
                <BrandingWatermark sx={{ fontSize: 60, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="font-bold">
                    ₹{products.reduce((sum, p) => sum + (p.sellingPrice * p.stock), 0).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" className="opacity-90">
                    Total Value
                  </Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 60, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Controls */}
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
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add New Product
          </Button>
        </Box>
      </Paper>

      {/* Products Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={8}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  {/* Product Image */}
                  <Box className="relative mb-4">
                    <img
                      src={product.imageUrls[0] || "/images/emptyCart.png"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Box className="absolute top-2 right-2 flex gap-1">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(product)}
                        className="bg-white/90 hover:bg-white"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setDeletingProduct(product);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="bg-white/90 hover:bg-white text-red-600"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Product Info */}
                  <Typography variant="h6" className="font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </Typography>
                  
                  <Box className="space-y-2 mb-3">
                    <Chip
                      label={product.brand}
                      size="small"
                      className="bg-blue-100 text-blue-800"
                    />
                    <Chip
                      label={`${product.specifications.ram} RAM`}
                      size="small"
                      className="bg-green-100 text-green-800"
                    />
                    <Chip
                      label={`${product.specifications.storage}`}
                      size="small"
                      className="bg-purple-100 text-purple-800"
                    />
                  </Box>

                  <Box className="space-y-2">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" className="text-gray-600">
                        Cost Price:
                      </Typography>
                      <Typography variant="body2" className="font-semibold">
                        ₹{product.costPrice.toLocaleString()}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" className="text-gray-600">
                        Selling Price:
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-green-600">
                        ₹{product.sellingPrice.toLocaleString()}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" className="text-gray-600">
                        Stock:
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`font-semibold ${
                          product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"
                        }`}
                      >
                        {product.stock} units
                      </Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" className="text-gray-600">
                        Profit Margin:
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`font-semibold ${
                          getProfitMargin(product.costPrice, product.sellingPrice) > 20
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {getProfitMargin(product.costPrice, product.sellingPrice).toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Product Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="bg-blue-50">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" className="font-semibold">
              Add New Product
            </Typography>
            <IconButton onClick={() => setIsAddDialogOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent className="pt-4">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name *"
                value={form.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Brand *"
                value={form.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Model Number"
                value={form.modelNumber}
                onChange={(e) => handleInputChange("modelNumber", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description"
                value={form.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            
            {/* Specifications */}
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-3">
                Specifications
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="RAM *"
                    value={form.specifications.ram}
                    onChange={(e) => handleInputChange("", e.target.value, "ram")}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Storage *"
                    value={form.specifications.storage}
                    onChange={(e) => handleInputChange("", e.target.value, "storage")}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Processor"
                    value={form.specifications.processor}
                    onChange={(e) => handleInputChange("", e.target.value, "processor")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Battery"
                    value={form.specifications.battery}
                    onChange={(e) => handleInputChange("", e.target.value, "battery")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Display"
                    value={form.specifications.display}
                    onChange={(e) => handleInputChange("", e.target.value, "display")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Camera"
                    value={form.specifications.camera}
                    onChange={(e) => handleInputChange("", e.target.value, "camera")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Operating System"
                    value={form.specifications.os}
                    onChange={(e) => handleInputChange("", e.target.value, "os")}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Pricing and Stock */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Cost Price *"
                type="number"
                value={form.costPrice}
                onChange={(e) => handleInputChange("costPrice", e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Selling Price *"
                type="number"
                value={form.sellingPrice}
                onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Stock *"
                type="number"
                value={form.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                required
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-3">
                Product Images
              </Typography>
              
              <Box className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    disabled={uploadingImages}
                    className="cursor-pointer"
                  >
                    {uploadingImages ? "Uploading..." : "Upload Images"}
                  </Button>
                </label>
                <Typography variant="body2" className="text-gray-500 mt-2">
                  Drag and drop images here or click to browse
                </Typography>
                <Typography variant="caption" className="text-gray-400">
                  Supports JPEG, PNG, WebP up to 5MB each
                </Typography>
              </Box>

              {/* Display uploaded images */}
              {form.imageUrls.length > 0 && (
                <Box className="mt-4">
                  <Typography variant="subtitle2" className="mb-2">
                    Uploaded Images:
                  </Typography>
                  <Grid container spacing={2}>
                    {form.imageUrls.map((url, index) => (
                      <Grid item key={index}>
                        <Box className="relative">
                          <img
                            src={url}
                            alt={`Product ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <IconButton
                            size="small"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white hover:bg-red-600"
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="p-4 bg-gray-50">
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="bg-green-50">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" className="font-semibold">
              Edit Product
            </Typography>
            <IconButton onClick={() => setIsEditDialogOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent className="pt-4">
          {/* Same form fields as Add Dialog */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name *"
                value={form.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Brand *"
                value={form.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Model Number"
                value={form.modelNumber}
                onChange={(e) => handleInputChange("modelNumber", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description"
                value={form.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            
            {/* Specifications */}
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-3">
                Specifications
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="RAM *"
                    value={form.specifications.ram}
                    onChange={(e) => handleInputChange("", e.target.value, "ram")}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Storage *"
                    value={form.specifications.storage}
                    onChange={(e) => handleInputChange("", e.target.value, "storage")}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Processor"
                    value={form.specifications.processor}
                    onChange={(e) => handleInputChange("", e.target.value, "processor")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Battery"
                    value={form.specifications.battery}
                    onChange={(e) => handleInputChange("", e.target.value, "battery")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Display"
                    value={form.specifications.display}
                    onChange={(e) => handleInputChange("", e.target.value, "display")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Camera"
                    value={form.specifications.camera}
                    onChange={(e) => handleInputChange("", e.target.value, "camera")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Operating System"
                    value={form.specifications.os}
                    onChange={(e) => handleInputChange("", e.target.value, "os")}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Pricing and Stock */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Cost Price *"
                type="number"
                value={form.costPrice}
                onChange={(e) => handleInputChange("costPrice", e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Selling Price *"
                type="number"
                value={form.sellingPrice}
                onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Stock *"
                type="number"
                value={form.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                required
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-3">
                Product Images
              </Typography>
              
              <Box className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload-edit"
                />
                <label htmlFor="image-upload-edit">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    disabled={uploadingImages}
                    className="cursor-pointer"
                  >
                    {uploadingImages ? "Uploading..." : "Upload Images"}
                  </Button>
                </label>
                <Typography variant="body2" className="text-gray-500 mt-2">
                  Drag and drop images here or click to browse
                </Typography>
                <Typography variant="caption" className="text-gray-400">
                  Supports JPEG, PNG, WebP up to 5MB each
                </Typography>
              </Box>

              {/* Display uploaded images */}
              {form.imageUrls.length > 0 && (
                <Box className="mt-4">
                  <Typography variant="subtitle2" className="mb-2">
                    Current Images:
                  </Typography>
                  <Grid container spacing={2}>
                    {form.imageUrls.map((url, index) => (
                      <Grid item key={index}>
                        <Box className="relative">
                          <img
                            src={url}
                            alt={`Product ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <IconButton
                            size="small"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white hover:bg-red-600"
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="p-4 bg-gray-50">
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            className="bg-green-600 hover:bg-green-700"
          >
            Update Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="bg-red-50">
          <Typography variant="h6" className="font-semibold text-red-800">
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent className="pt-4">
          <Typography variant="body1">
            Are you sure you want to delete{" "}
            <strong>{deletingProduct?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4 bg-gray-50">
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Product
          </Button>
        </DialogActions>
      </Dialog>

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
