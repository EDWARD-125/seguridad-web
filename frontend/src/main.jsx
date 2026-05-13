import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext.jsx';
import App from './App.jsx';
import './index.css';

try {
  const preferencias = JSON.parse(localStorage.getItem('segweb_preferencias'));
  document.documentElement.dataset.theme = preferencias?.tema || 'oscuro';
} catch {
  document.documentElement.dataset.theme = 'oscuro';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
