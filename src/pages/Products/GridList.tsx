import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { grey } from '@mui/material/colors';

export default function GridList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await api.get('/products');

      setProducts(data.products);

    } catch (err) {

    }
  };

  const renderProductsList = () => {
    return products.map((product: any) => (
      <Box key={product.id}>
        <ListItemButton>
          <ListItem sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <ListItemAvatar sx={{ mr: 3 }}>
                <Avatar alt="Remy Sharp" src={product.image} sx={{ height: 62, width: 62, }} />
              </ListItemAvatar>
              <Box>
                <Typography noWrap variant="h6" mb={1} fontSize="16px">
                  {product.name}
                </Typography>
                <Box>
                  <Box sx={{ display: 'flex' }} alignContent="center">
                    <Tooltip title={product.color.name}>
                      <Avatar sx={{
                        bgcolor: product.color.code,
                        border: `2px solid ${grey[300]}`,
                        width: 20,
                        height: 20,
                        mr: 1
                      }}>{' '}</Avatar>
                    </Tooltip>
                    <Typography variant="body2" color="text.primary" mb={1}>
                      Tamanho {`${product.size.name} veste até (${product.size.dress_up}) `}
                    </Typography>
                  </Box>
                  <Typography noWrap width="220px" variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                secondary={(
                  <Typography sx={{ fontWeight: '500' }}>
                    {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                )}
              />
            </Box>
          </ListItem>
        </ListItemButton>
        <Divider />
      </Box>
    ));
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {renderProductsList()}
    </List>
  );
}
