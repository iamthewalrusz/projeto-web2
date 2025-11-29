import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function PostItem({ autor, texto }) {
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
      <Typography variant="h6" gutterBottom fontWeight={"bold"} color="primary.main">
        @{autor}
      </Typography>
      <Typography variant="body1">{texto}</Typography>
    </Box>
  );
}

export default function Posts({ postagens }) {
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
        {postagens.map((post, index) => (
          <PostItem key={index} autor={post.autor} texto={post.texto} />
        ))}
      </Box>
    </Box>
  );
}