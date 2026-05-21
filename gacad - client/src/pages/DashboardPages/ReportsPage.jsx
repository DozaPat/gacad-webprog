import React from 'react';

// Material UI Core Imports
import { 
  Typography, Card, CardContent, Box, Grid 
} from '@mui/material';

// Material UI Icons for KPIs
import ConstructionIcon from '@mui/icons-material/Construction';
import HandymanIcon from '@mui/icons-material/Handyman';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

// MUI X Charts Imports
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

function ReportsPage() {
  return (
    <Box sx={{ p: 1 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom sx={{ color: '#002147', fontWeight: 'bold', mb: 3 }}>
        Reports & Analytics Overview
      </Typography>

      {/* KPI Cards Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'white', borderTop: '4px solid #002147', boxShadow: 2 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ConstructionIcon sx={{ fontSize: 40, color: '#002147' }} />
              <Box>
                <Typography variant="caption" color="textSecondary" fontWeight="bold" textTransform="uppercase">
                  Active Projects
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#002147' }}>12</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'white', borderTop: '4px solid #FFD100', boxShadow: 2 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <HandymanIcon sx={{ fontSize: 40, color: '#FFD100' }} />
              <Box>
                <Typography variant="caption" color="textSecondary" fontWeight="bold" textTransform="uppercase">
                  Completed Sites
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#002147' }}>48</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'white', borderTop: '4px solid #002147', boxShadow: 2 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#002147' }} />
              <Box>
                <Typography variant="caption" color="textSecondary" fontWeight="bold" textTransform="uppercase">
                  Efficiency Rate
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#002147' }}>94.2%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'white', borderTop: '4px solid #4caf50', boxShadow: 2 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#4caf50' }} />
              <Box>
                <Typography variant="caption" color="textSecondary" fontWeight="bold" textTransform="uppercase">
                  Safe Work Hours
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#002147' }}>15,400 hrs</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Analytical Visualization Charts Section */}
      <Grid container spacing={3}>
        {/* Line Chart: Monthly Progress vs Budget Expenditure */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#002147', fontWeight: 'bold', mb: 2 }}>
              Project Progress vs. Budget Allocation (2026)
            </Typography>
            <Box sx={{ width: '100%', height: 320 }}>
              <LineChart
                xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], scaleType: 'point' }]}
                series={[
                  {
                    data: [10, 22, 45, 56, 75, 94],
                    label: 'Overall Progress (%)',
                    color: '#002147',
                  },
                  {
                    data: [15, 30, 40, 65, 70, 85],
                    label: 'Budget Used (M PHP)',
                    color: '#FFD100',
                  },
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>

        {/* Pie Chart: Resource Distribution Breakdown (Fixed Text Overlap) */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ color: '#002147', fontWeight: 'bold', mb: 1 }}>
              Resource Distribution
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 320 }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 45, label: 'Materials', color: '#002147' },
                      { id: 1, value: 30, label: 'Labor Force', color: '#FFD100' },
                      { id: 2, value: 15, label: 'Equipment', color: '#7f8c8d' },
                      { id: 3, value: 10, label: 'Overhead', color: '#2c3e50' },
                    ],
                    innerRadius: 50,
                    outerRadius: 90,
                    paddingAngle: 3,
                    cornerRadius: 4,
                  },
                ]}
                width={320}
                height={280}
                // Moves the legend labels safely to the bottom to prevent any layout overlapping
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'center' },
                    padding: -11,
                    labelStyle: {
                      fontSize: 12,
                    },
                  },
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Bar Chart: Labor Performance Metrics */}
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Card sx={{ p: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ color: '#002147', fontWeight: 'bold', mb: 2 }}>
              Quarterly Engineering & Site Logistics Output
            </Typography>
            <Box sx={{ width: '100%' }}>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'] }]}
                series={[
                  { data: [45, 62, 53, 71], label: 'Structural Layouts', color: '#002147' },
                  { data: [32, 41, 64, 48], label: 'Civil Excavations', color: '#FFD100' },
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportsPage;