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

export default function CadastroModal() {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [senha, setSenha]     = useState('');
  const [erro, setErro]       = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');
    setSucesso('');

    if (!username || !email || !senha) {
      setErro('Preencha username, email e senha.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/users', {
        username,
        email,
        senha,
      });

      setSucesso(`Cadastro de ${response.data.username} realizado com sucesso!`);

      // opcional: após alguns segundos, ir para o login
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.error || 'Erro ao cadastrar usuário.';
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
          Cadastro
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nome de Usuário"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ '& .MuiInputLabel-root': { color: 'gray' } }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            sx={{ '& .MuiInputLabel-root': { color: 'gray' } }}
          />

          {erro && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {erro}
            </Typography>
          )}

          {sucesso && (
            <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
              {sucesso}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>

          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {'Já possui uma conta? Clique aqui para entrar'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}