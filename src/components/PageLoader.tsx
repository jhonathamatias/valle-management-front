import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export default function PageLoader() {
    const theme = useTheme();
    return (
        <Box sx={{ 
            display: 'flex', 
            position: 'absolute',
            // background: theme.palette.background.default,
            zIndex: theme.zIndex.tooltip + 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress />
        </Box>
    );
}