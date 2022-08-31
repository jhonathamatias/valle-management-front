import React from "react";
import { Outlet } from "react-router-dom";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { useNavigate } from 'react-router-dom';
import Layout from "../Layout";

interface LinkTabProps {
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
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Produtos" to="/products/list" />
        <LinkTab label="Cadastro de Produtos" to="/products/create" />
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