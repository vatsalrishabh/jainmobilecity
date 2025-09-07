"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Search,
  TrendingUp,
  ShoppingCart,
  AttachMoney,
  Visibility,
  Download,
  CheckCircle,
  LocalShipping,
  Pending,
  Build,
} from "@mui/icons-material";

interface Order {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  products: Array<{ name: string; quantity: number }>;
  totalAmount: number;
  status: string;
  date: string;
  paymentMethod: string;
  mobile: string;
}

interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  completedOrders: number;
  totalCustomers: number;
  currentMonthRevenue: number;
}

interface SalesData {
  metrics: SalesMetrics;
  orders: Order[];
  recentOrders: Order[];
}

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await fetch('/api/admin/sales', {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        setSalesData(data);
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'shipped':
        return 'info';
      case 'pending':
        return 'warning';
      case 'processing':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle />;
      case 'shipped':
        return <LocalShipping />;
      case 'pending':
        return <Pending />;
      case 'processing':
        return <Build />;
      default:
        return <Build />;
    }
  };

  const filteredOrders = salesData?.orders.filter(order => {
    const matchesSearch = searchTerm === "" ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDate = dateFilter === "" || order.date.includes(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  }) || [];

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  if (loading) {
    return (
      <Box className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </Box>
    );
  }

  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h4" className="text-gray-800 font-bold mb-2">
          Sales Dashboard
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Monitor your sales performance and order management
        </Typography>
      </Box>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  ₹{salesData?.metrics.totalRevenue.toLocaleString() || 0}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Total Revenue
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <TrendingUp fontSize="small" />
                  <Typography variant="caption">
                    +{((salesData?.metrics.currentMonthRevenue || 0) / (salesData?.metrics.totalRevenue || 1) * 100).toFixed(1)}% this month
                  </Typography>
                </Box>
              </Box>
              <AttachMoney sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {salesData?.metrics.totalOrders || 0}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Total Orders
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <ShoppingCart fontSize="small" />
                  <Typography variant="caption">
                    Active orders
                  </Typography>
                </Box>
              </Box>
              <ShoppingCart sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  ₹{salesData?.metrics.avgOrderValue.toLocaleString() || 0}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Avg Order Value
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <TrendingUp fontSize="small" />
                  <Typography variant="caption">
                    Per transaction
                  </Typography>
                </Box>
              </Box>
              <AttachMoney sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {salesData?.metrics.completedOrders || 0}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Completed Orders
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <CheckCircle fontSize="small" />
                  <Typography variant="caption">
                    Successfully delivered
                  </Typography>
                </Box>
              </Box>
              <CheckCircle sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Paper elevation={2} className="p-6 mb-6">
        <Box display="flex" gap={3} alignItems="center" flexWrap="wrap">
          <TextField
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            className="min-w-80"
          />

          <FormControl className="min-w-40">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="Date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            className="min-w-40"
          />

          <Button
            variant="outlined"
            startIcon={<Download />}
            className="ml-auto"
          >
            Export Data
          </Button>
        </Box>
      </Paper>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell className="font-semibold">Order ID</TableCell>
                  <TableCell className="font-semibold">Customer</TableCell>
                  <TableCell className="font-semibold">Products</TableCell>
                  <TableCell className="font-semibold">Total Amount</TableCell>
                  <TableCell className="font-semibold">Status</TableCell>
                  <TableCell className="font-semibold">Date</TableCell>
                  <TableCell className="font-semibold">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Typography variant="body2" className="font-mono font-semibold">
                        {order.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" className="font-semibold">
                          {order.customer}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          {order.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        {order.products.slice(0, 2).map((product, index) => (
                          <Typography key={index} variant="body2" className="text-gray-700">
                            {product.name} × {product.quantity}
                          </Typography>
                        ))}
                        {order.products.length > 2 && (
                          <Typography variant="caption" className="text-gray-500">
                            +{order.products.length - 2} more items
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="font-semibold text-green-600">
                        ₹{order.totalAmount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(order.status)}
                        label={order.status}
                        color={getStatusColor(order.status) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredOrders.length === 0 && (
            <Box className="text-center py-12">
              <Typography variant="h6" className="text-gray-500 mb-2">
                No orders found
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Try adjusting your search or filter criteria
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog
        open={orderDetailsOpen}
        onClose={() => setOrderDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Order Details - {selectedOrder?.orderId}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box className="space-y-4">
              <Box className="grid grid-cols-2 gap-4">
                <Box>
                  <Typography variant="subtitle2" className="text-gray-600">Customer</Typography>
                  <Typography variant="body1" className="font-semibold">{selectedOrder.customer}</Typography>
                  <Typography variant="body2" className="text-gray-600">{selectedOrder.email}</Typography>
                  <Typography variant="body2" className="text-gray-600">{selectedOrder.mobile}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" className="text-gray-600">Order Info</Typography>
                  <Typography variant="body1" className="font-semibold">{selectedOrder.orderId}</Typography>
                  <Typography variant="body2" className="text-gray-600">{selectedOrder.date}</Typography>
                  <Typography variant="body2" className="text-gray-600">Payment: {selectedOrder.paymentMethod}</Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" className="text-gray-600 mb-2">Products</Typography>
                <Box className="space-y-2">
                  {selectedOrder.products.map((product, index) => (
                    <Box key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <Typography variant="body2">{product.name}</Typography>
                      <Typography variant="body2" className="font-semibold">Qty: {product.quantity}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box className="border-t pt-4">
                <Box className="flex justify-between items-center">
                  <Typography variant="h6">Total Amount</Typography>
                  <Typography variant="h6" className="text-green-600 font-bold">
                    ₹{selectedOrder.totalAmount.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesDashboard;
