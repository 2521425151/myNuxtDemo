import { defineNuxtPlugin } from "nuxt/app"
import { useUserStore } from "../composables/useUserStore"

// 自动恢复用户登录状态
export default defineNuxtPlugin(() => {
  const userStore = useUserStore()
  
  // 在客户端恢复 session
  if (import.meta.client) {
    userStore.restoreSession()
  }
})
