import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    outDir: 'public',
    emptyOutDir: false,
    minify: true,
    rolldownOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) return;
        defaultHandler(warning);
      }
    },
    lib: {
      entry: 'src/agent.index.tsx',
      name: 'agent',
      formats: ['iife'],
      fileName: () => 'agent.global.js'
    }
  }
});
