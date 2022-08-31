import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { useAuthContext } from '../../store/AuthContext';

export default function Footer() {
  const { logout } = useAuthContext();

  const renderMobileAppBar = (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: "space-around"
        }}
      >
        <Tooltip title="Minha conta">
          <IconButton color="inherit" aria-label="open drawer">
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notificações">
          <IconButton color="inherit" aria-label="open drawer">
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sair">
          <IconButton onClick={() => logout()} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );

  return (
    <Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        {renderMobileAppBar}
      </Box>
    </Box >
  );
}