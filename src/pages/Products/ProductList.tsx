
import Container from '@mui/material/Container';
import ProductGrid from './ProductGrid';
import { Outlet } from 'react-router-dom';

export default function ProductList() {
  return (
    <>
      <Container component="main" maxWidth="lg" sx={{ mb: { xs: 8, md: 4 }, p: { xs: 0 } }}>
        <ProductGrid />
      </Container>
    </>
  );
}