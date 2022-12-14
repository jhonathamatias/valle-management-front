
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import GridList from './GridList';

export default function ProductList() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: { xs: 8, md: 4 }, p: { xs: 0 } }}>
      {/* <ProductGrid /> */}
      <GridList />
      <Fab
        aria-label="Add"
        color='primary'
        sx={{
          position: 'absolute',
          bottom: 64,
          right: { md: 16 },
          left: { xs: 16, md: 'auto' }
        }}
        onClick={() => navigate('/products/create')}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}