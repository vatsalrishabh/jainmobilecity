import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import {
  Close,
} from "@mui/icons-material";
import { ProductForm } from "./ProductForm";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
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
  onCreate: () => void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onClose,
  form,
  uploadingImages,
  onInputChange,
  onImageUpload,
  onRemoveImage,
  onCreate,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle className="bg-blue-50">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <span className="font-semibold">Add New Product</span>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className="pt-4">
        <ProductForm
          form={form}
          uploadingImages={uploadingImages}
          onInputChange={onInputChange}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
        />
      </DialogContent>
      <DialogActions className="p-4 bg-gray-50">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onCreate}
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};
