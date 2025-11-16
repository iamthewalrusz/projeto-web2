import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box>
      <Typography>HomePage</Typography>

      <Link to="/login">Login</Link>
      <br/>
      <Link to="/cadastrar">Cadastrar</Link>
      <br/>
      <Link to="/perfil">Perfil</Link>
      <br/>
      <Link to="/grupo">Grupo</Link>
    </Box>
  )
}