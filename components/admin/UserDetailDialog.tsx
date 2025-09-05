import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import { IUser } from "@/models/User";

interface UserDetailDialogProps {
  user: IUser | null;
  open: boolean;
  onClose: () => void;
  onEdit: (user: IUser) => void;
  getProviderColor: (provider: string) => string;
  getProviderIcon: (provider: string) => string;
}

export const UserDetailDialog: React.FC<UserDetailDialogProps> = ({
  user,
  open,
  onClose,
  onEdit,
  getProviderColor,
  getProviderIcon,
}) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-blue-50 text-blue-800">
        <Typography variant="h6" className="font-semibold">
          User Details - {user.name}
        </Typography>
      </DialogTitle>
      <DialogContent className="pt-4">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" className="font-semibold mb-2">
              Personal Information
            </Typography>
            <Box className="space-y-2">
              <Typography variant="body2">
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body2">
                <strong>Mobile:</strong> {user.mobile}
              </Typography>
              <Typography variant="body2">
                <strong>Provider:</strong>
                <Chip
                  icon={<span>{getProviderIcon(user.oauthProvider)}</span>}
                  label={user.oauthProvider.charAt(0).toUpperCase() + user.oauthProvider.slice(1)}
                  color={getProviderColor(user.oauthProvider) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
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
                <strong>User ID:</strong> {user._id}
              </Typography>
              <Typography variant="body2">
                <strong>Joined:</strong> {user.createdAt.toLocaleString()}
              </Typography>
              {user.address && (
                <Typography variant="body2">
                  <strong>Address:</strong> {user.address}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onClose}>
          Close
        </Button>
        <Button
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            onEdit(user);
            onClose();
          }}
        >
          Edit User
        </Button>
      </DialogActions>
    </Dialog>
  );
};
