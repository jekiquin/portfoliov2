import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';

const path = require('path');

export default defineConfig({
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  resolve: {
    alias: {
      '@/*': path.resolve(__dirname, './*'),
    },
  },
});
