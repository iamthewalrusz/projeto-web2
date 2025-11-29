import Box from "@mui/material/Box";
import Header from "../components/Header";
import LoginModal from "../components/LoginModal";

export default function Login() {
  return (
    <Box>
      <Header />

      <Box my={14}>

        <LoginModal/>

      </Box>
    </Box>
  )
}