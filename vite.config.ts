import { defineConfig } from 'vite'
import { format, resolve } from 'path'
import solid from 'vite-plugin-solid';
import pkg from "./package.json";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: 'terser',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'solid-toast',
      formats: ['cjs', 'es'],
      fileName: (format) => `solid-toast.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies),
        'solid-js',
        "solid-js/web",
        "solid-js/store"
    ],
      output: {
        exports: 'named'
      }
    },
  },
  plugins: [
    solid()
  ]
})