import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, SubmitErrorHandler, useForm } from 'react-hook-form';
import { SignInInterface } from '../../interfaces/signIn.interface';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../store/AuthContext';
import axios from 'axios';

const schema = yup.object({
  email: yup.string().required("Email é obrigatório.").email("Email inválido"),
  password: yup.string().required("Digite sua senha.").min(6, "Senha deve ter no minímo 6 caracteres.")
}).required();

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInInterface>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<SignInInterface> = data => {
    handleSignIn(data.email, data.password);
  };

  const handleSignIn = useCallback(async (email: string, password: string) => {
    setLoading(true);

    login({ email, password }, () => {
      navigate('/products', { replace: true });
      setLoading(false)
    }, (error: any) => {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        alert(error);
        // let message = error.response === undefined
        //     ? 'Ocorreu um erro, entre em contato com o suporte'
        //     : error.response?.data?.error.message;

        // toast.error(message, {
        //   position: "top-right",
        // });
        return;
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password')}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Acessar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}