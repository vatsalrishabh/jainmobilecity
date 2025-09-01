"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  TrendingUp,
  ShoppingCart,
  AttachMoney,
  Visibility,
  Download,
  FilterList,
  Search,
  CalendarToday,
  LocalShipping,
  CheckCircle,
  Pending,
  Cancel,
} from "@mui/icons-material";

interface Sale {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: "completed" | "pending" | "cancelled" | "shipped";
  paymentMethod: string;
  orderDate: Date;
  deliveryAddress: string;
}

const AllSales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Mock data for demonstration
  useEffect(() => {
    const mockSales: Sale[] = [
      {
        _id: "1",
        orderId: "ORD-001",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        products: [
          { name: "iPhone 15 Pro", quantity: 1, price: 89999 },
          { name: "AirPods Pro", quantity: 1, price: 24999 },
        ],
        totalAmount: 114998,
        status: "completed",
        paymentMethod: "Credit Card",
        orderDate: new Date("2024-01-15"),
        deliveryAddress: "123 Main Street, NY 10001",
      },
      {
        _id: "2",
        orderId: "ORD-002",
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        products: [
          { name: "Samsung Galaxy S24", quantity: 1, price: 79999 },
        ],
        totalAmount: 79999,
        status: "shipped",
        paymentMethod: "PayPal",
        orderDate: new Date("2024-01-14"),
        deliveryAddress: "456 Elm Road, CA 90210",
      },
      {
        _id: "3",
        orderId: "ORD-003",
        customerName: "Mike Johnson",
        customerEmail: "mike@example.com",
        products: [
          { name: "OnePlus 12", quantity: 1, price: 59999 },
          { name: "OnePlus Buds", quantity: 1, price: 8999 },
        ],
        totalAmount: 68998,
        status: "pending",
        paymentMethod: "UPI",
        orderDate: new Date("2024-01-13"),
        deliveryAddress: "789 Oak Avenue, TX 75001",
      },
      {
        _id: "4",
        orderId: "ORD-004",
        customerName: "Sarah Wilson",
        customerEmail: "sarah@example.com",
        products: [
          { name: "Xiaomi 14", quantity: 1, price: 49999 },
        ],
        totalAmount: 49999,
        status: "cancelled",
        paymentMethod: "Credit Card",
        orderDate: new Date("2024-01-12"),
        deliveryAddress: "321 Pine Street, FL 33101",
      },
    ];
    setSales(mockSales);
    setFilteredSales(mockSales);
  }, []);

  // Filter sales
  useEffect(() => {
    const filtered = sales.filter(sale => {
      const matchesSearch = sale.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sale.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || sale.status === statusFilter;
      const matchesDate = !dateFilter || sale.orderDate.toDateString().includes(dateFilter);
      
      return matchesSearch && matchesStatus && matchesDate;
    });
    setFilteredSales(filtered);
  }, [sales, searchTerm, statusFilter, dateFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "shipped":
        return "info";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle />;
      case "shipped":
        return <LocalShipping />;
      case "pending":
        return <Pending />;
      case "cancelled":
        return <Cancel />;
      default:
        return <Pending />;
    }
  };

  const calculateStats = () => {
    const totalRevenue = sales.reduce((sum, sale) => 
      sale.status === "completed" ? sum + sale.totalAmount : sum, 0
    );
    const totalOrders = sales.length;
    const completedOrders = sales.filter(sale => sale.status === "completed").length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    return { totalRevenue, totalOrders, completedOrders, avgOrderValue };
  };

  const stats = calculateStats();

  const exportSalesData = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Order ID,Customer,Products,Total Amount,Status,Date\n" +
      filteredSales.map(sale => 
        `${sale.orderId},${sale.customerName},${sale.products.map(p => p.name).join(";")},${sale.totalAmount},${sale.status},${sale.orderDate.toDateString()}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h4" className="text-gray-800 font-bold mb-2">
          Sales Dashboard
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Monitor your sales performance and order management
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="font-bold">
                    ₹{stats.totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">Total Revenue</Typography>
                </Box>
                <TrendingUp className="text-4xl opacity-80" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="font-bold">
                    {stats.totalOrders}
                  </Typography>
                  <Typography variant="body2">Total Orders</Typography>
                </Box>
                <ShoppingCart className="text-4xl opacity-80" />
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
                    {stats.completedOrders}
                  </Typography>
                  <Typography variant="body2">Completed</Typography>
                </Box>
                <CheckCircle className="text-4xl opacity-80" />
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
                    ₹{stats.avgOrderValue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">Avg Order Value</Typography>
                </Box>
                <AttachMoney className="text-4xl opacity-80" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Controls */}
      <Paper elevation={2} className="p-4 mb-6 rounded-xl">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
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
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="shipped">Shipped</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setDateFilter("");
              }}
            >
              Clear Filters
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Download />}
              onClick={exportSalesData}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Export
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Sales Table */}
      <Paper elevation={2} className="rounded-xl overflow-hidden">
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
              {filteredSales.map((sale) => (
                <TableRow key={sale._id} className="hover:bg-gray-50">
                  <TableCell>
                    <Typography variant="body2" className="font-medium text-blue-600">
                      {sale.orderId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar className="w-8 h-8 bg-blue-100 text-blue-600">
                        {sale.customerName.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" className="font-medium">
                          {sale.customerName}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          {sale.customerEmail}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      {sale.products.map((product, index) => (
                        <Typography key={index} variant="body2" className="text-gray-700">
                          {product.name} × {product.quantity}
                        </Typography>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="font-semibold text-green-600">
                      ₹{sale.totalAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(sale.status)}
                      label={sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      color={getStatusColor(sale.status) as "success" | "info" | "warning" | "error" | "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {sale.orderDate.toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => setSelectedSale(sale)}
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
      </Paper>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedSale} onClose={() => setSelectedSale(null)} maxWidth="md" fullWidth>
        <DialogTitle className="bg-blue-50 text-blue-800">
          <Typography variant="h6" className="font-semibold">
            Order Details - {selectedSale?.orderId}
          </Typography>
        </DialogTitle>
        <DialogContent className="pt-4">
          {selectedSale && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  Customer Information
                </Typography>
                <Box className="space-y-2">
                  <Typography variant="body2">
                    <strong>Name:</strong> {selectedSale.customerName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {selectedSale.customerEmail}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> {selectedSale.deliveryAddress}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  Order Information
                </Typography>
                <Box className="space-y-2">
                  <Typography variant="body2">
                    <strong>Order ID:</strong> {selectedSale.orderId}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> {selectedSale.orderDate.toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Payment Method:</strong> {selectedSale.paymentMethod}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> 
                    <Chip
                      icon={getStatusIcon(selectedSale.status)}
                      label={selectedSale.status.charAt(0).toUpperCase() + selectedSale.status.slice(1)}
                                             color={getStatusColor(selectedSale.status) as "success" | "info" | "warning" | "error" | "default"}
                      size="small"
                      className="ml-2"
                    />
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  Products
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedSale.products.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell align="right">{product.quantity}</TableCell>
                          <TableCell align="right">₹{product.price.toLocaleString()}</TableCell>
                          <TableCell align="right">₹{(product.quantity * product.price).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={3} className="font-semibold text-right">
                          Total Amount:
                        </TableCell>
                        <TableCell className="font-semibold text-right text-green-600">
                          ₹{selectedSale.totalAmount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setSelectedSale(null)}>
            Close
          </Button>
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              // Handle order status update
              setSelectedSale(null);
            }}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllSales;
