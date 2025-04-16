import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { createTheme, CssBaseline, ThemeProvider as LibThemeProvider } from '@mui/material';
import { ThemeMode } from '../Models/Theme';

const darkTheme = createTheme({
  palette: { mode: ThemeMode.Dark },
  components: { MuiPaper: { defaultProps: { elevation: 5 } } }
});

const lightTheme = createTheme({
  palette: { mode: ThemeMode.Light },
  components: { MuiPaper: { defaultProps: { elevation: 2 } } }
});

export type ThemeContextProps = {
  themeMode: ThemeMode;
  onThemeMode: () => void;
};

const ThemeContext = React.createContext<ThemeContextProps | null>(null);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Light);

  const onThemeMode = () => setThemeMode(themeMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light);

  return (
    <ThemeContext.Provider value={{ themeMode, onThemeMode }}>
      <LibThemeProvider theme={themeMode === ThemeMode.Light ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </LibThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const event = useContext(ThemeContext);
  if (event == null) {
    throw new Error('useTheme() called outside of a ThemeProvider?');
  }
  return event;
};

export { ThemeProvider, useTheme };
