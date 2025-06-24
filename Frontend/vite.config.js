import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  appType: 'spa', // 🟢 This enables React Router on direct links
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    fs: {
      allow: ['..'],
    },
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '/', // good to keep
});
