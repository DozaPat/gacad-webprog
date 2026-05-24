import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid } from '@mui/x-data-grid';

// Dynamic static JSON data import
import initialUsers from '../../data/users.json'; 

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: 'male',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // --- Enhancement 2 States: Search & Filter Layouts ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Handle Form Control Values Changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // --- Enhancement 3: Form Validations Logic ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Required Field Checks
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.username.trim() || !form.password.trim()) {
      setErrorMsg('Please fill out all required fields marked with an asterisk (*).');
      return;
    }

    // 2. Age must be a number only
    if (isNaN(form.age) || form.age.trim() === '' || Number(form.age) <= 0) {
      setErrorMsg('Age must be a valid number greater than zero.');
      return;
    }

    // 3. Contact number must be exactly 11 digits
    const digitsOnly = form.contactNumber.replace(/\D/g, '');
    if (form.contactNumber.trim() !== '' && (digitsOnly.length !== 11 || form.contactNumber.length !== 11)) {
      setErrorMsg('Contact number must be exactly 11 numeric digits (e.g., 09171234567).');
      return;
    }

    // 4. Username must not contain spaces
    if (/\s/.test(form.username)) {
      setErrorMsg('Username cannot contain spaces.');
      return;
    }

    // 5. Password must be at least 8 characters
    if (form.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    // Save validated record item entry
    const newUser = {
      ...form,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    };

    setUsers((prev) => [...prev, newUser]);
    setOpen(false);
    setForm(blankForm);
  };

  // Clear Filter Action Reset Bar
  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterRole('all');
    setFilterGender('all');
    setFilterStatus('all');
  };

  // Inline Switch Toggle User Status Action Handler
  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  // --- Enhancement 2: Dynamic Search & Dropdown Filter Evaluation ---
  const filteredUsers = users.filter((user) => {
    // A. Full-text matches over First Name, Last Name, Email, or Username
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    const matchesSearch = 
      (user.firstName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.lastName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      fullName.includes(searchQuery.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.username || '').toLowerCase().includes(searchQuery.toLowerCase());

    // B. Category Dropdown matches
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesGender = filterGender === 'all' || user.gender === filterGender;
    
    let matchesStatus = true;
    if (filterStatus === 'active') matchesStatus = user.isActive === true;
    if (filterStatus === 'inactive') matchesStatus = user.isActive === false;

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  // Table Column Schemes Mapping
  const columns = [
    { field: 'id', headerName: 'ID', width: 65 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 170,
      valueGetter: (params) => {
        const firstName = params.row?.firstName || '';
        const lastName = params.row?.lastName || '';
        return `${firstName} ${lastName}`.trim();
      },
    },
    { field: 'username', headerName: 'Username', width: 120 },
    { field: 'email', headerName: 'Email Address', width: 210 },
    { 
      field: 'role', 
      headerName: 'Role', 
      width: 100, 
      renderCell: (params) => (
        <Chip 
          label={(params.value || '').toUpperCase()} 
          size="small" 
          variant="outlined"
          color={params.value === 'admin' ? 'secondary' : 'default'}
        />
      )
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 110,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          disableElevation
          color={params.row?.isActive ? 'warning' : 'success'}
          onClick={() => toggleUserStatus(params.row?.id)}
        >
          {params.row?.isActive ? 'Disable' : 'Activate'}
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      {/* Upper Context Structural Header Block */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002147' }}>
            Users Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage system permissions, register personnel credentials, and toggle status blocks.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ bgcolor: '#002147', '&:hover': { bgcolor: '#001530' } }}
        >
          Add User
        </Button>
      </Stack>

      {/* --- Enhancement 2 Layout Shell: Filter & Global Search Control Panel --- */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: '8px', bgcolor: '#f8fafc' }}>
        <Grid container spacing={2} alignItems="center">
          {/* Text Query Filter Search Component Node */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, email, or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          {/* Dropdown System Role Controller Element */}
          <Grid item xs={12} sm={4} md={2}>
            <TextField fullWidth select size="small" label="Role" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </TextField>
          </Grid>

          {/* Dropdown Gender Option Filter Node */}
          <Grid item xs={12} sm={4} md={2}>
            <TextField fullWidth select size="small" label="Gender" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
              <MenuItem value="all">All Genders</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>

          {/* Dropdown Status Activity Monitor Element */}
          <Grid item xs={12} sm={4} md={2}>
            <TextField fullWidth select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active Only</MenuItem>
              <MenuItem value="inactive">Inactive Only</MenuItem>
            </TextField>
          </Grid>

          {/* Clear Controls Quick Action Node Button */}
          <Grid item xs={12} md={2}>
            <Button 
              fullWidth 
              variant="outlined" 
              size="medium" 
              onClick={handleResetFilters}
              disabled={searchQuery === '' && filterRole === 'all' && filterGender === 'all' && filterStatus === 'all'}
              sx={{ color: '#002147', borderColor: '#002147', textTransform: 'none' }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Table Tracking Grid Container Shell */}
      <Paper variant="outlined" sx={{ height: 420, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        <DataGrid
          rows={filteredUsers} // Leverages computed filtered array dynamically
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* Creation Modal Form Sheet Context Box */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', pb: 1, color: '#002147' }}>Create New User Account</DialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {/* Enhancement 3: Error Message Alert System */}
            {errorMsg && (
              <Alert severity="error" sx={{ mb: 3, fontWeight: 'medium' }}>
                {errorMsg}
              </Alert>
            )}

            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField fullWidth size="small" label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
                <TextField fullWidth size="small" label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField fullWidth size="small" label="Age" name="age" value={form.age} onChange={handleChange} required />
                <TextField fullWidth size="small" select label="Gender" name="gender" value={form.gender} onChange={handleChange}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Stack>

              <TextField fullWidth size="small" label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="e.g., 09171234567" />
              <TextField fullWidth size="small" type="email" label="Email Address" name="email" value={form.email} onChange={handleChange} required />

              <Stack direction="row" spacing={2}>
                <TextField fullWidth size="small" select label="System Role" name="role" value={form.role} onChange={handleChange}>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </TextField>
                <TextField fullWidth size="small" label="Username" name="username" value={form.username} onChange={handleChange} required />
              </Stack>

              <TextField
                fullWidth
                size="small"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField fullWidth size="small" multiline rows={2} label="Home Address" name="address" value={form.address} onChange={handleChange} />

              <FormControlLabel
                control={<Switch checked={form.isActive} name="isActive" onChange={handleChange} color="primary" />}
                label="Set Account to Active immediately"
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#002147', '&:hover': { bgcolor: '#001530' } }}>
            Save Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}