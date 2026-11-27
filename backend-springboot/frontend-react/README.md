# Hello Baby · Front-end React

Evidencia **GA7-220501096-AA4-EV03** — *Componente front-end del proyecto formativo y proyectos de clase*.

**Demostración publicada:** https://karenbetancursalazar-eng.github.io/hello-baby/

## Descripción

Este proyecto contiene la codificación del módulo **Empleados** de Hello Baby usando **React + Vite**. Los componentes implementados corresponden a los definidos en la evidencia **AA4-EV02** y a los artefactos previos del proyecto (historias de usuario, casos de uso, prototipo, diagrama de clases y estándares de codificación).

## Ejecución

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

Usuarios de demostración (contraseña igual al usuario):

```text
admin / recepcion / barbero / estilista
```

## Componentes implementados

| Componente | Archivo | Justificación resumida |
|---|---|---|
| App | `src/App.jsx` | Centraliza rutas y proveedores. |
| Layout | `src/components/Layout.jsx` | Estructura común de pantallas internas. |
| Navbar | `src/components/Navbar.jsx` | Barra superior con tema y usuario. |
| Sidebar | `src/components/Sidebar.jsx` | Menú por rol. |
| ThemeSelector | `src/components/ThemeSelector.jsx` | Alterna Peluquería / Barbería. |
| ProtectedRoute | `src/components/ProtectedRoute.jsx` | Control de acceso a rutas. |
| Login | `src/pages/Login.jsx` | Punto de entrada al sistema. |
| Dashboard | `src/pages/Dashboard.jsx` | Resumen y accesos a módulos. |
| EmpleadosPage | `src/pages/EmpleadosPage.jsx` | Módulo funcional de empleados. |
| EmpleadoForm | `src/components/EmpleadoForm.jsx` | Alta y edición con validaciones. |
| DataTable | `src/components/DataTable.jsx` | Listado reutilizable con acciones. |
| SearchBar | `src/components/SearchBar.jsx` | Búsqueda reutilizable. |
| ConfirmModal | `src/components/ConfirmModal.jsx` | Confirmación antes de eliminar. |
| Alert | `src/components/Alert.jsx` | Mensajes de éxito y error. |
| Button / Card | `src/components/Button.jsx`, `Card.jsx` | Estilo uniforme. |
| ThemeContext / AuthContext | `src/context/` | Estado compartido. |
| empleadosApi | `src/services/empleadosApi.js` | Comunicación con el backend mediante `fetch`. |

## Validaciones aplicadas

- Campos obligatorios.
- Nombres y apellidos: solo letras (con tildes y ñ), espacios, apóstrofos, puntos y guiones; se rechazan números y símbolos.
- Cédula: solo números, 8 a 10 dígitos, única.
- Correo con formato válido.
- WhatsApp con 7 a 15 caracteres permitidos.
- Fecha de nacimiento válida y no futura.
- Longitudes máximas: nombres/apellidos 100, correo 150, cédula 10.

## Estándares de codificación

- JavaScript con `const`/`let`, sin `var`.
- Componentes funcionales y hooks de React.
- Nombres en `PascalCase` para componentes y `camelCase` para variables y funciones.
- Indentación de 2 espacios y punto y coma al final de cada sentencia.
- Comentarios JSDoc al inicio de cada componente, contexto y servicio.
- CSS con variables de tema y clases semánticas.
- Artefactos de apoyo en `artefactos/`.

## Temas visuales

La paleta es la misma del prototipo de Hello Baby (`css/styles.css`):

- **Peluquería** (claro): fondo `#FFF5F8`, acento rosa `#E91E63`, acento fuerte `#C2185B`, header `#131620`.
- **Barbería** (oscuro): fondo `#0D1117`, acento naranja `#FF6B00`, acento fuerte `#E85F00`, header `#0B0E13`.

El logotipo «hello baby» usa la tipografía cursiva `Dancing Script` en negrita e itálica, igual que en el prototipo. La preferencia de tema se guarda en `localStorage` con la clave `hello-baby-theme`.

## Estado de la integración con el backend

El servicio `src/services/empleadosApi.js` usa `fetch` cuando la constante `USE_MOCK` es `false`. Mientras el backend expone sus endpoints REST definitivos, el valor `true` permite ejecutar y probar el front-end con `localStorage`. Para conectarlo al backend Spring Boot solo se debe ajustar `API_BASE` a la URL real.
