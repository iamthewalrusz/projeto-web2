import Box from '@mui/material/Box';
import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';
import Perfil from './pages/Perfil';
import Grupo from './pages/Grupo';

function ProtectedRoute({ children }) {
  const usuario = localStorage.getItem("agora-usuario");
  if (!usuario) {
    return <Navigate to="/cadastrar" replace />;
  }
  return children;
}

function App() {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastrar' element={<Cadastrar />} />
        <Route path='/perfil/:username' element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path='/grupo/:nomeGrupo' element={<ProtectedRoute><Grupo /></ProtectedRoute>} />
      </Routes>
    </Box>
  );
}

export default App;
