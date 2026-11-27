/**
 * Punto de entrada de la aplicación React.
 * Aquí se montan los proveedores de estado compartido y el enrutador.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/variables.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* El tema y la autenticación están disponibles para toda la app */}
    <ThemeProvider>
      <AuthProvider>
        {/* HashRouter permite publicar en GitHub Pages sin configurar reescrituras */}
        <HashRouter>
          <App />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
