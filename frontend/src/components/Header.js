import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export default function Header({logged}) {
  const { toggleTheme, themeMode } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const usuario = localStorage.getItem("agora-usuario");
  const isLoggedIn = !!usuario;

  const handleLogout = () => {
    localStorage.removeItem("agora-usuario");
    navigate('/login');
    window.location.reload(); // Força a atualização do estado em toda a aplicação
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box
      width={'100vw'}
      height={'8vh'}
      backgroundColor={'primary.main'}
      position={'fixed'}
      top={'0'}
      zIndex={'10'}
    >
      <Container sx={{display: 'flex', justifyContent: 'space-between', height: '100%', alignItems: 'center'}} >
        
        <Typography component={'h1'} color="text.secondary" fontSize={'1.5rem'}>
          <Link to="/" style={{textDecoration: 'none', color: 'inherit'}} >
              <AccountBalanceIcon sx={{ marginRight: '0.5rem'}} />
              Ágora
          </Link>
        </Typography>

        <Typography component={'h2'} color="text.secondary" fontSize={'1.2rem'} fontWeight={'bold'}fve>
          Sua praça pública na internet
        </Typography>

        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            color: 'text.secondary',
          }}
        >
          <MenuIcon />
        </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          }
        }}
      >
        <MenuItem sx={{fontSize:'1.3rem'}} >
          <Link to="/" style={{textDecoration: 'none', color: 'inherit'}} >
            Início
          </Link>
        </MenuItem>

        {isLoggedIn ? (

            <>
              <MenuItem sx={{fontSize:'1.3rem'}} >
                <Link to={`/perfil/${JSON.parse(usuario).username}`} style={{textDecoration: 'none', color: 'inherit'}} >
                  Meu perfil
                </Link>
              </MenuItem>

              <MenuItem sx={{fontSize:'1.3rem'}} onClick={handleLogout} >
                  Sair
              </MenuItem>
            </>
          ) : (
            <>
            <MenuItem sx={{fontSize:'1.3rem'}} >
                <Link to="/cadastrar" style={{textDecoration: 'none', color: 'inherit'}} >
                    Cadastrar
                </Link>
            </MenuItem>

            <MenuItem sx={{fontSize:'1.3rem'}} >
                <Link to="/login" style={{textDecoration: 'none', color: 'inherit'}} >
                    Login
                </Link>
            </MenuItem>
            </>
          )

        }

        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Menu>

      </Container>
    </Box>
  )
}