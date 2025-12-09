import { useRouter } from 'vue-router'
import { useUserStore, type LoginPayload, type UserInfo } from '../stores/user'
import { storeToRefs } from 'pinia'

export interface LoginCredentials {
  username: string
  password: string
  remember?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export function useAuth() {
  const userStore = useUserStore()
  const router = useRouter()
  
  const { isLoggedIn, user, token, loading } = storeToRefs(userStore)

  // 登录
  async function login(credentials: LoginCredentials): Promise<boolean> {
    userStore.setLoading(true)
    try {
      // 这里替换为实际的 API 调用
      // const response = await $fetch('/api/auth/login', {
      //   method: 'POST',
      //   body: credentials
      // })
      
      // 模拟登录响应
      const mockResponse: LoginPayload = {
        user: {
          id: 1,
          name: credentials.username,
          email: `${credentials.username}@example.com`,
          roles: ['user']
        },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: credentials.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7
      }
      
      userStore.login(mockResponse)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      userStore.setLoading(false)
    }
  }

  // 登出
  async function logout(redirectTo?: string) {
    userStore.setLoading(true)
    try {
      // 可选：调用后端登出 API
      // await $fetch('/api/auth/logout', { method: 'POST' })
      
      userStore.logout()
      
      if (redirectTo) {
        await router.push(redirectTo)
      }
    } finally {
      userStore.setLoading(false)
    }
  }

  // 注册
  async function register(data: RegisterData): Promise<boolean> {
    userStore.setLoading(true)
    try {
      // 这里替换为实际的 API 调用
      // const response = await $fetch('/api/auth/register', {
      //   method: 'POST',
      //   body: data
      // })
      
      console.log('Register:', data)
      return true
    } catch (error) {
      console.error('Register failed:', error)
      return false
    } finally {
      userStore.setLoading(false)
    }
  }

  // 获取当前用户信息
  async function fetchUser(): Promise<UserInfo | null> {
    if (!token.value) return null
    
    userStore.setLoading(true)
    try {
      // 这里替换为实际的 API 调用
      // const response = await $fetch('/api/auth/me', {
      //   headers: { Authorization: `Bearer ${token.value}` }
      // })
      
      return user.value
    } catch (error) {
      console.error('Fetch user failed:', error)
      userStore.logout()
      return null
    } finally {
      userStore.setLoading(false)
    }
  }

  // 刷新 token
  async function refreshToken(): Promise<boolean> {
    const refreshTokenValue = userStore.refreshToken
    if (!refreshTokenValue) return false
    
    try {
      // 这里替换为实际的 API 调用
      // const response = await $fetch('/api/auth/refresh', {
      //   method: 'POST',
      //   body: { refreshToken: refreshTokenValue }
      // })
      
      return true
    } catch (error) {
      console.error('Refresh token failed:', error)
      userStore.logout()
      return false
    }
  }

  return {
    // State
    isLoggedIn,
    user,
    token,
    loading,
    // Methods
    login,
    logout,
    register,
    fetchUser,
    refreshToken
  }
}
