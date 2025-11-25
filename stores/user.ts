import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  // 使用 Composition API 风格
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoggedIn = ref(false)

  // Getters
  const userName = computed(() => user.value?.name || 'Guest')
  const userEmail = computed(() => user.value?.email || '')

  // Actions
  function login(userData: User, authToken?: string) {
    user.value = userData
    isLoggedIn.value = true
    if (authToken) {
      token.value = authToken
      // 将 token 保存到 cookie 中（SSG 模式下很重要）
      const tokenCookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7 // 7 天
      })
      tokenCookie.value = authToken
    }
  }

  function logout() {
    user.value = null
    token.value = null
    isLoggedIn.value = false
    // 清除 cookie
    const tokenCookie = useCookie('auth_token')
    tokenCookie.value = null
  }

  function updateUser(userData: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...userData }
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    userName,
    userEmail,
    login,
    logout,
    updateUser
  }
})
