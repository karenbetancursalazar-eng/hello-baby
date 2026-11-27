/**
 * Dashboard: panel principal con resumen y accesos a los módulos.
 * Justificación: presenta la información más importante a cada rol.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import { listarEmpleados } from '../services/empleadosApi.js';

function Dashboard() {
  const [totales, setTotales] = useState({ total: 0, peluqueria: 0, barberia: 0 });

  useEffect(() => {
    listarEmpleados().then((empleados) => {
      setTotales({
        total: empleados.length,
        peluqueria: empleados.filter((item) => item.tipo === 'peluqueria').length,
        barberia: empleados.filter((item) => item.tipo === 'barberia').length,
      });
    });
  }, []);

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p className="page-desc">Resumen general del sistema Hello Baby.</p>

      <div className="cards-grid">
        <Card titulo="Empleados registrados">
          <p className="metrica">{totales.total}</p>
          <Link to="/empleados">Ir a Empleados</Link>
        </Card>
        <Card titulo="Peluquería">
          <p className="metrica">{totales.peluqueria}</p>
        </Card>
        <Card titulo="Barbería">
          <p className="metrica">{totales.barberia}</p>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
