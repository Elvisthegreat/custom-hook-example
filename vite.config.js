import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,  // This is for local dev only
    open: true,
  },
  base: '/',  // This is the key setting for production deployment
});
