"use client";
import React from "react";
import { UserStatsCards } from "./UserStatsCards";
import { UserControls } from "./UserControls";
import { UserCard } from "./UserCard";
import { UserDetailDialog } from "./UserDetailDialog";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { useUserManagement } from "./useUserManagement";
import {
  Typography,
  Box,
  Grid,
  Alert,
  Snackbar,
} from "@mui/material";

const AllUsers = () => {
  const {
    filteredUsers,
    searchTerm,
    setSearchTerm,
    providerFilter,
    setProviderFilter,
    selectedUser,
    setSelectedUser,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    editingUser,
    setEditingUser,
    snackbar,
    setSnackbar,
    getProviderColor,
    getProviderIcon,
    handleEditUser,
    handleSaveEdit,
    handleDeleteUser,
    confirmDelete,
    exportUsersData,
    calculateStats,
  } = useUserManagement();

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
      <UserStatsCards stats={stats} />

      {/* Controls */}
      <UserControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        providerFilter={providerFilter}
        setProviderFilter={setProviderFilter}
        onExport={exportUsersData}
      />

      {/* Users Grid */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <UserCard
            key={user._id?.toString() || user.email}
            user={user}
            getProviderColor={getProviderColor}
            getProviderIcon={getProviderIcon}
            onView={setSelectedUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        ))}
      </Grid>

      {/* User Detail Dialog */}
      <UserDetailDialog
        user={selectedUser}
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onEdit={handleEditUser}
        getProviderColor={getProviderColor}
        getProviderIcon={getProviderIcon}
      />

      {/* Edit User Dialog */}
      <EditUserDialog
        user={editingUser}
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
        onUserChange={setEditingUser}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        user={selectedUser}
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

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
