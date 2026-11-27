/**
 * Alert: mensaje de éxito o error mostrado al usuario.
 * Justificación: unifica la forma de informar resultados de las operaciones.
 */
import Button from './Button.jsx';

function Alert({ tipo = 'success', mensaje, onCerrar }) {
  if (!mensaje) {
    return null;
  }

  return (
    <div className={`alert alert-${tipo}`} role="status">
      <span>{mensaje}</span>
      {onCerrar && (
        <Button variant="ghost" onClick={onCerrar} aria-label="Cerrar mensaje">
          ×
        </Button>
      )}
    </div>
  );
}

export default Alert;
