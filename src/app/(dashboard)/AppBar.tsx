'use client';

import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  Login as LoginIcon,
  Menu as MenuIcon,
  ArrowDropDownCircle as ArrowDropDownCircleIcon,
} from '@mui/icons-material';
import { drawerWidth } from './Drawer';
import { useAnonStore, getActiveAccount } from '../../stores/anon';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBar({
  open,
  onToggleDrawer,
}: {
  open?: boolean;
  onToggleDrawer?: () => void;
}) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const accountsMenuOpen = Boolean(menuAnchor);

  const accounts = useAnonStore((state) => state.investmentAccounts);
  const activeAccount = getActiveAccount();

  return (
    <DrawerAppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onToggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          {activeAccount?.name ?? 'No account selected'}
        </Typography>
        <IconButton
          id="accounts-button"
          aria-controls={accountsMenuOpen ? 'accounts-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={accountsMenuOpen ? 'true' : undefined}
          color="inherit"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          <ArrowDropDownCircleIcon />
        </IconButton>
        <Menu
          id="accounts-menu"
          anchorEl={menuAnchor}
          open={accountsMenuOpen}
          onClose={() => setMenuAnchor(null)}
          MenuListProps={{ 'aria-labelledby': 'accounts-button' }}
        >
          {accounts.map((account) => (
            <MenuItem onClick={() => setMenuAnchor(null)}>
              {account.name}
            </MenuItem>
          ))}
          {accounts.length > 0 && <Divider />}
          <MenuItem onClick={() => setMenuAnchor(null)}>All accounts</MenuItem>
          <MenuItem onClick={() => setMenuAnchor(null)}>
            Create account
          </MenuItem>
        </Menu>
        <IconButton color="inherit" sx={{ marginLeft: 'auto' }}>
          <LoginIcon />
        </IconButton>
      </Toolbar>
    </DrawerAppBar>
  );
}
