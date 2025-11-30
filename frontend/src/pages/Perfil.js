import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Header from "../components/Header";
import Posts from "../components/Posts";
import UserModal from "../components/UserModal";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import NewGroupModal from "../components/NewGroupModal";

export default function Perfil() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");

  const usuarioSalvo = localStorage.getItem("agora-usuario");
  const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  const isOwnProfile = usuarioLogado && usuarioLogado.username === username;

  useEffect(() => {
    if (username) {
      carregarPerfil();
    }
  }, [username]);

  const carregarPerfil = async () => {
    try {
      setErro("");
      setLoading(true);
      // Busca o usuário pelo username. A API retorna um array.
      const response = await api.get(`/users?username=${username}`);
      const user = response.data[0];

      if (user) {
        // Busca os detalhes completos (posts, grupos) pelo ID
        const detailsResponse = await api.get(`/users/${user.id}`);
        setPerfil(detailsResponse.data);
      } else {
        setErro("Usuário não encontrado.");
      }
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || "Erro ao carregar perfil.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleOpenEditModal = () => {
    setEditedUsername(perfil.username);
    setIsEditProfileModalOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!editedUsername.trim()) {
      alert("O nome de usuário não pode ficar em branco.");
      return;
    }
    try {
      const response = await api.put(`/users/${perfil.id}`, {
        username: editedUsername,
        email: perfil.email, // Manter o email atual
        userId: usuarioLogado.id, // Para autorização
      });

      // Atualiza o localStorage com o novo username
      const updatedUser = { ...usuarioLogado, username: response.data.username };
      localStorage.setItem("agora-usuario", JSON.stringify(updatedUser));

      setIsEditProfileModalOpen(false);
      // Navega para a nova URL do perfil e recarrega a página
      navigate(`/perfil/${response.data.username}`);
      window.location.reload();
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      alert(err.response?.data?.error || "Não foi possível atualizar o perfil.");
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm("Tem certeza que deseja excluir sua conta? Todos os seus dados, posts e grupos criados serão perdidos permanentemente.")) {
      try {
        await api.delete(`/users/${perfil.id}`, {
          data: { userId: usuarioLogado.id } // Para autorização
        });
        localStorage.removeItem("agora-usuario");
        alert("Conta excluída com sucesso.");
        navigate("/cadastrar");
        window.location.reload();
      } catch (err) {
        console.error("Erro ao excluir conta:", err);
        alert(err.response?.data?.error || "Não foi possível excluir a conta.");
      }
    }
  };

  return (
    <Box>
      <Header />

      <Box my={14}>
        {loading && <Typography textAlign="center">Carregando perfil...</Typography>}
        {erro && <Typography textAlign="center" color="error">{erro}</Typography>}

        {perfil && (
          <>
            <Typography fontSize={'2rem'} fontWeight={'bold'} textAlign={'center'} color="primary">
              Perfil de @{perfil.username}
            </Typography>
            
            <UserModal subDate={formatDate(perfil.created_at)} numPosts={perfil.posts?.length || 0} groups={perfil.groups || []} />

            {isOwnProfile && (
              <Box textAlign="center" my={2} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setIsNewGroupModalOpen(true)}
                >
                  Criar Novo Grupo
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleOpenEditModal}
                >
                  Editar Perfil
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteUser}>
                  Excluir Conta
                </Button>
              </Box>
            )}

            <Posts postagens={perfil.posts} onPostsChange={carregarPerfil} />
          </>
        )}
      </Box>

      <NewGroupModal open={isNewGroupModalOpen} onClose={() => setIsNewGroupModalOpen(false)} onGroupCreated={carregarPerfil} />

      {/* Modal de Edição de Perfil */}
      <Modal open={isEditProfileModalOpen} onClose={() => setIsEditProfileModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2">
            Editar Perfil
          </Typography>
          <TextField
            fullWidth
            required
            label="Nome de Usuário"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
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
          <Box textAlign="right">
            <Button onClick={() => setIsEditProfileModalOpen(false)} sx={{ mr: 1 }}>Cancelar</Button>
            <Button variant="contained" onClick={handleUpdateUser}>Salvar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}