import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/Home';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './global.css';
import { ThemeProvider } from '@mui/material/styles'; // Correct import for ThemeProvider
import theme from './theme'; // Import the theme object
import CssBaseline from '@mui/material/CssBaseline'; // Ensure consistent styling

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  </React.StrictMode>
);
