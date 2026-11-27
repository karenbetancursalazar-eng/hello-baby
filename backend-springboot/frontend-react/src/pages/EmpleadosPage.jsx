/**
 * EmpleadosPage: módulo de empleados del front-end.
 * Justificación: une el formulario, la tabla, el buscador, el modal de
 * confirmación y los mensajes, siguiendo el flujo de datos definido en AA4-EV02.
 */
import { useEffect, useMemo, useState } from 'react';
import Card from '../components/Card.jsx';
import Alert from '../components/Alert.jsx';
import SearchBar from '../components/SearchBar.jsx';
import DataTable from '../components/DataTable.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';
import EmpleadoForm from '../components/EmpleadoForm.jsx';
import {
  actualizarEmpleado,
  crearEmpleado,
  eliminarEmpleado,
  listarEmpleados,
} from '../services/empleadosApi.js';

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [empleadoEditando, setEmpleadoEditando] = useState(null);
  const [empleadoEliminar, setEmpleadoEliminar] = useState(null);
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });
  const [cargando, setCargando] = useState(true);

  /** Carga inicial de datos desde el servicio. */
  useEffect(() => {
    listarEmpleados()
      .then(setEmpleados)
      .catch((error) => mostrarError(error))
      .finally(() => setCargando(false));
  }, []);

  function mostrarError(error) {
    setAlerta({ tipo: 'error', mensaje: error.message });
  }

  /** Filtra la lista por nombre, cédula, correo o rol. */
  const empleadosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) {
      return empleados;
    }
    return empleados.filter((empleado) =>
      [
        empleado.nombres,
        empleado.apellidos,
        empleado.cedula,
        empleado.correo,
        empleado.rol,
      ]
        .join(' ')
        .toLowerCase()
        .includes(termino),
    );
  }, [empleados, busqueda]);

  /** Guarda un empleado nuevo o actualiza el seleccionado. */
  async function guardarEmpleado(datos) {
    setCargando(true);
    try {
      if (empleadoEditando) {
        await actualizarEmpleado(empleadoEditando.id, datos);
        setAlerta({ tipo: 'success', mensaje: 'Empleado actualizado correctamente.' });
      } else {
        await crearEmpleado(datos);
        setAlerta({ tipo: 'success', mensaje: 'Empleado registrado correctamente.' });
      }
      setEmpleados(await listarEmpleados());
      setEmpleadoEditando(null);
    } catch (error) {
      mostrarError(error);
    } finally {
      setCargando(false);
    }
  }

  /** Confirma la eliminación del empleado seleccionado. */
  async function confirmarEliminacion() {
    if (!empleadoEliminar) {
      return;
    }
    setCargando(true);
    try {
      await eliminarEmpleado(empleadoEliminar.id);
      setEmpleados(await listarEmpleados());
      setAlerta({ tipo: 'success', mensaje: 'Empleado eliminado correctamente.' });
    } catch (error) {
      mostrarError(error);
    } finally {
      setEmpleadoEliminar(null);
      setCargando(false);
    }
  }

  const columnas = [
    { clave: 'id', etiqueta: 'ID' },
    {
      clave: 'nombre',
      etiqueta: 'Nombre',
      render: (fila) => `${fila.nombres} ${fila.apellidos}`,
    },
    { clave: 'cedula', etiqueta: 'Cédula' },
    { clave: 'correo', etiqueta: 'Correo' },
    { clave: 'whatsapp', etiqueta: 'WhatsApp' },
    { clave: 'rol', etiqueta: 'Rol' },
    {
      clave: 'tipo',
      etiqueta: 'Área',
      render: (fila) =>
        fila.tipo === 'barberia' ? 'Barbería' : 'Peluquería',
    },
  ];

  return (
    <div className="page">
      <h1>Empleados</h1>
      <p className="page-desc">Registra, consulta, actualiza y elimina empleados.</p>

      <Alert
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        onCerrar={() => setAlerta({ tipo: '', mensaje: '' })}
      />

      <Card titulo={empleadoEditando ? 'Editar Empleado' : 'Nuevo Empleado'}>
        <EmpleadoForm
          empleado={empleadoEditando}
          onSubmit={guardarEmpleado}
          onCancel={() => setEmpleadoEditando(null)}
          guardando={cargando}
        />
      </Card>

      <Card
        titulo="Empleados Registrados"
        acciones={
          <SearchBar
            value={busqueda}
            onChange={setBusqueda}
            placeholder="Buscar empleado..."
          />
        }
      >
        <p className="page-desc">
          Registros en MySQL · Peluquería:{' '}
          {empleados.filter((item) => item.tipo === 'peluqueria').length} ·
          Barbería: {empleados.filter((item) => item.tipo === 'barberia').length}
        </p>

        <DataTable
          columnas={columnas}
          datos={empleadosFiltrados}
          onEditar={(empleado) => setEmpleadoEditando(empleado)}
          onEliminar={(empleado) => setEmpleadoEliminar(empleado)}
          mensajeVacio="No hay empleados registrados aún."
        />
      </Card>

      <ConfirmModal
        abierto={Boolean(empleadoEliminar)}
        titulo="Confirmar eliminación"
        mensaje={
          empleadoEliminar
            ? `¿Deseas eliminar a ${empleadoEliminar.nombres} ${empleadoEliminar.apellidos}? Esta operación no se puede deshacer.`
            : ''
        }
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setEmpleadoEliminar(null)}
      />
    </div>
  );
}

export default EmpleadosPage;
