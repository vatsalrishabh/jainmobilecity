import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Eye,
  Edit,
  Trash2,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { IUser } from "@/models/User";

interface UserCardProps {
  user: IUser;
  getProviderColor: (provider: string) => string;
  getProviderIcon: (provider: string) => string;
  onView: (user: IUser) => void;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  getProviderColor,
  getProviderIcon,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
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
                onClick={() => onView(user)}
                className="text-blue-600 hover:text-blue-800"
                size="small"
              >
                <Eye size={18} />
              </IconButton>
              <IconButton
                onClick={() => onEdit(user)}
                className="text-green-600 hover:text-green-800"
                size="small"
              >
                <Edit size={18} />
              </IconButton>
              <IconButton
                onClick={() => onDelete(user)}
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
  );
};
