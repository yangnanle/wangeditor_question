import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascrptEnabled: true
      }
    }
  },
  base: './',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      }
    ]
  },
  // 打包配置
  build: {
    outDir: './dist',
    target: 'modules',
    assetsDir: 'assets',
    assetsInlineLimit: 360000,
  },
  esbuild: {
    // 删除打包之后的log和debugger
    pure: ['console.log'],
    drop: ['debugger']
  }
})