

export default defineNuxtPlugin(() => {
  // 为 $fetch 添加全局拦截器
  const api = $fetch.create({
    onRequest({ options }) {
      addAuthHeader(options)
    },
    onResponse({ response }) {
      // 统一处理成功响应
      console.log(`✅ [${response.status}] ${response.url}`)
      
      // 如果需要处理响应数据格式，可以在这里转换
      response._data = handleSuccess(response._data)
    },
    onResponseError({ response }) {
      // 统一处理错误响应
      console.error(`❌ [${response.status}] ${response.url}`)
      handleApiError(response)
    }
  })

  return {
    provide: {
      api
    }
  }
})
