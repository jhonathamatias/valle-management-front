
import Container from '@mui/material/Container';
import ProductGrid from './ProductGrid';
import { Outlet } from 'react-router-dom';

export default function ProductList() {
  return (
    <>
      <Container component="div" maxWidth="lg" sx={{ mb: 4 }}>
        <ProductGrid />
      </Container>
      <Outlet />
    </>
  );
}