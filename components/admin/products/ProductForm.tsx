import React from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Box,
  Button,
  Typography,
} from "@mui/material";
import {
  CloudUpload,
} from "@mui/icons-material";
import Image from "next/image";

interface ProductFormProps {
  form: {
    name: string;
    brand: string;
    modelNumber: string;
    description: string;
    specifications: {
      ram: string;
      storage: string;
      processor: string;
      battery: string;
      display: string;
      camera: string;
      os: string;
    };
    costPrice: string;
    sellingPrice: string;
    stock: string;
    imageUrls: string[];
  };
  uploadingImages: boolean;
  onInputChange: (field: string, value: string | number, specField?: string) => void;
  onImageUpload: (files: FileList) => void;
  onRemoveImage: (index: number) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  form,
  uploadingImages,
  onInputChange,
  onImageUpload,
  onRemoveImage,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Product Name *"
          value={form.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Brand *"
          value={form.brand}
          onChange={(e) => onInputChange("brand", e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Model Number"
          value={form.modelNumber}
          onChange={(e) => onInputChange("modelNumber", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Description"
          value={form.description}
          onChange={(e) => onInputChange("description", e.target.value)}
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
              onChange={(e) => onInputChange("", e.target.value, "ram")}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Storage *"
              value={form.specifications.storage}
              onChange={(e) => onInputChange("", e.target.value, "storage")}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Processor"
              value={form.specifications.processor}
              onChange={(e) => onInputChange("", e.target.value, "processor")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Battery"
              value={form.specifications.battery}
              onChange={(e) => onInputChange("", e.target.value, "battery")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Display"
              value={form.specifications.display}
              onChange={(e) => onInputChange("", e.target.value, "display")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Camera"
              value={form.specifications.camera}
              onChange={(e) => onInputChange("", e.target.value, "camera")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Operating System"
              value={form.specifications.os}
              onChange={(e) => onInputChange("", e.target.value, "os")}
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
          onChange={(e) => onInputChange("costPrice", e.target.value)}
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
          onChange={(e) => onInputChange("sellingPrice", e.target.value)}
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
          onChange={(e) => onInputChange("stock", e.target.value)}
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
            onChange={(e) => {
              console.log("File input changed:", e.target.files);
              if (e.target.files) {
                onImageUpload(e.target.files);
              }
            }}
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
                    Uploaded Images: ({form.imageUrls.length}/3)
                  </Typography>
                  <Grid container spacing={2}>
                    {form.imageUrls.map((url, index) => (
                      <Grid item key={index}>
                        <Box className="relative w-20 h-20">
                          <Image
                            src={url}
                            alt={`Product ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <Button
                            size="small"
                            onClick={() => onRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white hover:bg-red-600 min-w-6 h-6 p-0"
                          >
                            ×
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Image limit warning */}
              {form.imageUrls.length >= 3 && (
                <Typography variant="caption" className="text-orange-600 mt-2 block">
                  Maximum 3 images allowed per product
                </Typography>
              )}
      </Grid>
    </Grid>
  );
};
