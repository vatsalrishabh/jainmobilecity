"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const CRUDProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleCreate = () => {
    const newProduct: Product = {
      id: Date.now(),
      ...form,
    };
    setProducts([...products, newProduct]);
    setForm({ name: "", price: 0, description: "" });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const openEditDialog = (product: Product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setIsEditOpen(true);
  };

  const handleEditSave = () => {
    if (editId !== null) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, ...form } : p))
      );
      setIsEditOpen(false);
      setEditId(null);
      setForm({ name: "", price: 0, description: "" });
    }
  };

  return (
    <Box p={4} className="bg-white rounded-xl shadow-sm max-w-5xl mx-auto">
      <Typography variant="h5" sx={{ color: "#822F2F", fontWeight: 600, mb: 3 }}>
        Add New Product
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Price (₹)"
              name="price"
              value={form.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                bgcolor: "#822F2F",
                "&:hover": { bgcolor: "#6f2626" },
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" sx={{ color: "#822F2F", fontWeight: 600, mb: 2 }}>
        Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} md={6} key={product.id}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #eee",
                boxShadow: 1,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "#822F2F", fontWeight: 500 }}>
                  {product.name}
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>₹{product.price}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>

                <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                  <IconButton onClick={() => openEditDialog(product)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <Delete sx={{ color: "#d32f2f" }} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={form.price}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleEditSave}
            sx={{
              bgcolor: "#822F2F",
              "&:hover": { bgcolor: "#6f2626" },
              color: "#fff",
              borderRadius: 2,
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CRUDProducts;
