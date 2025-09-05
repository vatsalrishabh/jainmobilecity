import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import {
  Calendar,
  Shield,
  UserCheck,
  Users
} from "lucide-react";

interface UserStatsCardsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    localUsers: number;
    recentUsers: number;
  };
}

export const UserStatsCards: React.FC<UserStatsCardsProps> = ({ stats }) => {
  return (
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
  );
};
