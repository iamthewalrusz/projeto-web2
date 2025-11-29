import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Preencha email e senha.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/users/login', {
        email,
        senha,
      });

      // backend devolve: { id, username, email, created_at }
      localStorage.setItem('usuario', JSON.stringify(response.data));

      // redireciona para Home
      navigate('/');
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.error || 'Erro ao fazer login.';
      setErro(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Entrar
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ '& .MuiInputLabel-root': { color: 'gray' } }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            sx={{ '& .MuiInputLabel-root': { color: 'gray' } }}
          />

          {erro && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {erro}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <Grid container>
            <Grid item>
              <Link href="/cadastrar" variant="body2">
                {'Não tem uma conta? Cadastre-se'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}