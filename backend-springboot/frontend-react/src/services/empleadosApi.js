/**
 * Servicio de comunicación con el backend de empleados.
 *
 * Este módulo concentra las peticiones HTTP (fetch). Mientras el backend
 * expone los endpoints REST definitivos, se usa un adaptador local con
 * localStorage para que el componente front-end pueda probarse.
 * Para conectarlo al backend real basta cambiar USE_MOCK a false.
 */

const USE_MOCK = true;
const API_BASE = '/api';
const CLAVE_ALMACENAMIENTO = 'hello-baby-empleados';

const DATOS_SEMILLA = [
  {
    id: 1,
    nombres: 'Sofía Valeria',
    apellidos: 'López Perez',
    cedula: '1018234567',
    fechaNacimiento: '1994-05-12',
    correo: 'sofia@hellobaby.com',
    whatsapp: '3001234567',
    tipo: 'peluqueria',
    rol: 'Estilista',
    activo: true,
  },
  {
    id: 2,
    nombres: 'Diego',
    apellidos: 'Ramírez',
    cedula: '1020987654',
    fechaNacimiento: '1990-08-20',
    correo: 'diego@hellobaby.com',
    whatsapp: '3109876543',
    tipo: 'peluqueria',
    rol: 'Empleado',
    activo: true,
  },
  {
    id: 3,
    nombres: 'Jairo',
    apellidos: 'Alarcón',
    cedula: '789078909',
    fechaNacimiento: '1988-03-02',
    correo: 'jairo@hellobaby.com',
    whatsapp: '3144817206',
    tipo: 'barberia',
    rol: 'Barbero',
    activo: true,
  },
];

/** Lee la lista desde localStorage o la inicializa con datos de prueba. */
function leerAlmacenamiento() {
  const texto = localStorage.getItem(CLAVE_ALMACENAMIENTO);
  if (!texto) {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(DATOS_SEMILLA));
    return [...DATOS_SEMILLA];
  }
  try {
    return JSON.parse(texto);
  } catch (error) {
    return [...DATOS_SEMILLA];
  }
}

/** Guarda la lista en localStorage y devuelve el registro afectado. */
function guardarAlmacenamiento(lista) {
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(lista));
}

/** Genera un identificador nuevo para un registro local. */
function siguienteId(lista) {
  return lista.reduce((maximo, item) => Math.max(maximo, item.id), 0) + 1;
}

/** Verifica la regla de cédula única antes de guardar. */
function validarCedulaUnica(lista, cedula, idExcluido = null) {
  return !lista.some(
    (item) => item.cedula === cedula && item.id !== idExcluido,
  );
}

/** Convierte una respuesta HTTP en JSON y lanza un error legible si falla. */
async function leerRespuesta(respuesta) {
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al consultar el backend.`);
  }
  return respuesta.json();
}

/** Obtiene todos los empleados. */
export async function listarEmpleados() {
  if (USE_MOCK) {
    return Promise.resolve(leerAlmacenamiento());
  }
  const respuesta = await fetch(`${API_BASE}/empleados`);
  return leerRespuesta(respuesta);
}

/** Crea un empleado nuevo. */
export async function crearEmpleado(datos) {
  if (USE_MOCK) {
    const lista = leerAlmacenamiento();
    if (!validarCedulaUnica(lista, datos.cedula)) {
      throw new Error('La cédula ya está registrada.');
    }
    const nuevo = { ...datos, id: siguienteId(lista) };
    guardarAlmacenamiento([...lista, nuevo]);
    return Promise.resolve(nuevo);
  }
  const respuesta = await fetch(`${API_BASE}/empleados`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return leerRespuesta(respuesta);
}

/** Actualiza un empleado existente. */
export async function actualizarEmpleado(id, datos) {
  if (USE_MOCK) {
    const lista = leerAlmacenamiento();
    if (!validarCedulaUnica(lista, datos.cedula, id)) {
      throw new Error('La cédula ya está registrada.');
    }
    const actualizados = lista.map((item) =>
      item.id === id ? { ...item, ...datos } : item,
    );
    guardarAlmacenamiento(actualizados);
    return Promise.resolve(actualizados.find((item) => item.id === id));
  }
  const respuesta = await fetch(`${API_BASE}/empleados/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return leerRespuesta(respuesta);
}

/** Elimina un empleado por identificador. */
export async function eliminarEmpleado(id) {
  if (USE_MOCK) {
    const lista = leerAlmacenamiento();
    guardarAlmacenamiento(lista.filter((item) => item.id !== id));
    return Promise.resolve({ id });
  }
  const respuesta = await fetch(`${API_BASE}/empleados/${id}`, {
    method: 'DELETE',
  });
  return leerRespuesta(respuesta);
}
