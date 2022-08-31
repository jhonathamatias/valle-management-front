import React, { useState } from "react";

/**
 * MUI components
 */
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Components of layout
 */
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

const mdTheme = createTheme();

export default function Layout({ children, pageTitle }: { children: React.ReactNode, pageTitle: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle={pageTitle}
        />
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <Main>
          {children}
        </Main>
      </Box>
    </ThemeProvider>
  );
}