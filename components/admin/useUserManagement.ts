import { useState, useEffect } from "react";
import { IUser } from "@/models/User";

// Mock data - moved outside hook to avoid dependency issues
const mockUsers: IUser[] = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    oauthProvider: "google",
    mobile: "9876543210",
    address: "123 Main Street, NY 10001",
    createdAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    oauthProvider: "local",
    mobile: "9871234567",
    address: "456 Elm Road, CA 90210",
    createdAt: new Date("2024-01-14"),
  },
  {
    _id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    oauthProvider: "facebook",
    mobile: "9874567890",
    address: "789 Oak Avenue, TX 75001",
    createdAt: new Date("2024-01-13"),
  },
  {
    _id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    oauthProvider: "github",
    mobile: "9877891234",
    address: "321 Pine Street, FL 33101",
    createdAt: new Date("2024-01-12"),
  },
  {
    _id: "5",
    name: "David Brown",
    email: "david@example.com",
    oauthProvider: "local",
    mobile: "9873216540",
    address: "654 Maple Drive, WA 98101",
    createdAt: new Date("2024-01-11"),
  },
];

export const useUserManagement = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error"
  });

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
      case "google": return "error";
      case "facebook": return "primary";
      case "github": return "default";
      case "local": return "success";
      default: return "default";
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google": return "🔴";
      case "facebook": return "🔵";
      case "github": return "⚫";
      case "local": return "🟢";
      default: return "⚪";
    }
  };

  const handleEditUser = (user: IUser) => {
    setEditingUser(user as IUser);
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

  return {
    users,
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
  };
};
