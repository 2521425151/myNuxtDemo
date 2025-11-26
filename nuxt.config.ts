import legacy from '@vitejs/plugin-legacy'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 兼容性日期：确保使用特定日期的 Nuxt 行为和 API
  compatibilityDate: '2025-07-15',
  
  // 开发工具：启用 Nuxt DevTools 用于调试和性能分析
  devtools: { enabled: true },
  
  // Nuxt 模块：集成第三方功能
  // @element-plus/nuxt - Element Plus UI 组件库
  // @nuxt/eslint - ESLint 代码检查
  // @pinia/nuxt - Pinia 状态管理
  // @vueuse/nuxt - VueUse 组合式工具集
  modules: ['@element-plus/nuxt', '@nuxt/eslint', '@pinia/nuxt', '@vueuse/nuxt'],
  
  // 组件自动导入配置
  components: {
    dirs: [
      {
        path: '~~/components',        // 组件目录路径
        pathPrefix: false,             // 不使用路径作为组件名前缀
        extensions: ['.vue']           // 只扫描 .vue 文件
      }
    ]
  },
  
  // ==================== Vite 构建配置 ====================
  // 现代浏览器兼容性配置
  // 支持范围：Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+
  // 不支持：IE 11（已于2022年停止支持）
  vite: {
    // Vite 插件配置
    plugins: [
      legacy({
        // 目标浏览器：支持 ES Modules 的现代浏览器
        targets: [
          'chrome >= 61',      // Chrome 61+ (2017年9月)
          'firefox >= 60',     // Firefox 60+ (2018年5月)
          'safari >= 10.1',    // Safari 10.1+ (2017年3月)
          'edge >= 16',        // Edge 16+ (2017年10月)
          'ios >= 10.3',       // iOS Safari 10.3+ (2017年3月)
          'android >= 61'      // Android Chrome 61+ (2017年9月)
        ],
        // 为现代浏览器注入必要的 polyfills
        modernPolyfills: true,
        // 生成传统浏览器的降级代码块
        renderLegacyChunks: true,
        // 自动注入必要的 ES6+ polyfills
        polyfills: [
          'es.promise',              // Promise 支持
          'es.promise.finally',      // Promise.finally 方法
          'es.array.iterator',       // 数组迭代器
          'es.object.assign',        // Object.assign 方法
          'es.object.keys',          // Object.keys 方法
          'es.array.from',           // Array.from 方法
          'es.array.includes',       // Array.includes 方法
          'es.string.includes'       // String.includes 方法
        ]
      })
    ],
    
    // Vite 构建选项
    build: {
      // 编译目标：ES2015 (ES6) 语法
      target: 'es2015',
      // CSS 编译目标：Chrome 61+
      cssTarget: 'chrome61',
      // 模块预加载配置
      modulePreload: {
        polyfill: true             // 启用模块预加载 polyfill
      },
      
      // Rollup 打包配置
      rollupOptions: {
        output: {
          // ========== SSG 单文件打包配置 ==========
          // 禁用代码分割，不自动创建多个 chunk
          manualChunks: undefined,
          // 将所有动态导入内联到主文件中，生成单个 JS 文件
          inlineDynamicImports: true,
          // 入口文件命名规则：_nuxt/[name].js
          entryFileNames: '_nuxt/[name].js',
          // chunk 文件命名规则：_nuxt/[name].js
          chunkFileNames: '_nuxt/[name].js',
          // 静态资源命名规则：_nuxt/[name].[ext]
          assetFileNames: '_nuxt/[name].[ext]'
        }
      }
    }
  },
  
  // ==================== Nitro 服务器配置 ====================
  nitro: {
    // ESBuild 编译配置
    esbuild: {
      options: {
        // 服务器端代码编译目标：ES2015
        target: 'es2015'
      }
    }
  },

  // ==================== SSG 静态站点生成配置 ====================
  // 启用服务端渲染 (SSR) 进行预渲染
  // 生成的 HTML 包含完整内容，对 SEO 和首屏加载更友好
  ssr: true,
  
  // 实验性功能配置
  experimental: {
    // 禁用 payload 提取
    // payload 是 SSR 时服务器传递给客户端的数据
    // SSG 模式下禁用可减少文件数量，所有数据打包在 JS 中
    payloadExtraction: false
  }
})
