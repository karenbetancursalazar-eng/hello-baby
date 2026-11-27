/**
 * EmpleadoForm: formulario reutilizable para registrar y editar empleados.
 * Justificación: concentra validaciones y campos en un solo componente;
 * el mismo se usa en el alta y en la actualización de un registro.
 */
import { useEffect, useState } from 'react';
import Button from './Button.jsx';
import { validarEmpleado } from '../utils/validaciones.js';

const FORMULARIO_VACIO = {
  nombres: '',
  apellidos: '',
  cedula: '',
  fechaNacimiento: '',
  correo: '',
  whatsapp: '',
  tipo: 'peluqueria',
  rol: 'Estilista',
};

function EmpleadoForm({ empleado, onSubmit, onCancel, guardando = false }) {
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});

  // Carga los datos del empleado cuando se entra en modo edición.
  useEffect(() => {
    if (empleado) {
      const { id, activo, ...resto } = empleado;
      setFormulario({ ...FORMULARIO_VACIO, ...resto });
    } else {
      setFormulario(FORMULARIO_VACIO);
    }
    setErrores({});
  }, [empleado]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
    // Limpia el error del campo mientras el usuario corrige el dato.
    setErrores((anterior) => ({ ...anterior, [name]: undefined }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    const erroresDetectados = validarEmpleado(formulario);
    setErrores(erroresDetectados);

    if (Object.keys(erroresDetectados).length === 0) {
      onSubmit({
        ...formulario,
        nombres: formulario.nombres.trim(),
        apellidos: formulario.apellidos.trim(),
        cedula: formulario.cedula.trim(),
        correo: formulario.correo.trim(),
        whatsapp: formulario.whatsapp.trim(),
      });
    }
  }

  return (
    <form className="empleado-form" onSubmit={manejarEnvio} noValidate>
      <div className="form-grid">
        <Campo
          etiqueta="Nombres"
          nombre="nombres"
          valor={formulario.nombres}
          onChange={manejarCambio}
          error={errores.nombres}
          maxLength={100}
        />
        <Campo
          etiqueta="Apellidos"
          nombre="apellidos"
          valor={formulario.apellidos}
          onChange={manejarCambio}
          error={errores.apellidos}
          maxLength={100}
        />
        <Campo
          etiqueta="Cédula de ciudadanía"
          nombre="cedula"
          valor={formulario.cedula}
          onChange={manejarCambio}
          error={errores.cedula}
          maxLength={10}
          inputMode="numeric"
        />
        <Campo
          etiqueta="Fecha de nacimiento"
          nombre="fechaNacimiento"
          tipo="date"
          valor={formulario.fechaNacimiento}
          onChange={manejarCambio}
          error={errores.fechaNacimiento}
        />
        <Campo
          etiqueta="Correo electrónico"
          nombre="correo"
          tipo="email"
          valor={formulario.correo}
          onChange={manejarCambio}
          error={errores.correo}
          maxLength={150}
        />
        <Campo
          etiqueta="Contacto WhatsApp"
          nombre="whatsapp"
          tipo="tel"
          valor={formulario.whatsapp}
          onChange={manejarCambio}
          error={errores.whatsapp}
          maxLength={20}
        />

        <label className="field">
          <span>Área</span>
          <select name="tipo" value={formulario.tipo} onChange={manejarCambio}>
            <option value="peluqueria">Peluquería</option>
            <option value="barberia">Barbería</option>
          </select>
        </label>

        <label className="field">
          <span>Rol</span>
          <select name="rol" value={formulario.rol} onChange={manejarCambio}>
            <option value="Estilista">Estilista</option>
            <option value="Barbero">Barbero</option>
            <option value="Empleado">Empleado</option>
          </select>
        </label>
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary" disabled={guardando}>
          {guardando
            ? 'Guardando...'
            : empleado
              ? 'Actualizar Empleado'
              : 'Guardar Empleado'}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={guardando}>
          Limpiar Campos
        </Button>
      </div>
    </form>
  );
}

/**
 * Campo de texto reutilizable dentro del formulario.
 * Separa la presentación de la validación para mantener el código limpio.
 */
function Campo({
  etiqueta,
  nombre,
  tipo = 'text',
  valor,
  onChange,
  error,
  maxLength,
  inputMode,
}) {
  return (
    <label className="field">
      <span>{etiqueta}</span>
      <input
        type={tipo}
        name={nombre}
        value={valor}
        onChange={onChange}
        maxLength={maxLength}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
      />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export default EmpleadoForm;
