import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';
import Perfil from './pages/Perfil';
import Grupo from './pages/Grupo';

function App() {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastrar' element={<Cadastrar />} />
        <Route path='/perfil/:username' element={<Perfil />} />
        <Route path='/grupo/:nomeGrupo' element={<Grupo />} />
      </Routes>
    </Box>
  );
}

export default App;
