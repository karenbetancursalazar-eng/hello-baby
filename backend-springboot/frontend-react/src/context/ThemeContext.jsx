/**
 * ThemeContext: estado compartido del ambiente visual (Peluquería / Barbería).
 * aplica el valor como atributo data-theme en el elemento <html>.
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const CLAVE_ALMACENAMIENTO = 'hello-baby-tema';

const TEMAS_VALIDOS = ['peluqueria', 'barberia'];

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => {
    // Recupera la preferencia guardada o usa Peluquería por defecto.
    const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    return TEMAS_VALIDOS.includes(guardado) ? guardado : 'peluqueria';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem(CLAVE_ALMACENAMIENTO, tema);
  }, [tema]);

  const valor = useMemo(
    () => ({
      tema,
      cambiarTema: setTema,
      esPeluqueria: tema === 'peluqueria',
      esBarberia: tema === 'barberia',
    }),
    [tema],
  );

  return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>;
}

/**
 * Hook de acceso al tema. Centraliza el consumo del contexto.
 */
export function useTheme() {
  const contexto = useContext(ThemeContext);
  if (!contexto) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return contexto;
}
