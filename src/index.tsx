import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import BaseTheme from './themes/baseTheme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserProvider from './providers/UserProvider';
import PendingProvider from './providers/PendingProvider';

const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme(BaseTheme);

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ruRU'}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <UserProvider>
          <PendingProvider>
            <App />
          </PendingProvider>
        </UserProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
