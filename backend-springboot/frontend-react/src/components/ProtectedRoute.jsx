/**
 * ProtectedRoute: protege las rutas privadas.
 * Justificación: implementa el control de acceso por rol definido en el
 * documento de componentes y en los casos de uso del proyecto.
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute({ children, rolesPermitidos }) {
  const { usuario, tieneRol } = useAuth();
  const ubicacion = useLocation();

  if (!usuario) {
    // Guarda la ruta solicitada para volver después del login.
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />;
  }

  if (!tieneRol(rolesPermitidos)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
