import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';

const path = require('path');

export default defineConfig({
  assetsInclude: ['**/*.glb'],
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
});
