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
    // 注意：在 SSG 模式下暂时禁用 legacy 插件，避免模块加载顺序问题
    // plugins: [
    //   legacy({
    //     targets: ['chrome >= 61', 'firefox >= 60', 'safari >= 10.1', 'edge >= 16'],
    //     modernPolyfills: true,
    //     renderLegacyChunks: true,
    //   })
    // ],
    
    // Vite 构建选项
    build: {
      // 编译目标：ES2015 (ES6) 语法
      target: 'es2015',
      // CSS 编译目标：Chrome 61+
      cssTarget: 'chrome61'
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
    },
    // 预渲染配置（SSG 静态站点生成）
    prerender: {
      // 预渲染所有路由
      routes: [
        '/',
        '/admin',
        '/admin/dashboard',
        '/admin/users',
        '/admin/content',
        '/admin/settings',
        '/api-demo'
      ],
      // 自动爬取链接
      crawlLinks: true
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
