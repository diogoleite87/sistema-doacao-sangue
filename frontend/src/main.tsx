import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import 'react-toastify/dist/ReactToastify.css';

import { DarkModeContextProvider } from './hooks/useDarkMode.tsx';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <CssBaseline />
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>,
)
