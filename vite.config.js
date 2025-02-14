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
        target: 'https://survey-api-dhyh.onrender.com', // backend server
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // If you're using HTTPS, set this to true
      },
      // Proxy other API routes if needed
      '/api': {
        target: 'https://survey-api-dhyh.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});