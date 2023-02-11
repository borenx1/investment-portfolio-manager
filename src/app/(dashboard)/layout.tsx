'use client';

import { useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import AppBar from './AppBar';
import Drawer from './Drawer';
import ListItemLink from '../../components/ListItemLink';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen((isOpen) => !isOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} onToggleDrawer={toggleDrawer} />
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListSubheader inset>Transactions</ListSubheader>
          <ListItemLink href="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemLink>
          <ListItemLink href="/dashboard/journals">
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Journals" />
          </ListItemLink>
          <ListItemLink href="/dashboard/capital-changes">
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Capital changes" />
          </ListItemLink>
          <Divider sx={{ my: 1 }} />
          <ListSubheader inset>Financials</ListSubheader>
          <ListItemLink href="/dashboard/financials">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Financials" />
          </ListItemLink>
          <Divider sx={{ my: 1 }} />
          <ListItemLink href="/account-settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Account settings" />
          </ListItemLink>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
