import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://server:5000', // docker composeda tanimlanan server ismi
        changeOrigin: true,
        secure: false,
      },
    },
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0', // dockerdan erisim icin 0.0.0.0 kullanılabilir
    strictPort: true,
    port: 3000,
  },
  preview: {
    host: '0.0.0.0', 
    strictPort: true,
    port: 3000,
  },
});
