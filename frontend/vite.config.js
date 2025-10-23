import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
      input: 'frontend/src/main.jsx',
      refresh: true,
    }),
    react(),
  ],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'build',
  },
});
