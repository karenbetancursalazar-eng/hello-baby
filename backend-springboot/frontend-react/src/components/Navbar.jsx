/**
 * Navbar: barra superior con logo, selector de tema y usuario.
 * Justificación: está presente en todas las pantallas internas y se mantiene
 * en un solo componente.
 */
import { useAuth } from '../context/AuthContext.jsx';
import Button from './Button.jsx';
import ThemeSelector from './ThemeSelector.jsx';

function Navbar() {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="brand">hello <b>baby</b></span>
      </div>

      <ThemeSelector />

      <div className="topbar-right">
        <span className="user-chip">
          <span className="avatar" aria-hidden="true">
            {usuario?.nombre?.charAt(0) ?? 'U'}
          </span>
          <span className="user-meta">
            <span className="user-name">{usuario?.nombre}</span>
            <span className="user-role">{usuario?.rol}</span>
          </span>
        </span>
        <Button variant="ghost" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
