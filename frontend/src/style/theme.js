import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7E7757',
    },
    background: {
      default: '#202020ff',
      paper: '#EDE4C3',
    },
    text: {
      primary: '#1D1D1D',
      secondary: '#FFF7D7',
    },
  },
  typography: {
    fontFamily: [
      '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Segoe UI Emoji"', '"Segoe UI Symbol"',
    ].join(','),
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7E7757',
    },
    background: {
      default: '#FFF7D7',
      paper: '#EDE4C3',
    },
    text: {
      primary: '#1D1D1D',
      secondary: '#FFF7D7',
    },
  },
  typography: {
    fontFamily: [
      '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Segoe UI Emoji"', '"Segoe UI Symbol"',
    ].join(','),
  },
});