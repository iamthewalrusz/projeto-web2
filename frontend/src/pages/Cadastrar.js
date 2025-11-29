import Box from "@mui/material/Box";
import Header from "../components/Header";
import CadastroModal from "../components/CadastroModal"

export default function Cadastrar() {
  return (
    <Box>
      <Header />

      <Box my={14}>

        <CadastroModal/>
        
      </Box>
    </Box>
  )
}