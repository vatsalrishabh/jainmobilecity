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
  Avatar,
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
  Person,
  Google,
  Facebook,
  GitHub,
  PersonOutline,
  Visibility,
  Edit,
  Delete,
  Download,
  CalendarToday,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";

interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  mobile: string;
  address: string;
  joinDate: string;
  isOAuth: boolean;
  providerBadge: string;
}

interface UserMetrics {
  totalUsers: number;
  oauthUsers: number;
  localUsers: number;
  newUsersThisWeek: number;
}

interface UserData {
  metrics: UserMetrics;
  users: User[];
}

const UserManagement = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'google':
        return <Google />;
      case 'facebook':
        return <Facebook />;
      case 'github':
        return <GitHub />;
      case 'local':
        return <PersonOutline />;
      default:
        return <Person />;
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'google':
        return 'error';
      case 'facebook':
        return 'primary';
      case 'github':
        return 'default';
      case 'local':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredUsers = userData?.users.filter(user => {
    const matchesSearch = searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm);

    const matchesProvider = providerFilter === "all" ||
      user.provider.toLowerCase() === providerFilter.toLowerCase();

    return matchesSearch && matchesProvider;
  }) || [];

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  const handleEditUser = (user: User) => {
    // Placeholder for edit functionality
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (user: User) => {
    // Placeholder for delete functionality
    console.log('Delete user:', user);
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
          User Management
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Manage your customer accounts and user data
        </Typography>
      </Box>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {userData?.metrics.totalUsers || 0}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Total Users
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Person fontSize="small" />
                  <Typography variant="caption">
                    All registered users
                  </Typography>
                </Box>
              </Box>
              <Person sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {userData?.metrics.oauthUsers || 0}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  OAuth Users
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Google fontSize="small" />
                  <Typography variant="caption">
                    Social login users
                  </Typography>
                </Box>
              </Box>
              <Google sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {userData?.metrics.localUsers || 0}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Local Users
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <PersonOutline fontSize="small" />
                  <Typography variant="caption">
                    Email/password users
                  </Typography>
                </Box>
              </Box>
              <PersonOutline sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4" className="font-bold">
                  {userData?.metrics.newUsersThisWeek || 0}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  New This Week
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <CalendarToday fontSize="small" />
                  <Typography variant="caption">
                    Recent registrations
                  </Typography>
                </Box>
              </Box>
              <CalendarToday sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Paper elevation={2} className="p-6 mb-6">
        <Box display="flex" gap={3} alignItems="center" flexWrap="wrap">
          <TextField
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
            className="min-w-80"
          />

          <FormControl className="min-w-40">
            <InputLabel>Provider</InputLabel>
            <Select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              label="Provider"
            >
              <MenuItem value="all">All Providers</MenuItem>
              <MenuItem value="local">Local</MenuItem>
              <MenuItem value="google">Google</MenuItem>
              <MenuItem value="facebook">Facebook</MenuItem>
              <MenuItem value="github">GitHub</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Download />}
            className="ml-auto"
          >
            Export Users
          </Button>
        </Box>
      </Paper>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell className="font-semibold">User</TableCell>
                  <TableCell className="font-semibold">Provider</TableCell>
                  <TableCell className="font-semibold">Contact</TableCell>
                  <TableCell className="font-semibold">Address</TableCell>
                  <TableCell className="font-semibold">Join Date</TableCell>
                  <TableCell className="font-semibold">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={3}>
                        <Avatar className="bg-blue-100 text-blue-600">
                          {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" className="font-semibold">
                            {user.name}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <span className="text-lg">{user.providerBadge}</span>
                        <Chip
                          icon={getProviderIcon(user.provider)}
                          label={user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}
                          color={getProviderColor(user.provider) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Phone fontSize="small" className="text-gray-400" />
                          <Typography variant="body2">{user.mobile}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" className="text-gray-700">
                          {user.address}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.joinDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewUser(user)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditUser(user)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredUsers.length === 0 && (
            <Box className="text-center py-12">
              <Typography variant="h6" className="text-gray-500 mb-2">
                No users found
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Try adjusting your search or filter criteria
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog
        open={userDetailsOpen}
        onClose={() => setUserDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          User Details - {selectedUser?.name}
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box className="space-y-6">
              {/* User Profile Header */}
              <Box className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-16 h-16 bg-blue-100 text-blue-600 text-2xl">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" className="font-bold">{selectedUser.name}</Typography>
                  <Typography variant="body2" className="text-gray-600">{selectedUser.email}</Typography>
                  <Box display="flex" alignItems="center" gap={2} mt={1}>
                    <span className="text-lg">{selectedUser.providerBadge}</span>
                    <Chip
                      icon={getProviderIcon(selectedUser.provider)}
                      label={`${selectedUser.provider.charAt(0).toUpperCase() + selectedUser.provider.slice(1)} Account`}
                      color={getProviderColor(selectedUser.provider) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>

              {/* User Details Grid */}
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box>
                  <Typography variant="subtitle2" className="text-gray-600 mb-3">Contact Information</Typography>
                  <Box className="space-y-3">
                    <Box display="flex" alignItems="center" gap={2}>
                      <Email className="text-gray-400" />
                      <Typography variant="body2">{selectedUser.email}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Phone className="text-gray-400" />
                      <Typography variant="body2">{selectedUser.mobile}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" className="text-gray-600 mb-3">Account Information</Typography>
                  <Box className="space-y-3">
                    <Box>
                      <Typography variant="body2" className="text-gray-600">Provider</Typography>
                      <Typography variant="body2" className="font-semibold">
                        {selectedUser.provider.charAt(0).toUpperCase() + selectedUser.provider.slice(1)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" className="text-gray-600">Join Date</Typography>
                      <Typography variant="body2" className="font-semibold">{selectedUser.joinDate}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Address Section */}
              <Box>
                <Typography variant="subtitle2" className="text-gray-600 mb-3">Address</Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <LocationOn className="text-gray-400" />
                  <Typography variant="body2">{selectedUser.address}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDetailsOpen(false)}>Close</Button>
          <Button variant="contained" color="primary" onClick={() => handleEditUser(selectedUser!)}>
            Edit User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
