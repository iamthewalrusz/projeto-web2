import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import api from "../services/api";

export default function NewPostModal({ onPostCriado }) {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePostar() {
    const usuarioSalvo = localStorage.getItem("usuario");
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

      // ⚠️ POR ENQUANTO: grupoId fixo = 1 só pra testar
      // Depois podemos trocar pra vir via props (grupoId) ou escolher o grupo na UI.
      await api.post("/posts", {
        texto,
        autorId,
        grupoId: 1,
      });

      setTexto("");

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