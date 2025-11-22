import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function UserModal({subDate, numPosts, numGroups}) {
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
        <Typography variant="h6" gutterBottom>
          Número de grupos: {numGroups}
        </Typography>
      </Box>

    </Box>
  )
}