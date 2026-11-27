/**
 * Button: botón reutilizable con las variantes visuales del proyecto.
 * Justificación: mantiene uniforme el estilo en formularios, tablas y modales.
 */
function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
