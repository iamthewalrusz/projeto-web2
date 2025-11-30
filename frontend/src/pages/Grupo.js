import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Header from "../components/Header";
import Posts from "../components/Posts";
import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NewPostModal from "../components/newPostModal";
import api from "../services/api";

export default function Grupo() {
  const { nomeGrupo } = useParams();
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedNome, setEditedNome] = useState("");
  const [editedDescricao, setEditedDescricao] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const carregarGrupoEPosts = async () => {
    try {
      setErro("");
      setLoading(true);
      // 1. Buscar o grupo pelo nome para obter o ID
      const groupResponse = await api.get(`/groups?nome=${nomeGrupo}`);
      const grupoEncontrado = groupResponse.data[0];

      if (grupoEncontrado) {
        setGrupo(grupoEncontrado);

        // Verificação de Membro
        const usuarioSalvo = localStorage.getItem("agora-usuario");
        const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
        if (usuarioLogado && grupoEncontrado.members) {
          const checkIsMember = grupoEncontrado.members.some(member => member.id === usuarioLogado.id);
          setIsMember(checkIsMember);
          // Verificação de Dono
          if (grupoEncontrado.owner_id === usuarioLogado.id) {
            setIsOwner(true);
          }
        }

        // 2. Buscar os posts usando o ID do grupo
        const postsResponse = await api.get(`/posts?grupoId=${grupoEncontrado.id}`);
        setPosts(postsResponse.data);
      } else {
        setErro("Grupo não encontrado.");
      }
    } catch (err) {
      console.error("Erro ao carregar grupo e posts:", err);
      setErro("Não foi possível carregar os dados do grupo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nomeGrupo) {
      carregarGrupoEPosts();
    }
  }, [nomeGrupo]);

  const handleJoinGroup = async () => {
    const usuarioSalvo = localStorage.getItem("agora-usuario");
    const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

    if (!usuarioLogado || !grupo) return;

    try {
      setJoinLoading(true);
      await api.post(`/groups/${grupo.id}/join`, { usuarioId: usuarioLogado.id });
      // Recarrega os dados para refletir a nova membresia
      await carregarGrupoEPosts();
    } catch (err) {
      console.error("Erro ao entrar no grupo:", err);
      alert("Não foi possível entrar no grupo.");
    } finally {
      setJoinLoading(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (window.confirm("Tem certeza que deseja excluir este grupo? Esta ação é irreversível.")) {
      const usuarioSalvo = localStorage.getItem("agora-usuario");
      const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
      try {
        await api.delete(`/groups/${grupo.id}`, {
          data: { userId: usuarioLogado.id }
        });
        alert("Grupo excluído com sucesso.");
        navigate('/');
      } catch (err) {
        console.error("Erro ao excluir grupo:", err);
        alert(err.response?.data?.error || "Não foi possível excluir o grupo.");
      }
    }
  };

  const handleOpenEditModal = () => {
    if (grupo) {
      setEditedNome(grupo.nome);
      setEditedDescricao(grupo.descricao || "");
      setEditModalOpen(true);
    }
  };

  const handleUpdateGroup = async () => {
    const usuarioSalvo = localStorage.getItem("agora-usuario");
    const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
    try {
      await api.put(`/groups/${grupo.id}`, {
        nome: editedNome,
        descricao: editedDescricao,
        userId: usuarioLogado.id
      });
      setEditModalOpen(false);
      // Se o nome mudou, navega para a nova URL, senão apenas recarrega os dados
      if (editedNome !== nomeGrupo) {
        navigate(`/grupo/${editedNome}`);
      } else {
        await carregarGrupoEPosts();
      }
    } catch (err) {
      console.error("Erro ao editar grupo:", err);
      alert(err.response?.data?.error || "Não foi possível editar o grupo.");
    }
  };

  return (
    <Box>
      <Header />

      <Box my={14}>
        <Box textAlign="center" mb={2}>
          <Typography fontSize={'2rem'} fontWeight={'bold'} color="primary">
            {loading ? "Carregando grupo..." : `Grupo: ${nomeGrupo}`}
          </Typography>
          {!loading && grupo && (
            <>
              <Typography variant="caption" color="text.primary">
                Criado por{' '}
                <Link to={`/perfil/${grupo.owner_username}`} style={{ color: 'inherit' }}>
                  @{grupo.owner_username}
                </Link>
              </Typography>
              {grupo.descricao && (
                <Typography variant="body2" color="text.primary" mt={1}>
                  {grupo.descricao}
                </Typography>
              )}
            </>
          )}
        </Box>

        {erro && <Typography color="error" textAlign="center">{erro}</Typography>}

        {!loading && !erro && grupo && (
          isMember ? (
            <>
              <NewPostModal onPostCriado={carregarGrupoEPosts} grupoFixo={grupo} />
              {isOwner && (
                <Box textAlign="center" mb={2}>
                  <Button onClick={handleOpenEditModal} startIcon={<EditIcon />}>Editar Grupo</Button>
                  <Button onClick={handleDeleteGroup} startIcon={<DeleteIcon />} color="error">
                    Excluir Grupo
                  </Button>
                </Box>
              )}
              <Posts postagens={posts} onPostsChange={carregarGrupoEPosts} />
            </>
          ) : (
            <Box textAlign="center" mt={4}>
              <Typography variant="h6" mb={2}>
                Você precisa ser um membro para ver e criar postagens neste grupo.
              </Typography>
              <Button
                variant="contained"
                onClick={handleJoinGroup}
                disabled={joinLoading}
              >
                {joinLoading ? "Entrando..." : "Entrar no grupo"}
              </Button>
            </Box>
          )
        )}

      </Box>

      {/* Modal de Edição de Grupo */}
      <Modal open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
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
            Editar Grupo
          </Typography>
          <TextField
            fullWidth
            label="Nome do Grupo"
            InputLabelProps={{ sx: { color: 'text.primary' } }}
            value={editedNome}
            onChange={(e) => setEditedNome(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Descrição (opcional)"
            InputLabelProps={{ sx: { color: 'text.primary' } }}
            value={editedDescricao}
            onChange={(e) => setEditedDescricao(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <Box textAlign="right">
            <Button onClick={() => setEditModalOpen(false)} sx={{ mr: 1 }}>Cancelar</Button>
            <Button variant="contained" onClick={handleUpdateGroup}>Salvar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}