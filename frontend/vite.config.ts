import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add aliases for custom module paths

      '@': path.resolve(__dirname, './src'),
      '@redux': path.resolve(__dirname, './src/redux'),

      '@constants': path.resolve(__dirname, './src/constants'),
      '@routes': path.resolve(__dirname, './src/routes/index'),
      // Add more aliases as needed
    },
  },
});
