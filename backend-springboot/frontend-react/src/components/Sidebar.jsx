/**
 * Sidebar: menú lateral con los módulos de Hello Baby.
 * Justificación: concentra la lógica de control de acceso por rol.
 */
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const MODULOS = [
  { ruta: '/dashboard', etiqueta: 'Dashboard', roles: null },
  { ruta: '/empleados', etiqueta: 'Empleados', roles: null },
  {
    ruta: '#',
    etiqueta: 'Clientes',
    roles: ['administrador', 'recepcionista'],
  },
  { ruta: '#', etiqueta: 'Servicios', roles: ['administrador', 'recepcionista'] },
  { ruta: '#', etiqueta: 'Citas', roles: ['administrador', 'recepcionista', 'barbero', 'estilista'] },
  { ruta: '#', etiqueta: 'Ganancias', roles: ['administrador'] },
];

function Sidebar() {
  const { tieneRol } = useAuth();
  const modulosVisibles = MODULOS.filter((modulo) => tieneRol(modulo.roles));

  return (
    <aside className="sidebar" aria-label="Menú principal">
      <nav>
        <ul className="nav-list">
          {modulosVisibles.map((modulo) => (
            <li key={modulo.etiqueta}>
              {modulo.ruta === '#' ? (
                <span className="nav-link disabled" title="Módulo no disponible">
                  {modulo.etiqueta}
                </span>
              ) : (
                <NavLink
                  to={modulo.ruta}
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                >
                  {modulo.etiqueta}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
