import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  Filter,
  Download,
  Plus,
} from "lucide-react";

interface UserControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  providerFilter: string;
  setProviderFilter: (value: string) => void;
  onExport: () => void;
}

export const UserControls: React.FC<UserControlsProps> = ({
  searchTerm,
  setSearchTerm,
  providerFilter,
  setProviderFilter,
  onExport,
}) => {
  const handleClearFilters = () => {
    setSearchTerm("");
    setProviderFilter("");
  };

  return (
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
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Download />}
            onClick={onExport}
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
  );
};
