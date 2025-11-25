import type { UseFetchOptions } from 'nuxt/app'

export function useAuthFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  // 合并默认配置
  const defaults: UseFetchOptions<T> = {
    onRequest({ options }) {
      addAuthHeader(options)
    },
    onResponse({ response }) {
      // 统一处理成功响应
      console.log(`✅ [${response.status}] ${url}`)
      // 如果需要处理响应数据格式，可以在这里转换
      response._data = handleSuccess(response._data)
    },
    onResponseError({ response }) {
      // 统一处理错误响应
      console.error(`❌ [${response.status}] ${url}`)
      handleApiError(response)
    }
  }

  // 合并用户传入的配置
  const params = Object.assign(defaults, options)

  return useFetch(url, params)
}
