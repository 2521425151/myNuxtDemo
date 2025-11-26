import legacy from '@vitejs/plugin-legacy'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt', '@nuxt/eslint', '@pinia/nuxt', '@vueuse/nuxt'],
  components: {
    dirs: [
      {
        path: '~~/components',
        pathPrefix: false,
        extensions: ['.vue']
      }
    ]
  },
  
  // 现代浏览器兼容性配置（方案1）
  // 支持范围：Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+
  // 不支持：IE 11（已于2022年停止支持）
  vite: {
    plugins: [
      legacy({
        // 目标浏览器：支持 ES Modules 的现代浏览器
        targets: [
          'chrome >= 61',
          'firefox >= 60', 
          'safari >= 10.1',
          'edge >= 16',
          'ios >= 10.3',
          'android >= 61'
        ],
        modernPolyfills: true,
        renderLegacyChunks: true,
        // 自动注入必要的 polyfills
        polyfills: [
          'es.promise',
          'es.promise.finally',
          'es.array.iterator',
          'es.object.assign',
          'es.object.keys',
          'es.array.from',
          'es.array.includes',
          'es.string.includes'
        ]
      })
    ],
    build: {
      target: 'es2015', // ES6/ES2015 语法
      cssTarget: 'chrome61',
      modulePreload: {
        polyfill: true
      }
    }
  },
  
  nitro: {
    esbuild: {
      options: {
        target: 'es2015'
      }
    }
  }
})
