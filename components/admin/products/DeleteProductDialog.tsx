import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Product } from "@/types/product";

interface DeleteProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onConfirm: () => void;
}

export const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  open,
  onClose,
  product,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          <strong>{product?.name}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions className="p-4 bg-gray-50">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          className="bg-red-600 hover:bg-red-700"
        >
          Delete Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};
