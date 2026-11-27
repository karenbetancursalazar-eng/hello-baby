/**
 * Card: contenedor de contenido con encabezado opcional.
 * Justificación: da una presentación homogénea a formularios, tablas y resúmenes.
 */
function Card({ titulo, acciones, children, className = '' }) {
  return (
    <section className={`card ${className}`.trim()}>
      {(titulo || acciones) && (
        <header className="card-head">
          {titulo && <h2>{titulo}</h2>}
          {acciones && <div className="card-actions">{acciones}</div>}
        </header>
      )}
      <div className="card-body">{children}</div>
    </section>
  );
}

export default Card;
