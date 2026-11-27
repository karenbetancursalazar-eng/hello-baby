/**
 * Reglas de validación del formulario de empleados.
 * Estas reglas corresponden a los criterios de aceptación de las
 * historias de usuario y al estándar de validación del proyecto.
 */

export const MENSAJES = {
  obligatorio: 'Este campo es obligatorio.',
  nombre: 'El nombre solo debe contener letras, espacios, apóstrofos, puntos o guiones.',
  cedula: 'La cédula debe contener solo números (8 a 10 dígitos).',
  correo: 'Ingresa un correo electrónico válido, por ejemplo nombre@correo.com.',
  whatsapp: 'Ingresa un número de WhatsApp válido.',
  fecha: 'Ingresa una fecha de nacimiento válida.',
};

/**
 * Valida nombres y apellidos: letras (incluye tildes y ñ), espacios,
 * apóstrofos, puntos y guiones. Rechaza números y símbolos como Ana123.
 */
export function esNombreValido(valor) {
  return /^[\p{L}][\p{L}\s'.-]*$/u.test(valor.trim());
}

/** Valida la cédula de ciudadanía: 8 a 10 dígitos numéricos. */
export function esCedulaValida(valor) {
  return /^\d{8,10}$/.test(valor);
}

/** Valida un correo electrónico simple. */
export function esCorreoValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

/** Valida un número de WhatsApp con 7 a 15 caracteres permitidos. */
export function esWhatsappValido(valor) {
  return /^\+?[0-9\s()-]{7,15}$/.test(valor);
}

/** Valida que la fecha sea válida y no futura. */
export function esFechaValida(valor) {
  if (!valor) {
    return false;
  }
  const fecha = new Date(valor);
  return !Number.isNaN(fecha.getTime()) && fecha <= new Date();
}

/**
 * Valida todos los campos del formulario.
 * Devuelve un objeto de errores; vacío significa que todo está correcto.
 */
export function validarEmpleado(formulario) {
  const errores = {};

  if (!formulario.nombres.trim()) errores.nombres = MENSAJES.obligatorio;
  else if (!esNombreValido(formulario.nombres)) errores.nombres = MENSAJES.nombre;

  if (!formulario.apellidos.trim()) errores.apellidos = MENSAJES.obligatorio;
  else if (!esNombreValido(formulario.apellidos)) errores.apellidos = MENSAJES.nombre;

  if (!formulario.cedula.trim()) errores.cedula = MENSAJES.obligatorio;
  else if (!esCedulaValida(formulario.cedula.trim())) errores.cedula = MENSAJES.cedula;

  if (!formulario.fechaNacimiento) errores.fechaNacimiento = MENSAJES.obligatorio;
  else if (!esFechaValida(formulario.fechaNacimiento)) errores.fechaNacimiento = MENSAJES.fecha;

  if (!formulario.correo.trim()) errores.correo = MENSAJES.obligatorio;
  else if (!esCorreoValido(formulario.correo.trim())) errores.correo = MENSAJES.correo;

  if (!formulario.whatsapp.trim()) errores.whatsapp = MENSAJES.obligatorio;
  else if (!esWhatsappValido(formulario.whatsapp.trim())) errores.whatsapp = MENSAJES.whatsapp;

  return errores;
}
