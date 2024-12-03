import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'mdb-react-ui-kit': 'mdb-react-ui-kit/dist/mdb-react-ui-kit.esm.js'
    }
  }
});