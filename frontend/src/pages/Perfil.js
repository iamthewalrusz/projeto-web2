import Box from "@mui/material/Box";
import Header from "../components/Header";
import Posts from "../components/Posts";
import UserModal from "../components/UserModal";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

export default function Perfil() {
  const { username } = useParams();

  return (
    <Box>
      <Header />

      <Box my={14}>

        <Typography fontSize={'2rem'} fontWeight={'bold'} textAlign={'center'} color="primary">
          Perfil de @{username}
        </Typography>
        <UserModal subDate={"01/01/2023"} numPosts={42} numGroups={5} />
        
        <Posts postagens={[
          {autor: username, texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue urna id arcu scelerisque, faucibus rhoncus nisi egestas. In facilisis ligula sem, eget hendrerit arcu accumsan vel. Nunc efficitur orci eu eros rhoncus pulvinar. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis pulvinar porta turpis, eu porta massa sodales at. Vivamus cursus urna vel ligula pulvinar tincidunt. Curabitur sagittis metus vel risus cursus, et lobortis purus hendrerit. In sit amet tempus massa. Curabitur eget accumsan turpis. Aliquam venenatis commodo rutrum. Sed tincidunt commodo neque, non scelerisque nunc tincidunt quis. '},

          {autor: username, texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue urna id arcu scelerisque, faucibus rhoncus nisi egestas. In facilisis ligula sem, eget hendrerit arcu accumsan vel. Nunc efficitur orci eu eros rhoncus pulvinar. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis pulvinar porta turpis, eu porta massa sodales at. Vivamus cursus urna vel ligula pulvinar tincidunt. Curabitur sagittis metus vel risus cursus, et lobortis purus hendrerit. In sit amet tempus massa. Curabitur eget accumsan turpis. Aliquam venenatis commodo rutrum. Sed tincidunt commodo neque, non scelerisque nunc tincidunt quis. '},

          {autor: username, texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue urna id arcu scelerisque, faucibus rhoncus nisi egestas. In facilisis ligula sem, eget hendrerit arcu accumsan vel. Nunc efficitur orci eu eros rhoncus pulvinar. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis pulvinar porta turpis, eu porta massa sodales at. Vivamus cursus urna vel ligula pulvinar tincidunt. Curabitur sagittis metus vel risus cursus, et lobortis purus hendrerit. In sit amet tempus massa. Curabitur eget accumsan turpis. Aliquam venenatis commodo rutrum. Sed tincidunt commodo neque, non scelerisque nunc tincidunt quis. '}
        ]} />

      </Box>
    </Box>
  )
}