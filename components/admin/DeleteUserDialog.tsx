import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import { IUser } from "@/models/User";

interface DeleteUserDialogProps {
  user: IUser | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  user,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="bg-red-50 text-red-800">
        <Typography variant="h6" className="font-semibold">
          Confirm Delete
        </Typography>
      </DialogTitle>
      <DialogContent className="pt-4">
        <Typography variant="body1">
          Are you sure you want to delete user <strong>{user?.name}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete User
        </Button>
      </DialogActions>
    </Dialog>
  );
};
