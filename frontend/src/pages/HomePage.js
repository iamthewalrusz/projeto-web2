import Box from "@mui/material/Box";
import Header from "../components/Header";
import Posts from "../components/Posts";
import NewPostModal from "../components/newPostModal";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function HomePage() {
  const [postagens, setPostagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const carregarPosts = async () => {
    try {
      setErro("");
      setLoading(true);
      const response = await api.get("/posts"); // GET /api/posts

      setPostagens(response.data);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar postagens.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPosts();
  }, []);

  return (
    <Box>
      <Header />

      <Box my={14}>
        {/* modal de novo post avisa o Home quando criar um post */}
        <NewPostModal onPostCriado={carregarPosts} />

        {loading && (
          <Typography textAlign="center" mt={2}>
            Carregando postagens...
          </Typography>
        )}

        {erro && (
          <Typography textAlign="center" mt={2} color="error">
            {erro}
          </Typography>
        )}

        {!loading && !erro && <Posts postagens={postagens} onPostsChange={carregarPosts} />}
      </Box>
    </Box>
  );
}