/**
 * Configuración de Vite para el front-end de Hello Baby.
 * El servidor de desarrollo usa el puerto 5173.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
});
