import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import {
  Inventory,
  AttachMoney,
  BrandingWatermark,
  TrendingUp,
} from "@mui/icons-material";
import { Product } from "@/types/product";

interface ProductStatsCardsProps {
  products: Product[];
  getProfitMargin: (costPrice: number, sellingPrice: number) => number;
}

export const ProductStatsCards: React.FC<ProductStatsCardsProps> = ({
  products,
  getProfitMargin,
}) => {
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));
  const totalValue = products.reduce((sum, p) => sum + (p.sellingPrice * p.stock), 0);
  const averageProfitMargin = products.length > 0
    ? products.reduce((sum, p) => sum + getProfitMargin(p.costPrice, p.sellingPrice), 0) / products.length
    : 0;

  return (
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
                  ₹{totalValue.toLocaleString()}
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

      <Grid item xs={12} sm={6} md={3}>
        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {averageProfitMargin.toFixed(1)}%
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Avg Profit Margin
                </Typography>
              </Box>
              <TrendingUp sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
