import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        'doja/index': path.resolve(__dirname, 'packages/doja/src/index.tsx'),
        'doja/common': path.resolve(__dirname, 'packages/doja/src/common.tsx'),
        'react/index': path.resolve(__dirname, 'packages/react/src/index.js'),
        'react/auto': path.resolve(__dirname, 'packages/react/src/auto.js'),
        'vue/index': path.resolve(__dirname, 'packages/vue/src/index.tsx'),
        'vue/auto': path.resolve(__dirname, 'packages/vue/src/auto.tsx'),
      },
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: [
        'react', 
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'vue', 
        'vue/jsx-runtime',
        'doja',
        'doja/common',
        'doja/jsx-runtime',
        'xoid', 
        'xoid/setup', 
        '@xoid/reactive',
        '@xoid/react',
        '@xoid/vue',
      ],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue',
          react: 'React',
          xoid: 'Xoid',
          'xoid/setup': 'XoidSetup',
          '@xoid/reactive': 'XoidReactive',
        },
      },
    },
  }
})
