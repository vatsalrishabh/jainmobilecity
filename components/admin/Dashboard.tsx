"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  IconButton,
} from "@mui/material";
import {
  TrendingUp,
  ShoppingCart,
  AttachMoney,
  Person,
  Inventory,
  Visibility,
  Add,
  GetApp,
  Refresh,
  BarChart,
  AccessTime,
  Star,
} from "@mui/icons-material";

interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
  products: string[];
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
  rating: number;
  image: string;
}

const Dashboard = () => {
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    monthlyGrowth: 0,
    orderGrowth: 0,
    customerGrowth: 0,
    productGrowth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch('/api/admin/stats', {
          cache: 'no-store'
        });
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // Fetch recent orders
        const ordersResponse = await fetch('/api/admin/orders/recent', {
          cache: 'no-store'
        });
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setRecentOrders(ordersData);
        }

        // Fetch top products
        const productsResponse = await fetch('/api/admin/products/top', {
          cache: 'no-store'
        });
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setTopProducts(productsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "shipped":
        return "info";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <TrendingUp fontSize="small" />;
      case "shipped":
        return <TrendingUp fontSize="small" />;
      case "pending":
        return <AccessTime fontSize="small" />;
      default:
        return <AccessTime fontSize="small" />;
    }
  };

  if (loading) {
    return (
      <Box className="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
        <Box className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <Typography variant="h6" className="text-gray-600">
            Loading dashboard data...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h4" className="text-gray-800 font-bold mb-2">
          Dashboard Overview
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </Typography>
      </Box>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all duration-300">
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  ₹{stats.totalRevenue.toLocaleString()}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Total Revenue
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <TrendingUp fontSize="small" />
                  <Typography variant="caption">
                    +{stats.monthlyGrowth}% this month
                  </Typography>
                </Box>
              </Box>
              <AttachMoney sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all duration-300">
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {stats.totalOrders}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Total Orders
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <TrendingUp fontSize="small" />
                  <Typography variant="caption">
                    +{stats.orderGrowth}% this month
                  </Typography>
                </Box>
              </Box>
              <ShoppingCart sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all duration-300">
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {stats.totalCustomers}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Total Customers
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <TrendingUp fontSize="small" />
                  <Typography variant="caption">
                    +{stats.customerGrowth}% this month
                  </Typography>
                </Box>
              </Box>
              <Person sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all duration-300">
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {stats.totalProducts}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Total Products
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <TrendingUp fontSize="small" />
                  <Typography variant="caption">
                    +{stats.productGrowth}% this month
                  </Typography>
                </Box>
              </Box>
              <Inventory sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Paper elevation={2} className="p-6 mb-8 rounded-xl">
        <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
          Quick Actions
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
          >
            Add Product
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<BarChart />}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl"
          >
            View Reports
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GetApp />}
            className="border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl"
          >
            Export Data
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Refresh />}
            className="border-purple-600 text-purple-600 hover:bg-purple-50 py-3 rounded-xl"
          >
            Refresh Data
          </Button>
        </div>
      </Paper>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Recent Orders
                </Typography>
                <Button
                  variant="text"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View All
                </Button>
              </Box>
              
              <List className="space-y-3">
                {recentOrders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    <ListItem className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                      <ListItemAvatar>
                        <Avatar className="bg-blue-100 text-blue-600">
                          {order.customer.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <Box className="flex-1">
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                          <Typography variant="subtitle1" className="font-semibold">
                            {order.customer}
                          </Typography>
                          <Typography variant="h6" className="text-green-600 font-bold">
                            ₹{order.amount.toLocaleString()}
                          </Typography>
                        </Box>
                        <Typography variant="body2" className="text-gray-600 mb-2">
                          {order.products.join(", ")}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Chip
                            icon={getStatusIcon(order.status)}
                            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            color={getStatusColor(order.status) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                            size="small"
                          />
                          <Typography variant="caption" className="text-gray-500">
                            {order.date}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton className="text-blue-600 hover:text-blue-800">
                        <Visibility />
                      </IconButton>
                    </ListItem>
                    {index < recentOrders.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-6">
              <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
                Top Selling Products
              </Typography>
              
              <Box className="space-y-4">
                {topProducts.map((product, index) => (
                  <Box key={product.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <Avatar
                      src={product.image}
                      variant="rounded"
                      className="w-12 h-12"
                    />
                    <Box className="flex-1 min-w-0">
                      <Typography variant="subtitle2" className="font-semibold text-gray-800 truncate">
                        {product.name}
                      </Typography>
                      <Typography variant="caption" className="text-gray-500">
                        {product.sales} sales • ₹{product.revenue.toLocaleString()}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Star className="text-yellow-500" sx={{ fontSize: 14 }} />
                        <Typography variant="caption" className="text-gray-600">
                          {product.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={`#${index + 1}`}
                      size="small"
                      className="bg-blue-100 text-blue-800 font-semibold"
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
              Sales Performance
            </Typography>
            <Box className="text-center">
              <Typography variant="h3" className="text-green-600 font-bold mb-2">
                ₹{stats.totalRevenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Total revenue generated this month
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2}>
                <TrendingUp className="text-green-500" />
                <Typography variant="body2" className="text-green-600 font-medium">
                  +{stats.monthlyGrowth}% from last month
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
              Customer Growth
            </Typography>
            <Box className="text-center">
              <Typography variant="h3" className="text-blue-600 font-bold mb-2">
                {stats.totalCustomers}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Total registered customers
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2}>
                <TrendingUp className="text-blue-500" />
                <Typography variant="body2" className="text-blue-600 font-medium">
                  +{stats.customerGrowth}% from last month
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default Dashboard;
