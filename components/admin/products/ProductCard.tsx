import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Delete,
} from "@mui/icons-material";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  getProfitMargin: (costPrice: number, sellingPrice: number) => number;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  getProfitMargin,
  onEdit,
  onDelete,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
      <Card className="h-full hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          {/* Product Image */}
          <Box className="relative mb-4 w-full h-48">
            <Image
              src={product.imageUrls[0] || "/images/emptyCart.png"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
            <Box className="absolute top-2 right-2 flex gap-1">
              <IconButton
                size="small"
                onClick={() => onEdit(product)}
                className="bg-white/90 hover:bg-white"
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDelete(product)}
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
  );
};
