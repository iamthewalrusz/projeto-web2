import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


export default function newPostModal() {
  return (
    <Box px={4}>
      <Box maxWidth={'md'} width={'100%'} backgroundColor={'background.paper'} borderRadius={2} boxShadow={3} p={4} mb={4} mx={'auto'}>

        <TextField
          label="Nova postagem..."
          multiline
          fullWidth
          
          sx={{
            '& label': {
              color: 'primary.main',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
          minRows={3} 
        />

        <Box textAlign={'right'} mt={2}>
          <Button variant="contained" color="primary">
            Postar
          </Button>
        </Box>

      </Box>
    </Box>
  )
}