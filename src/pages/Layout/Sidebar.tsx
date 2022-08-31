import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import { mainListItems } from './NavItems';
import { DRAWER_WIDTH, XS_MOBILE_MD_SCREEN } from '../../constants/style';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.only('xs')]: {
        width: 0
      },
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        }
      }),
    },
  }),
);

export default function Sidebar({ open, setOpen }: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(XS_MOBILE_MD_SCREEN);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderDrawerMobile = (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH }, zIndex: theme.zIndex.drawer + 2 }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <List component="nav">
        {mainListItems}
      </List>
    </SwipeableDrawer>
  );

  return (
    <>
      {isMobile && renderDrawerMobile}
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
          {mainListItems}
          {/* <Divider sx={{ my: 1 }} />
        {secondaryListItems} */}
        </List>
      </Drawer>
    </>
  );
}