import { createContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../style/theme';

export const ThemeContext = createContext({
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');

  const theme = useMemo(() => (themeMode === 'light' ? lightTheme : darkTheme), [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}