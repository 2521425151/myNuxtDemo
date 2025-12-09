import { useCookie } from 'nuxt/app'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserInfo {
  id: number | string
  name: string
  email: string
  avatar?: string
  roles?: string[]
}

export interface LoginPayload {
  user: UserInfo
  token: string
  refreshToken?: string
  expiresIn?: number
}

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<UserInfo | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isLoggedIn = ref(false)
  const loading = ref(false)

  // Getters
  const userName = computed(() => user.value?.name || '游客')
  const userEmail = computed(() => user.value?.email || '')
  const userAvatar = computed(() => user.value?.avatar || '')
  const userRoles = computed(() => user.value?.roles || [])
  const isAdmin = computed(() => userRoles.value.includes('admin'))

  // Actions
  function login(payload: LoginPayload) {
    user.value = payload.user
    token.value = payload.token
    isLoggedIn.value = true
    
    if (payload.refreshToken) {
      refreshToken.value = payload.refreshToken
    }

    // 保存 token 到 cookie
    const tokenCookie = useCookie('auth_token', {
      maxAge: payload.expiresIn || 60 * 60 * 24 * 7, // 默认 7 天
      secure: true,
      sameSite: 'lax'
    })
    tokenCookie.value = payload.token

    // 保存 refresh token
    if (payload.refreshToken) {
      const refreshCookie = useCookie('refresh_token', {
        maxAge: 60 * 60 * 24 * 30, // 30 天
        secure: true,
        sameSite: 'lax'
      })
      refreshCookie.value = payload.refreshToken
    }
  }

  function logout() {
    user.value = null
    token.value = null
    refreshToken.value = null
    isLoggedIn.value = false

    // 清除 cookies
    const tokenCookie = useCookie('auth_token')
    const refreshCookie = useCookie('refresh_token')
    tokenCookie.value = null
    refreshCookie.value = null
  }

  function updateUser(userData: Partial<UserInfo>) {
    if (user.value) {
      user.value = { ...user.value, ...userData }
    }
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  // 从 cookie 恢复登录状态
  function restoreSession() {
    const tokenCookie = useCookie('auth_token')
    if (tokenCookie.value) {
      token.value = tokenCookie.value
      isLoggedIn.value = true
    }
    
    const refreshCookie = useCookie('refresh_token')
    if (refreshCookie.value) {
      refreshToken.value = refreshCookie.value
    }
  }

  // 检查是否有特定角色
  function hasRole(role: string): boolean {
    return userRoles.value.includes(role)
  }

  // 检查是否有任一角色
  function hasAnyRole(roles: string[]): boolean {
    return roles.some(role => userRoles.value.includes(role))
  }

  return {
    // State
    user,
    token,
    refreshToken,
    isLoggedIn,
    loading,
    // Getters
    userName,
    userEmail,
    userAvatar,
    userRoles,
    isAdmin,
    // Actions
    login,
    logout,
    updateUser,
    setLoading,
    restoreSession,
    hasRole,
    hasAnyRole
  }
})
