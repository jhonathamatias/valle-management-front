import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  GridRenderCellParams,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { useServerDataTable } from '../../hooks/dataTable';
import { maskMoney } from '../../tools/maskMoneyBRL';
import { grey } from '@mui/material/colors';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function renderImage(params: GridRenderCellParams) {
  return (
    <Grid item xs={4} component="div" sx={{ display: 'flex', margin: 1 }}>
      <Avatar src={params.value} sx={{
        width: 56,
        height: 56,
        border: `2px solid ${grey[300]}`
      }}
      />
    </Grid>
  );
}

function renderColor(params: GridRenderCellParams) {
  return <Avatar sx={{
    bgcolor: params.value.code,
    border: `2px solid ${grey[300]}`,
    width: 24,
    height: 24
  }}>{' '}</Avatar>;
}

function renderText(params: GridRenderCellParams) {
  return <Typography variant="subtitle2" gutterBottom>
    {params.value.name}
  </Typography>;
}

export default function GridTable() {
  const { data } = useServerDataTable({
    pathName: '/products',
    dataSet: 'products',
    columns: [
      { field: 'id', hide: true },
      { field: 'image', headerName: 'Foto', renderCell: renderImage },
      { field: 'name', headerName: 'Nome', width: 200 },
      { field: 'description', headerName: 'Descrição', width: 350 },
      { field: 'size', headerName: 'Tamanho', renderCell: renderText },
      { field: 'color', headerName: 'Cor', renderCell: renderColor, width: 50 },
      {
        field: 'price', headerName: 'Preço', valueGetter: (params: GridRenderCellParams) => {
          return maskMoney(String(params.value))
        }
      },
      { field: 'created_at', headerName: 'Criado em', width: 160 },
    ]
  });

  return (
    <Box sx={{ height: 470, width: '100%' }}>
      <DataGrid
        rowHeight={75}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Pagination: CustomPagination,
        }}
        sx={{
          background: '#fff',
          borderRadius: { xs: 0 }
        }}
        {...data}
      />
    </Box>
  );
}
