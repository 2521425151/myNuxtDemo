import type { FetchResponse } from 'ofetch'
import { useUserStore } from '~~/stores/user'

/**
 * 统一处理 API 错误响应
 */
export function handleApiError(response: FetchResponse<any>) {
  const userStore = useUserStore()

  // 401 未授权 - 清除登录状态并跳转
  if (response.status === 401) {
    userStore.logout()
    navigateTo('/login')
    return
  }
  
  // 403 无权限
  if (response.status === 403) {
    console.error('无权限访问')
    // ElMessage.error('无权限访问')
  }
  
  // 404 资源不存在
  if (response.status === 404) {
    console.error('请求的资源不存在')
  }
  
  // 500 服务器错误
  if (response.status >= 500) {
    console.error('服务器错误，请稍后重试')
    // ElMessage.error('服务器错误，请稍后重试')
  }
  
  // 可以使用统一的错误处理
  handleError(response)
}
