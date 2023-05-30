import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({
      ignore: /^_/, // 正则匹配忽略的文件
      mockPath: 'mock', // 设置mock.ts 文件的存储文件夹
      enable: true,
      watchFiles: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置访问地址
  server: {
    host: '127.0.0.1',
    port: 5555
  }
})
