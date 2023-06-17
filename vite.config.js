// vite.config.js
import { defineConfig } from 'vite';
import { glob } from 'glob';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  root: resolve(__dirname, 'src'),

  server: {
    port: 8080,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync(resolve(__dirname, 'src', '**/*.html')),
      output: {
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name][extname]';
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
