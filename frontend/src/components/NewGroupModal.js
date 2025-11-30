import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import api from '../services/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewGroupModal({ open, onClose, onGroupCreated }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleCreateGroup = async () => {
    setErro('');
    if (!nome.trim()) {
      setErro('O nome do grupo é obrigatório.');
      return;
    }

    const usuarioSalvo = localStorage.getItem("agora-usuario");
    const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

    if (!usuarioLogado) {
      setErro('Você precisa estar logado para criar um grupo.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/groups', {
        nome,
        descricao,
        ownerId: usuarioLogado.id,
      });

      // Limpa os campos e fecha o modal
      setNome('');
      setDescricao('');
      onClose();

      // Avisa o componente pai para recarregar os dados
      if (onGroupCreated) {
        onGroupCreated();
      }
    } catch (err) {
      console.error('Erro ao criar grupo:', err);
      setErro(err.response?.data?.error || 'Não foi possível criar o grupo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Criar Novo Grupo
        </Typography>
        <TextField
          fullWidth
          required
          label="Nome do Grupo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          sx={{ mt: 2,
            "& label": {
              color: "primary.main",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Descrição (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          sx={{ mt: 2, mb: 2,
            "& label": {
              color: "primary.main",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
        {erro && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {erro}
          </Typography>
        )}
        <Box textAlign="right">
          <Button onClick={onClose} sx={{ mr: 1 }}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreateGroup} disabled={loading}>
            {loading ? 'Criando...' : 'Criar Grupo'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
