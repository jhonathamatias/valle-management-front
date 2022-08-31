import {
  BrowserRouter,
} from "react-router-dom";
import Box from '@mui/material/Box';
import { AuthProvider } from "./store/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
