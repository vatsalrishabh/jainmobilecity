import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { IUser } from "@/models/User";

interface EditUserDialogProps {
  user: IUser | null;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  onUserChange: (user: IUser) => void;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({
  user,
  open,
  onClose,
  onSave,
  onUserChange,
}) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-green-50 text-green-800">
        <Typography variant="h6" className="font-semibold">
          Edit User
        </Typography>
      </DialogTitle>
      <DialogContent className="pt-4">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={user.name}
              onChange={(e) => onUserChange({ ...user, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={user.email}
              onChange={(e) => onUserChange({ ...user, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile"
              value={user.mobile}
              onChange={(e) => onUserChange({ ...user, mobile: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Provider</InputLabel>
              <Select
                value={user.oauthProvider}
                label="Provider"
                onChange={(e) => onUserChange({ ...user, oauthProvider: e.target.value as "google" | "facebook" | "github" | "local" })}
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
              value={user.address || ""}
              onChange={(e) => onUserChange({ ...user, address: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          className="bg-green-600 hover:bg-green-700"
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
