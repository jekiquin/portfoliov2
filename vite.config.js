import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  assetsInclude: ['**/*.glb'],
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
});
