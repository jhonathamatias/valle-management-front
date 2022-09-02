import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { styled, useTheme } from '@mui/material/styles';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper, { PaperProps } from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import api from '../../services/api';
import { grey } from '@mui/material/colors';
import { SxProps } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { XS_MOBILE_MD_SCREEN } from '../../constants/style';

interface ColorCircleProps extends AvatarProps {
  color: string;
}

interface PaperContainerProps extends PaperProps {
  loading?: boolean;
  empty?: boolean;
}

const listItemStyle: SxProps = {
  flexDirection: {
    xs: 'column',
    md: 'row'
  },
  justifyContent: 'space-between',
  alignItems: {
    xs: 'flex-start',
    md: 'center'
  },
  pl: 0,
  pr: 0,
};

const ColorCircle = styled(Avatar)<ColorCircleProps>(({ theme, color }) => ({
  backgroundColor: color,
  border: `1px solid ${grey[300]}`,
  width: 20,
  height: 20,
  mr: 1,
  position: 'absolute',
  top: '10px',
  left: '50px'
}));

const AvatarImage = styled(Avatar)<AvatarProps>(() => ({
  height: 64,
  width: 64,
  border: `1px solid ${grey[300]}`,
  '.MuiAvatar-img': {
    objectFit: 'contain'
  }
}));

const PaperContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'empty',
})<PaperContainerProps>(({
  empty,
}) => ({
  ...(empty && {height: '200px'}),
  boxShadow: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export default function GridList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery(XS_MOBILE_MD_SCREEN);
  const theme = useTheme();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/products');

      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [products]);

  const typografy = {
    mb: 1,
    noWrap: true,
    width: '400px',
    ...(isMobile && {
      width: '220px',
    })
  };

  const renderProductsList = () => {
    return products.map((product: any) => (
      <Box key={product.id}>
        <ListItemButton>
          <ListItem sx={listItemStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'relative' }}>
              <ListItemAvatar sx={{ mr: 2 }}>
                <AvatarImage
                  alt="Remy Sharp"
                  src={product.image}
                />
              </ListItemAvatar>
              <Box>
                <Typography {...typografy} variant="h6" fontSize="16px">
                  {product.name}
                </Typography>
                <Box>
                  <Box sx={{ display: 'flex' }} alignContent="center">
                    <Typography variant="body2" color="GrayText">
                      Tamanho {`${product.size.name} veste até (${product.size.dress_up}) `}
                    </Typography>
                  </Box>
                  <Tooltip title={product.color.name}>
                    <ColorCircle color={product.color.code}>{' '}</ColorCircle>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                primary={(
                  <>
                    <Typography textAlign="right" sx={{ fontWeight: '500' }}>
                      {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                  </>
                )}
              />
            </Box>
            <NavigateNextIcon sx={{ ml: 2, display: { xs: 'none', md: 'block' }, color: grey[400] }} />
          </ListItem>
        </ListItemButton>
        <Divider />
      </Box>
    ));
  }

  const preloader = (
    <Box position="relative" sx={{
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      zIndex: theme.zIndex.appBar + 1,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
      />
      <Typography component="div" variant="caption" textAlign="center" mt={2}>
        Carregando produtos...
      </Typography>
    </Box>
  );

  const initialContainer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }} alignItems="center">
      {loading && preloader}
      <SearchOffIcon fontSize='large' color="disabled" />
      <Typography component="div" variant="body2" textAlign="center" sx={{ color: grey[500] }}>
        Você ainda não adicionou nenhum produto
      </Typography>
      <Typography
        component={NavLink}
        to="/products/create"
        variant="body2"
        mt={2}
        color="primary"
        sx={{ textDecoration: 'none' }}
      >
        Novo produto
      </Typography>
    </Box>
  );

  return (
    <PaperContainer empty={Boolean(products.length === 0)}>
      {(products.length === 0) ?
        initialContainer :
        (
          <List sx={{ width: '100%', p: 0 }}>
            {renderProductsList()}
          </List>
        )
      }
    </PaperContainer>
  );
}
