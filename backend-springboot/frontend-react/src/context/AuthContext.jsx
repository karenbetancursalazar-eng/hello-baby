/**
 * AuthContext: guarda el usuario autenticado y su rol.
 * La información se usa en Sidebar y ProtectedRoute para controlar el acceso.
 */
import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const CLAVE_ALMACENAMIENTO = 'hello-baby-usuario';

/**
 * Usuarios de demostración. En producción esta validación la hace el backend.
 */
const USUARIOS = [
  {
    usuario: 'admin',
    contrasena: 'admin',
    nombre: 'Carlos Rodríguez',
    rol: 'administrador',
  },
  {
    usuario: 'recepcion',
    contrasena: 'recepcion',
    nombre: 'María Recepción',
    rol: 'recepcionista',
  },
  {
    usuario: 'barbero',
    contrasena: 'barbero',
    nombre: 'Jairo Alarcón',
    rol: 'barbero',
  },
  {
    usuario: 'estilista',
    contrasena: 'estilista',
    nombre: 'Sofía López',
    rol: 'estilista',
  },
];

function leerUsuarioGuardado() {
  try {
    const texto = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    return texto ? JSON.parse(texto) : null;
  } catch (error) {
    // Si el JSON está corrupto, se ignora y se pide login nuevamente.
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado);

  function iniciarSesion(usuarioIngresado, contrasena) {
    const encontrado = USUARIOS.find(
      (item) =>
        item.usuario === usuarioIngresado.trim().toLowerCase() &&
        item.contrasena === contrasena,
    );

    if (!encontrado) {
      return { ok: false, mensaje: 'Usuario o contraseña incorrectos.' };
    }

    // No se guarda la contraseña en la sesión del front-end.
    const sesion = {
      nombre: encontrado.nombre,
      rol: encontrado.rol,
      usuario: encontrado.usuario,
    };
    setUsuario(sesion);
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(sesion));
    return { ok: true };
  }

  function cerrarSesion() {
    setUsuario(null);
    localStorage.removeItem(CLAVE_ALMACENAMIENTO);
  }

  const valor = useMemo(
    () => ({
      usuario,
      iniciarSesion,
      cerrarSesion,
      tieneRol: (roles) => !roles || roles.includes(usuario?.rol),
    }),
    [usuario],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return contexto;
}
