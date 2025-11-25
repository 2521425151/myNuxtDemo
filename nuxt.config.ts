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
  }
})
