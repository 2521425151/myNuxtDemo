// 统一的 API 响应处理

// API 响应格式（根据你的后端调整）
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 统一处理成功响应
export function handleSuccess(response: any) {
  // 如果后端返回的是标准格式 { code, message, data }
  if (response?.code === 0 || response?.code === 200) {
    // 可以在这里显示成功提示
    if (response.message) {
      console.log('✅ 成功:', response.message)
      // 或者使用 Element Plus 的消息提示
      // ElMessage.success(response.message)
    }
    return response.data
  }
  
  // 如果后端直接返回数据
  return response
}

// 统一处理错误响应
export function handleError(error: any) {
  console.error('❌ API 错误:', error)
  
  const response = error?.response
  const status = response?.status
  
  // 根据状态码显示不同的错误信息
  let message = '请求失败，请稍后重试'
  
  if (status === 400) {
    message = response._data?.message || '请求参数错误'
  } else if (status === 401) {
    message = '未授权，请重新登录'
  } else if (status === 403) {
    message = '没有权限访问'
  } else if (status === 404) {
    message = '请求的资源不存在'
  } else if (status === 500) {
    message = '服务器错误'
  } else if (status === 503) {
    message = '服务暂时不可用'
  } else if (error.message) {
    message = error.message
  }
  
  // 显示错误提示（可以使用 Element Plus）
  // ElMessage.error(message)
  console.error('错误信息:', message)
  
  // 抛出错误，让调用方可以捕获
  throw new Error(message)
}

// 提取错误信息
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') return error
  if (error?.response?._data?.message) return error.response._data.message
  if (error?.message) return error.message
  return '未知错误'
}
