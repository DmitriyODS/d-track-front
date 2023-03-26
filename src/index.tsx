import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import BaseTheme from './themes/baseTheme';

const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme(BaseTheme);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
