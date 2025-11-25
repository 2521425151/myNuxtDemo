# API 拦截器使用指南

## 快速开始

本项目为 Nuxt 3 实现了统一的 API 拦截器，自动处理 token 添加、响应处理和错误处理。

## 使用方式

### 方式 1: useAuthFetch（推荐用于页面数据）

适合页面初始数据加载、SSR/SSG 场景，返回响应式数据。

```typescript
// 基本使用
const { data, error, pending } = await useAuthFetch('/api/user/profile')

// 在模板中使用
<div v-if="pending">加载中...</div>
<div v-else-if="error">错误: {{ error }}</div>
<div v-else>{{ data }}</div>

// POST 请求
const { data } = await useAuthFetch('/api/posts', {
  method: 'POST',
  body: { title: '标题', content: '内容' }
})
```

### 方式 2: $api（推荐用于用户操作）

适合按钮点击、表单提交等用户交互操作。

```typescript
const { $api } = useNuxtApp()

// GET 请求
try {
  const data = await $api('/api/user/profile')
  console.log('成功:', data)
} catch (error) {
  console.error('失败:', error.message)
}

// POST 请求
const result = await $api('/api/posts', {
  method: 'POST',
  body: { title: '标题' }
})

// DELETE 请求
await $api('/api/posts/123', { method: 'DELETE' })
```

## Token 管理

### 登录并设置 Token

```typescript
import { useUserStore } from '~~/stores/user'

const userStore = useUserStore()

userStore.login(
  {
    id: 1,
    name: '用户名',
    email: 'user@example.com'
  },
  'your-jwt-token-here'  // 从后端获取的 token
)
```

### 退出登录

```typescript
userStore.logout()  // 会清除 token 和用户信息
```

## 统一的错误处理

所有请求都会自动处理以下错误：

| 状态码 | 处理方式 |
|--------|----------|
| 401 | 自动清除登录状态并跳转到 `/login` |
| 403 | 显示"无权限访问"错误 |
| 404 | 显示"请求的资源不存在" |
| 500+ | 显示"服务器错误，请稍后重试" |

### 使用错误处理工具

```typescript
import { getErrorMessage } from '~~/utils/apiHandler'

try {
  const data = await $api('/api/endpoint')
} catch (error) {
  const message = getErrorMessage(error)
  alert(message)  // 显示友好的错误信息
}
```

## 统一的响应处理

### 查看请求日志

所有请求都会在控制台输出日志：

```
✅ [200] /api/user/profile  // 成功请求
❌ [401] /api/protected      // 失败请求
```

### 自定义响应处理

如果你的后端返回标准格式（如 `{ code, message, data }`），可以在 `utils/apiHandler.ts` 中自定义处理：

```typescript
// utils/apiHandler.ts
export function handleSuccess(response: any) {
  if (response?.code === 0) {
    // 显示成功提示
    ElMessage.success(response.message)
    return response.data
  }
  return response
}
```

## 特性

- ✅ 自动添加 `Authorization: Bearer <token>` header
- ✅ Token 同时存储在 Pinia store 和 cookie 中
- ✅ 统一的错误处理（401/403/404/500）
- ✅ 统一的请求日志
- ✅ SSG 模式下自动从 cookie 恢复 token
- ✅ 支持 TypeScript 类型推断

## 文件结构

```
app/
├── plugins/
│   └── api.ts              # $api 插件（统一错误处理）
├── composables/
│   └── useAuthFetch.ts     # useAuthFetch（统一错误处理）
├── utils/
│   └── apiHandler.ts       # 响应和错误处理工具
└── stores/
    └── user.ts             # 用户 store（token 管理）
```

## 示例页面

访问 `/simple-example` 查看完整的使用示例，包括：
- 使用 $api 发起请求
- 使用 useAuthFetch 加载页面数据
- 表单提交
- 错误处理演示（401、500 等）

## 集成 Element Plus 消息提示

如果你使用 Element Plus，可以取消注释代码中的 `ElMessage` 调用：

```typescript
// app/plugins/api.ts 和 app/composables/useAuthFetch.ts
if (response.status === 403) {
  ElMessage.error('无权限访问')  // 取消注释
}
```
