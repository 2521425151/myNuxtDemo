// Base Layer - Nuxt 配置
export default defineNuxtConfig({
  // 组件自动导入
  components: {
    dirs: [
      {
        path: './components',
        pathPrefix: false,
        extensions: ['.vue']
      }
    ]
  }
})
