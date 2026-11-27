/**
 * Componente raíz: define las rutas de Hello Baby.
 * Las rutas internas se protegen con ProtectedRoute.
 */
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EmpleadosPage from './pages/EmpleadosPage.jsx';

function App() {
  return (
    <Routes>
      {/* Ruta pública de acceso */}
      <Route path="/login" element={<Login />} />

      {/* Rutas privadas: comparten el Layout y requieren sesión */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/empleados" element={<EmpleadosPage />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
