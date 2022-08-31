import React from "react";
import { Outlet } from "react-router-dom";
import Tab, { TabProps } from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import ListIcon from '@mui/icons-material/List';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import Layout from "../Layout";

interface LinkTabProps extends TabProps {
  label?: string;
  to: string;
}

function LinkTab({ to, ...rest }: LinkTabProps) {
  const navigate = useNavigate();

  return (
    <Tab
      onClick={() => {
        navigate(to);
      }}
      {...rest}
    />
  );
}

function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{
      width: '100%',
      display: 'inline-flex',
      justifyContent: { xs: 'center', md: 'left' }
    }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab icon={<ListIcon />} label="produtos"to="/products/list" />
        <LinkTab icon={<AddShoppingCartIcon />} label="Adicionar" to="/products/create" />
      </Tabs>
    </Box>
  );
}

export default function Products() {
  return (
    <Layout pageTitle="Produtos">
      <NavTabs />
      <Outlet />
    </Layout>
  );
}