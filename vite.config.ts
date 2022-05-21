import { defineConfig } from 'vite'
import { format, resolve } from 'path'
import solid from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'solid-toast',
      formats: ['cjs', 'es'],
      fileName: (format) => `solid-toast.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js']
    }
  },
  plugins: [
    solid()
  ]
})