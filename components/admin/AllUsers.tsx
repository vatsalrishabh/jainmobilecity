"use client";
import React, { useState, useEffect } from "react";
import { IUser } from "@/models/User";
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Filter, 
  Download,
  Plus,
  Phone,
  MapPin,
  Calendar,
  Shield,
  UserCheck,
  Users
} from "lucide-react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";

const mockUsers: IUser[] = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    oauthProvider: "google",
    mobile: "9876543210",
    address: "123 Main Street, NY 10001",
    createdAt: new Date("2024-01-15"),
  } as IUser,
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    oauthProvider: "local",
    mobile: "9871234567",
    address: "456 Elm Road, CA 90210",
    createdAt: new Date("2024-01-14"),
  } as IUser,
  {
    _id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    oauthProvider: "facebook",
    mobile: "9874567890",
    address: "789 Oak Avenue, TX 75001",
    createdAt: new Date("2024-01-13"),
  } as IUser,
  {
    _id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    oauthProvider: "github",
    mobile: "9877891234",
    address: "321 Pine Street, FL 33101",
    createdAt: new Date("2024-01-12"),
  } as IUser,
  {
    _id: "5",
    name: "David Brown",
    email: "david@example.com",
    oauthProvider: "local",
    mobile: "9873216540",
    address: "654 Maple Drive, WA 98101",
    createdAt: new Date("2024-01-11"),
  } as IUser,
];

const AllUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filter users
  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.mobile.includes(searchTerm);
      const matchesProvider = !providerFilter || user.oauthProvider === providerFilter;
      
      return matchesSearch && matchesProvider;
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm, providerFilter]);

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "google":
        return "error";
      case "facebook":
        return "primary";
      case "github":
        return "default";
      case "local":
        return "success";
      default:
        return "default";
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return "🔴";
      case "facebook":
        return "🔵";
      case "github":
        return "⚫";
      case "local":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const handleEditUser = (user: IUser) => {
    setEditingUser({ ...user });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsers(prev => prev.map(u => u._id === editingUser._id ? editingUser : u));
      setIsEditOpen(false);
      setEditingUser(null);
      setSnackbar({ open: true, message: "User updated successfully!", severity: "success" });
    }
  };

  const handleDeleteUser = (user: IUser) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(prev => prev.filter(u => u._id !== selectedUser._id));
      setIsDeleteOpen(false);
      setSelectedUser(null);
      setSnackbar({ open: true, message: "User deleted successfully!", severity: "success" });
    }
  };

  const exportUsersData = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Name,Email,Provider,Mobile,Address,Joined\n" +
      filteredUsers.map(user => 
        `${user.name},${user.email},${user.oauthProvider},${user.mobile},${user.address || ""},${user.createdAt.toDateString()}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateStats = () => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.oauthProvider !== "local").length;
    const localUsers = users.filter(u => u.oauthProvider === "local").length;
    const recentUsers = users.filter(u => {
      const daysSince = Math.floor((Date.now() - u.createdAt.getTime()) / (1000 * 60 * 60 * 24));
      return daysSince <= 7;
    }).length;
    
    return { totalUsers, activeUsers, localUsers, recentUsers };
  };

  const stats = calculateStats();

  return (
    <Box className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h4" className="text-gray-800 font-bold mb-2">
          User Management
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Manage your customer accounts and user data
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="font-bold">
                    {stats.totalUsers}
                  </Typography>
                  <Typography variant="body2">Total Users</Typography>
                </Box>
                <Users className="text-4xl opacity-80" />
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
                    {stats.activeUsers}
                  </Typography>
                  <Typography variant="body2">OAuth Users</Typography>
                </Box>
                <UserCheck className="text-4xl opacity-80" />
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
                    {stats.localUsers}
                  </Typography>
                  <Typography variant="body2">Local Users</Typography>
                </Box>
                <Shield className="text-4xl opacity-80" />
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
                    {stats.recentUsers}
                  </Typography>
                  <Typography variant="body2">New This Week</Typography>
                </Box>
                <Calendar className="text-4xl opacity-80" />
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
              placeholder="Search users..."
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
              <InputLabel>Provider</InputLabel>
              <Select
                value={providerFilter}
                label="Provider"
                onChange={(e) => setProviderFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="google">Google</MenuItem>
                <MenuItem value="facebook">Facebook</MenuItem>
                <MenuItem value="github">GitHub</MenuItem>
                <MenuItem value="local">Local</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Filter />}
              onClick={() => {
                setSearchTerm("");
                setProviderFilter("");
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
              onClick={exportUsersData}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Export
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Plus />}
              className="bg-green-600 hover:bg-green-700"
            >
              Add User
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Users Grid */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user._id}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-6">
                {/* User Header */}
                <Box display="flex" alignItems="center" gap={3} mb={4}>
                  <Avatar className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold">
                    {user.name.charAt(0)}
                  </Avatar>
                  <Box className="flex-1 min-w-0">
                    <Typography variant="h6" className="font-semibold text-gray-800 truncate">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500 truncate">
                      {user.email}
                    </Typography>
                    <Chip
                      icon={<span>{getProviderIcon(user.oauthProvider)}</span>}
                      label={user.oauthProvider.charAt(0).toUpperCase() + user.oauthProvider.slice(1)}
                      color={getProviderColor(user.oauthProvider) as "error" | "primary" | "default" | "success"}
                      size="small"
                      className="mt-1"
                    />
                  </Box>
                </Box>

                {/* User Details */}
                <Box className="space-y-3 mb-4">
                  <Box display="flex" alignItems="center" gap={2}>
                    <Phone size={16} className="text-gray-500" />
                    <Typography variant="body2" className="text-gray-700">
                      {user.mobile}
                    </Typography>
                  </Box>
                  {user.address && (
                    <Box display="flex" alignItems="center" gap={2}>
                      <MapPin size={16} className="text-gray-500" />
                      <Typography variant="body2" className="text-gray-700 line-clamp-2">
                        {user.address}
                      </Typography>
                    </Box>
                  )}
                  <Box display="flex" alignItems="center" gap={2}>
                    <Calendar size={16} className="text-gray-500" />
                    <Typography variant="body2" className="text-gray-700">
                      Joined {user.createdAt.toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Actions */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" gap={1}>
                    <IconButton
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-800"
                      size="small"
                    >
                      <Eye size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditUser(user)}
                      className="text-green-600 hover:text-green-800"
                      size="small"
                    >
                      <Edit size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-600 hover:text-red-800"
                      size="small"
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                  <Chip
                    label={user.oauthProvider === "local" ? "Local Account" : "OAuth Account"}
                    color={user.oauthProvider === "local" ? "success" : "info"}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)} maxWidth="md" fullWidth>
        <DialogTitle className="bg-blue-50 text-blue-800">
          <Typography variant="h6" className="font-semibold">
            User Details - {selectedUser?.name}
          </Typography>
        </DialogTitle>
        <DialogContent className="pt-4">
          {selectedUser && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  Personal Information
                </Typography>
                <Box className="space-y-2">
                  <Typography variant="body2">
                    <strong>Name:</strong> {selectedUser.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {selectedUser.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mobile:</strong> {selectedUser.mobile}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Provider:</strong> 
                    <Chip
                      icon={<span>{getProviderIcon(selectedUser.oauthProvider)}</span>}
                      label={selectedUser.oauthProvider.charAt(0).toUpperCase() + selectedUser.oauthProvider.slice(1)}
                      color={getProviderColor(selectedUser.oauthProvider) as any}
                      size="small"
                      className="ml-2"
                    />
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  Account Information
                </Typography>
                <Box className="space-y-2">
                  <Typography variant="body2">
                    <strong>User ID:</strong> {selectedUser._id}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Joined:</strong> {selectedUser.createdAt.toLocaleString()}
                  </Typography>
                  {selectedUser.address && (
                    <Typography variant="body2">
                      <strong>Address:</strong> {selectedUser.address}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setSelectedUser(null)}>
            Close
          </Button>
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              if (selectedUser) {
                handleEditUser(selectedUser);
                setSelectedUser(null);
              }
            }}
          >
            Edit User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle className="bg-green-50 text-green-800">
          <Typography variant="h6" className="font-semibold">
            Edit User
          </Typography>
        </DialogTitle>
        <DialogContent className="pt-4">
          {editingUser && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  value={editingUser.mobile}
                  onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Provider</InputLabel>
                  <Select
                    value={editingUser.oauthProvider}
                    label="Provider"
                    onChange={(e) => setEditingUser({ ...editingUser, oauthProvider: e.target.value as any })}
                  >
                    <MenuItem value="google">Google</MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                    <MenuItem value="github">GitHub</MenuItem>
                    <MenuItem value="local">Local</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Address"
                  value={editingUser.address || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setIsEditOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            className="bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DialogTitle className="bg-red-50 text-red-800">
          <Typography variant="h6" className="font-semibold">
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent className="pt-4">
          <Typography variant="body1">
            Are you sure you want to delete user <strong>{selectedUser?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setIsDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={confirmDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          className="w-full"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AllUsers;
