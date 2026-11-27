/**
 * Configuración de Vite para el front-end de Hello Baby.
 * En producción se usa la ruta base de GitHub Pages (/hello-baby/);
 * en desarrollo se mantiene la raíz para trabajar en localhost:5173.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/hello-baby/' : '/',
  server: {
    port: 5173,
    open: false,
  },
}));
