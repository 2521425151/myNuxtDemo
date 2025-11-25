import { useUserStore } from '~~/stores/user'

/**
 * 为请求添加 Authorization header
 */
export function addAuthHeader(options: any) {
  const userStore = useUserStore()
  
  // 从 store 或 cookie 中获取 token
  const token = userStore.token || useCookie('auth_token').value

  if (token) {
    // 添加 Authorization header
    const headers = new Headers(options.headers)
    headers.set('Authorization', `Bearer ${token}`)
    options.headers = headers
  }
}
