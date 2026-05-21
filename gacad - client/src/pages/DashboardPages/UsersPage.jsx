import React, { useState } from 'react';

// Pure Material UI Core Imports (Zero third-party installations)
import { 
  Typography, Box, Card, Stack, Chip, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';

// Material UI Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Personnel dataset
const initialRows = [
  { id: 1, lastName: 'Santos', firstName: 'Juan', role: 'Project Manager', email: 'j.santos@agap.com', status: 'Active' },
  { id: 2, lastName: 'Del Rosario', firstName: 'Maria', role: 'Lead Architect', email: 'm.delrosario@agap.com', status: 'Active' },
  { id: 3, lastName: 'Cruz', firstName: 'Arnel', role: 'Civil Engineer', email: 'a.cruz@agap.com', status: 'On Leave' },
  { id: 4, lastName: 'Bautista', firstName: 'Elena', role: 'Safety Inspector', email: 'e.bautista@agap.com', status: 'Active' },
  { id: 5, lastName: 'Aquino', firstName: 'Renato', role: 'Site Supervisor', email: 'r.aquino@agap.com', status: 'Inactive' },
  { id: 6, lastName: 'Mercado', firstName: 'Grace', role: 'QS Engineer', email: 'g.mercado@agap.com', status: 'Active' },
  { id: 7, lastName: 'Gonzales', firstName: 'Paolo', role: 'Electrical Engineer', email: 'p.gonzales@agap.com', status: 'Active' },
];

function UsersPage() {
  const [users] = useState(initialRows);

  const getStatusChip = (status) => {
    let chipColor = 'default';
    if (status === 'Active') chipColor = 'success';
    if (status === 'On Leave') chipColor = 'warning';
    if (status === 'Inactive') chipColor = 'error';
    
    return (
      <Chip 
        label={status} 
        color={chipColor} 
        size="small" 
        sx={{ fontWeight: 'bold', minWidth: '85px' }} 
      />
    );
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Top Banner Action Panel Layout */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#002147', fontWeight: 'bold' }}>
            Users Management System
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            Manage master security rosters, system control clearances, and staff identities.
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#002147',
            color: 'white',
            fontWeight: 'bold',
            padding: '8px 16px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#001530',
              borderBottom: '2px solid #FFD100'
            }
          }}
          onClick={() => alert('Add User workflow initiated.')}
        >
          Add New User
        </Button>
      </Stack>

      {/* Main Ledger Table Panel View (Built completely using core components) */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="personnel data ledger">
          <TableHead sx={{ backgroundColor: '#002147' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Full Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Corporate Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Designation Role</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', align: 'right' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: 'rgba(0, 33, 71, 0.02)' }
                }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', color: '#555' }}>
                  {row.id}
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  {row.firstName} {row.lastName}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{getStatusChip(row.status)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => alert(`Edit User ID: ${row.id}`)}
                      sx={{ color: '#002147', '&:hover': { backgroundColor: 'rgba(0,33,71,0.08)' } }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => alert(`Delete User ID: ${row.id}`)}
                      sx={{ color: '#d32f2f', '&:hover': { backgroundColor: 'rgba(211,47,47,0.08)' } }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UsersPage;