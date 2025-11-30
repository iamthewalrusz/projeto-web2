import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function UserModal({subDate, numPosts, groups}) {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} px={4}>

      <Box maxWidth={'md'} width={'100%'} backgroundColor={'background.paper'} padding={'3rem'} borderRadius={'8px'} boxShadow={3} my={2}>
        <Typography variant="h6" gutterBottom>
          Membro desde: {subDate}
        </Typography>

        <Divider sx={{marginY: '1rem'}} />

        <Typography variant="h6" gutterBottom>
          Número de postagens: {numPosts}
        </Typography>

        <Divider sx={{marginY: '1rem'}} />

        <Typography variant="h6" gutterBottom>Grupos que participa:</Typography>
        {groups.length > 0 ? (
          <List dense>
            {groups.map((group) => (
              <ListItem key={group.id} disablePadding>
                <Link to={`/grupo/${group.nome}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography color="primary.main" sx={{ '&:hover': { textDecoration: 'underline' } }}>{group.nome}</Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.primary">Este usuário não participa de nenhum grupo.</Typography>
        )}
      </Box>

    </Box>
  )
}