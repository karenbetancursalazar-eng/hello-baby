/**
 * Layout: estructura común de las pantallas internas.
 * Justificación: todas las páginas comparten barra superior, menú lateral
 * y área de contenido; se define una sola vez.
 */
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
