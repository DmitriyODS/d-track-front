import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './_old_app/store';
import App from './App';
import './index.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import BaseTheme from './themes/baseTheme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme(BaseTheme);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'de'}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <App />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);
