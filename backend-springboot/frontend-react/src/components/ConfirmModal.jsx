/**
 * ConfirmModal: ventana de confirmación antes de eliminar un registro.
 * Justificación: evita eliminaciones accidentales y se reutiliza en varios módulos.
 */
import Button from './Button.jsx';

function ConfirmModal({ abierto, titulo, mensaje, onConfirmar, onCancelar }) {
  if (!abierto) {
    return null;
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
      <div className="modal-card">
        <h3 id="modal-titulo">{titulo}</h3>
        <p>{mensaje}</p>
        <div className="modal-actions">
          <Button variant="outline" onClick={onCancelar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirmar}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
