/// <reference types="node" />

import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  publicDir: 'static',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@static': path.resolve(__dirname, './static/'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          orillusion: ['@orillusion/core', '@orillusion/stats'],
        },
      },
    },
  },
})
