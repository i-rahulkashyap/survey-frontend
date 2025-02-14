import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // Run the React app on port 4000
    proxy: {
      // Proxy all requests starting with /auth to http://localhost:3000
      '/auth': {
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // If you're using HTTPS, set this to true
      },
      // Proxy other API routes if needed
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});