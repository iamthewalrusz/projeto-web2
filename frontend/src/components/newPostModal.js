import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function NewPostModal({ onPostCriado, grupoFixo }) {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [grupos, setGrupos] = useState([]); // Lista de grupos para o dropdown
  const [grupoId, setGrupoId] = useState(""); // ID do grupo selecionado

  useEffect(() => {
    const fetchUserGroups = async () => {
      const usuarioSalvo = localStorage.getItem("agora-usuario");
      if (!usuarioSalvo) return;
      
      const usuarioLogado = JSON.parse(usuarioSalvo);

      try {
        // Busca o perfil completo do usuário, que inclui a lista de grupos
        const response = await api.get(`/users/${usuarioLogado.id}`);
        if (response.data && response.data.groups) {
          setGrupos(response.data.groups);
        }
      } catch (err) {
        console.error("Erro ao buscar grupos do usuário", err);
      }
    };
    if (!grupoFixo) {
      fetchUserGroups();
    }
  }, [grupoFixo]);
  async function handlePostar() {
    const usuarioSalvo = localStorage.getItem("agora-usuario");
    if (!usuarioSalvo) {
      alert("Você precisa estar logado para postar.");
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);
    const autorId = usuario.id;

    if (!texto.trim()) {
      return;
    }

    try {
      setLoading(true);

      // Determina o ID do grupo a ser enviado
      const idGrupoParaPostar = grupoFixo ? grupoFixo.id : (grupoId || null);

      await api.post("/posts", {
        texto,
        autorId,
        grupoId: idGrupoParaPostar,
      });

      setTexto("");
      setGrupoId(""); // Reseta a seleção do grupo

      if (onPostCriado) {
        onPostCriado(); // avisa a HomePage pra recarregar
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao criar postagem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box px={4}>
      <Box
        maxWidth={"md"}
        width={"100%"}
        backgroundColor={"background.paper"}
        borderRadius={2}
        boxShadow={3}
        p={4}
        mb={4}
        mx={"auto"}
      >
        <TextField
          label="Nova postagem..."
          multiline
          fullWidth
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          sx={{
            "& label": {
              color: "primary.main",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
          minRows={3}
        />

        {/* Mostra o seletor de grupo apenas se não estiver em uma página de grupo fixa */}
        {!grupoFixo && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="group-select-label" sx={{ color: 'primary.main' }}>Grupo (opcional)</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              value={grupoId}
              label="Grupo (opcional)"
              onChange={(e) => setGrupoId(e.target.value)}
            >
              <MenuItem value="">
                <em>Nenhum (Público)</em>
              </MenuItem>
              {grupos.map((grupo) => (
                <MenuItem key={grupo.id} value={grupo.id}>
                  {grupo.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Box textAlign={"right"} mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostar}
            disabled={loading}
          >
            {loading ? "Postando..." : "Postar"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}