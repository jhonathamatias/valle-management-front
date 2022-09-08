import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Edit from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { SetStateAction } from 'react';
import { ProductDetailInterface } from '../../interfaces/product.interface';
import { format } from '../../tools/maskMoneyBRL';
import { grey } from '@mui/material/colors';

interface ProductDetailOverlayInterface {
  product: ProductDetailInterface;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function ProductDetailOverlay({ open, setOpen, product }: ProductDetailOverlayInterface) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth={'md'}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <IconButton sx={{ position: 'absolute', top: 0, left: 5, display: { sm: 'none' } }} onClick={handleClose}>
          <ArrowBack />
        </IconButton>
        <Tooltip title="Editar produto">
          <IconButton sx={{ position: 'absolute', top: 5, right: 5 }}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Grid container sx={{ mt: { xs: 4, sm: 0 } }}>
          <Grid item xs={12} sm={3} sx={{ display: 'flex', mr: { sm: 4 } }} justifyContent="center">
            <img
              src={product.image}
              height={220}
              style={{
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} sx={{ mt: { xs: 2, sm: 0 } }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>
            <Typography variant="caption" ml={1} color="GrayText">
              {`Criado em ${product.updated_at}`}
            </Typography>
            <Typography variant="h6" mt={1}>
              {format(product.price)}
            </Typography>
            <Typography variant="body2" mt={1} color="GrayText">
              {product.description}
            </Typography>
            <Typography variant="body2" mt={2}>
              {`${product.size.name} veste até (${product.size.dress_up})`}
            </Typography>
            <Avatar sx={{
              bgcolor: product.color.code,
              border: `2px solid ${grey[300]}`,
              width: 32,
              height: 32,
              mt: 1
            }}>{' '}</Avatar>
          </Grid>
        </Grid>
        <DialogContentText>
          {/* {product.description} */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}