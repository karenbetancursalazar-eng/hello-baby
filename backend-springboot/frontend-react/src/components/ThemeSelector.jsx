/**
 * ThemeSelector: permite alternar entre Peluquería y Barbería.
 * Justificación: es una característica diferencial de Hello Baby y debe
 * estar disponible desde la barra superior sin duplicar la aplicación.
 */
import { useTheme } from '../context/ThemeContext.jsx';

function ThemeSelector() {
  const { tema, cambiarTema } = useTheme();

  return (
    <div className="theme-selector" role="group" aria-label="Cambiar ambiente visual">
      <button
        type="button"
        className={tema === 'peluqueria' ? 'activo' : ''}
        aria-pressed={tema === 'peluqueria'}
        onClick={() => cambiarTema('peluqueria')}
      >
        Peluquería
      </button>
      <button
        type="button"
        className={tema === 'barberia' ? 'activo' : ''}
        aria-pressed={tema === 'barberia'}
        onClick={() => cambiarTema('barberia')}
      >
        Barbería
      </button>
    </div>
  );
}

export default ThemeSelector;
