import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from '../../store/AuthContext';

export default function Footer({
  sidebarOpen,
  setSidebarOpen
}: { sidebarOpen: boolean, setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { logout } = useAuthContext();

  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderMobileAppBar = (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{ top: 'auto', bottom: 0 }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: "space-around"
        }}
      >
        <IconButton onClick={toggleDrawer} color="inherit">
          <MenuIcon />
        </IconButton>
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