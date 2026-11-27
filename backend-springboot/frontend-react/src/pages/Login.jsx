/**
 * Login: pantalla de inicio de sesión.
 * Justificación: es el punto de entrada del flujo Login → Dashboard → módulos.
 */
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Alert from '../components/Alert.jsx';

function Login() {
  const { iniciarSesion } = useAuth();
  const navegar = useNavigate();
  const ubicacion = useLocation();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  function manejarEnvio(evento) {
    evento.preventDefault();
    const resultado = iniciarSesion(usuario, contrasena);

    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }

    setError('');
    const destino = ubicacion.state?.desde ?? '/empleados';
    navegar(destino, { replace: true });
  }

  return (
    <main className="login-page">
      <Card titulo="Iniciar sesión">
        <p className="login-brand">hello <b>baby</b></p>
        <Alert tipo="error" mensaje={error} />

        <form onSubmit={manejarEnvio} className="empleado-form">
          <label className="field">
            <span>Usuario</span>
            <input
              type="text"
              value={usuario}
              onChange={(evento) => setUsuario(evento.target.value)}
              autoComplete="username"
            />
          </label>

          <label className="field">
            <span>Contraseña</span>
            <input
              type="password"
              value={contrasena}
              onChange={(evento) => setContrasena(evento.target.value)}
              autoComplete="current-password"
            />
          </label>

          <Button type="submit" variant="primary">
            Ingresar
          </Button>
        </form>

        <p className="login-hint">
          Usuarios de prueba: <code>admin</code>, <code>recepcion</code>,
          <code>barbero</code> o <code>estilista</code>. Contraseña igual al usuario.
        </p>
      </Card>
    </main>
  );
}

export default Login;
