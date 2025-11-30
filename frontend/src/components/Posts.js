import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from "../services/api";
import { Link } from "react-router-dom";

function PostItem({ post, onPostDeleted, onPostUpdated }) {
  const { id, autor_username: autor, texto, grupo_nome } = post;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedText, setEditedText] = useState(texto);

  const usuarioSalvo = localStorage.getItem("agora-usuario");
  const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      try {
        await api.delete(`/posts/${id}`, {
          data: { userId: usuarioLogado.id } // Enviando userId para autorização no backend
        });
        if (onPostDeleted) onPostDeleted(id);
      } catch (err) {
        console.error("Erro ao excluir post:", err);
        alert(err.response?.data?.error || "Não foi possível excluir o post.");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/posts/${id}`, {
        texto: editedText,
        userId: usuarioLogado.id // Enviando userId para autorização
      });
      setEditModalOpen(false);
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      console.error("Erro ao editar post:", err);
      alert(err.response?.data?.error || "Não foi possível editar o post.");
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        margin: "2rem",
      }}
    >
      {/* Modal de Edição */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-post-modal-title"
      >
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
          <Typography id="edit-post-modal-title" variant="h6" component="h2">
            Editar Postagem
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={4}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <Box textAlign="right">
            <Button onClick={() => setEditModalOpen(false)} sx={{ mr: 1 }}>Cancelar</Button>
            <Button variant="contained" onClick={handleUpdate}>Salvar</Button>
          </Box>
        </Box>
      </Modal>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Link to={`/perfil/${autor}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" gutterBottom fontWeight={"bold"} color="primary.main">
            @{autor}
          </Typography>
        </Link>

        {(() => {
          const isOwner = usuarioLogado && usuarioLogado.username === autor;

          if (isOwner) {
            return (
              <Box>
                <IconButton onClick={() => setEditModalOpen(true)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete} size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
            );
          }
          return null;
        })()}
      </Box>
      <Typography variant="body1">{texto}</Typography>

      {grupo_nome && (
        <Box mt={1}>
          <Typography variant="caption" color="text.primary">
            em{' '}
            <Link to={`/grupo/${grupo_nome}`} style={{ color: 'inherit' }}>{grupo_nome}</Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default function Posts({ postagens, onPostsChange }) {

  const handlePostDeleted = (deletedPostId) => {
    if (onPostsChange) onPostsChange();
  };

  const handlePostUpdated = () => {
    if (onPostsChange) onPostsChange();
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} px={4}>
      <Box textAlign={"center"} marginTop={"1rem"} marginBottom={"1rem"} width={"100%"}>
        <Typography fontSize={"2rem"} color="primary.main" fontWeight={"bold"}>
          Postagens
        </Typography>
      </Box>

      <Box
        maxWidth={"md"}
        width={"100%"}
        backgroundColor={"background.paper"}
        padding={"1rem"}
        borderRadius={"8px"}
        boxShadow={3}
      >
        {postagens && postagens.length > 0 ? (
          postagens.map((post, index) => (
            <PostItem
              key={post.id || index}
              post={post}
              onPostDeleted={handlePostDeleted}
              onPostUpdated={handlePostUpdated}
            />
          ))
        ) : (
          <Typography textAlign="center" color="text.primary" p={3}>
            Ainda não há nenhuma postagem por aqui.
          </Typography>
        )}
      </Box>
    </Box>
  );
}