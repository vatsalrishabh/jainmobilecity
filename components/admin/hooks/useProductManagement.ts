import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";

export const useProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        // Map id to _id for frontend compatibility
        const mappedData = data.map((product: Product) => ({
          ...product,
          _id: product.id || product._id
        }));
        setProducts(mappedData);
        setFilteredProducts(mappedData);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      showSnackbar("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
      let aValue: string | number = a[sortBy as keyof Product] as string | number;
      let bValue: string | number = b[sortBy as keyof Product] as string | number;

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

  // Handle file uploads (max 3 images)
  const handleImageUpload = async (files: FileList) => {
    console.log("handleImageUpload called with files:", files);
    console.log("Number of files:", files.length);

    const currentImageCount = form.imageUrls.length;
    const remainingSlots = 3 - currentImageCount;

    console.log("Current images:", currentImageCount, "Remaining slots:", remainingSlots);

    if (remainingSlots <= 0) {
      showSnackbar("Maximum 3 images allowed per product", "warning");
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    console.log("Files to upload:", filesToUpload.length);

    if (filesToUpload.length === 0) {
      showSnackbar("No images to upload", "info");
      return;
    }

    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of filesToUpload) {
        console.log("Uploading file:", file.name, "Size:", file.size);

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        console.log("Upload response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Upload response data:", data);
          uploadedUrls.push(data.fileUrl);
        } else {
          const errorText = await response.text();
          console.error("Upload failed:", errorText);
          throw new Error("Failed to upload image");
        }
      }

      console.log("All uploads completed, URLs:", uploadedUrls);

      setForm((prev) => {
        const newImageUrls = [...prev.imageUrls, ...uploadedUrls];
        console.log("Previous imageUrls:", prev.imageUrls);
        console.log("New imageUrls:", newImageUrls);
        return {
          ...prev,
          imageUrls: newImageUrls,
        };
      });

      console.log("Form updated with new image URLs");

      const uploadedCount = uploadedUrls.length;
      const rejectedCount = files.length - uploadedCount;

      let message = `${uploadedCount} image${uploadedCount > 1 ? 's' : ''} uploaded successfully!`;
      if (rejectedCount > 0) {
        message += ` (${rejectedCount} rejected - max 3 images allowed)`;
      }

      showSnackbar(message, "success");
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

    console.log("handleCreate called with form:", form);
    console.log("Form imageUrls:", form.imageUrls);

    try {
      const productData = {
        ...form,
        costPrice: parseFloat(form.costPrice),
        sellingPrice: parseFloat(form.sellingPrice),
        stock: parseInt(form.stock),
      };

      console.log("Sending productData to API:", productData);

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      console.log("API response status:", response.status);

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
    console.log("handleEdit called with product:", product);
    console.log("product._id:", product._id);
    console.log("product.id:", product.id);
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

    console.log("handleUpdate called with editingProduct:", editingProduct);
    console.log("editingProduct._id:", editingProduct._id);
    console.log("editingProduct.id:", editingProduct.id);

    try {
      const productData = {
        ...form,
        costPrice: parseFloat(form.costPrice),
        sellingPrice: parseFloat(form.sellingPrice),
        stock: parseInt(form.stock),
      };

      const productId = editingProduct._id || editingProduct.id;
      console.log("Using product ID for update:", productId);
      const requestBody = { ...productData, id: productId };
      console.log("PUT request body:", requestBody);

      const response = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
      const response = await fetch(`/api/products?id=${deletingProduct._id || deletingProduct.id}`, {
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

  return {
    // State
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
    editingProduct,
    setEditingProduct,
    deletingProduct,
    setDeletingProduct,
    snackbar,
    setSnackbar,
    form,
    setForm,
    uploadingImages,

    // Actions
    handleImageUpload,
    removeImage,
    handleInputChange,
    resetForm,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    showSnackbar,
    getProfitMargin,
    uniqueBrands,
    fetchProducts,
  };
};
