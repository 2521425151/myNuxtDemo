# Nuxt 3 API 拦截器 - 统一请求处理方案

## 📋 概述

本项目实现了完整的 API 请求拦截器，提供统一的 token 管理、错误处理和响应处理。

## 🎯 核心功能

- ✅ 自动添加 `Authorization: Bearer <token>` header
- ✅ Token 同时存储在 Pinia store 和 cookie 中（SSG 友好）
- ✅ 统一的错误处理（401/403/404/500）
- ✅ 统一的请求日志（成功/失败）
- ✅ 自动处理 401 错误并跳转登录页
- ✅ 支持 TypeScript 类型推断

## 📁 文件结构

```
app/
├── plugins/
│   └── api.ts                  # $api 插件（用于用户操作）
├── composables/
│   └── useAuthFetch.ts         # useAuthFetch（用于页面数据）
├── utils/
│   └── apiHandler.ts           # 响应和错误处理工具
├── stores/
│   └── user.ts                 # 用户 store（token 管理）
└── pages/
    ├── simple-example.vue      # 完整使用示例
    └── api-demo.vue            # API 演示页面
```

## 🚀 快速开始

### 1. 登录并设置 Token

```typescript
import { useUserStore } from '~~/stores/user'

const userStore = useUserStore()

// 登录成功后设置 token
userStore.login(
  {
    id: 1,
    name: '用户名',
    email: 'user@example.com'
  },
  'your-jwt-token-from-backend'
)
```

### 2. 使用 useAuthFetch（页面数据加载）

推荐用于：页面初始数据、需要 loading 状态、SSR/SSG 场景

```vue
<script setup>
// 自动加载数据，返回响应式对象
const { data, error, pending } = await useAuthFetch('/api/posts')
</script>

<template>
  <div v-if="pending">加载中...</div>
  <div v-else-if="error">错误: {{ error }}</div>
  <div v-else>
    <div v-for="post in data" :key="post.id">
      {{ post.title }}
    </div>
  </div>
</template>
```

### 3. 使用 $api（用户操作）

推荐用于：按钮点击、表单提交、不需要响应式状态

```vue
<script setup>
const { $api } = useNuxtApp()

// 提交表单
async function handleSubmit() {
  try {
    const result = await $api('/api/posts', {
      method: 'POST',
      body: { title: '标题', content: '内容' }
    })
    alert('提交成功')
  } catch (error) {
    alert('提交失败: ' + error.message)
  }
}

// 删除数据
async function handleDelete(id) {
  try {
    await $api(`/api/posts/${id}`, { method: 'DELETE' })
    alert('删除成功')
  } catch (error) {
    alert('删除失败: ' + error.message)
  }
}
</script>

<template>
  <button @click="handleSubmit">提交</button>
  <button @click="handleDelete(123)">删除</button>
</template>
```

## 🔧 统一错误处理

所有请求都会自动处理以下错误：

| 状态码 | 处理方式 |
|--------|----------|
| 401 | 自动清除登录状态并跳转到 `/login` |
| 403 | 控制台显示"无权限访问" |
| 404 | 控制台显示"请求的资源不存在" |
| 500+ | 控制台显示"服务器错误，请稍后重试" |

### 查看请求日志

打开浏览器控制台，所有请求都会输出日志：

```
✅ [200] /api/user/profile     // 成功请求
❌ [401] /api/protected         // 失败请求
```

## 📝 使用场景对比

### useAuthFetch vs $api

| 特性 | useAuthFetch | $api |
|------|--------------|------|
| 返回值 | `{ data, error, pending }` | `Promise<T>` |
| 响应式 | ✅ 是 | ❌ 否 |
| 适用场景 | 页面数据加载 | 用户操作 |
| SSR/SSG | ✅ 友好 | ⚠️ 需手动处理 |
| 代码简洁度 | 中等 | 简洁 |

### 使用建议

```typescript
// ✅ 页面数据 - 用 useAuthFetch
const { data, pending } = await useAuthFetch('/api/posts')

// ✅ 用户操作 - 用 $api
async function handleClick() {
  await $api('/api/action')
}
```

## 🎨 集成 Element Plus 消息提示

如果你使用 Element Plus，可以取消注释代码中的 `ElMessage` 调用：

```typescript
// app/plugins/api.ts
if (response.status === 403) {
  ElMessage.error('无权限访问')  // 取消注释
}

if (response.status >= 500) {
  ElMessage.error('服务器错误，请稍后重试')  // 取消注释
}
```

## 🔍 示例页面

访问以下页面查看完整示例：

- `/simple-example` - 完整的使用示例，包括：
  - 使用 $api 发起请求
  - 使用 useAuthFetch 加载页面数据
  - 表单提交
  - 错误处理演示（401、500 等）

- `/api-demo` - API 演示页面

## 📚 详细文档

查看 `app/docs/API_USAGE.md` 了解更多详细信息。

## 🛠️ 自定义配置

### 修改响应处理

编辑 `app/utils/apiHandler.ts`：

```typescript
export function handleSuccess(response: any) {
  // 如果后端返回标准格式 { code, message, data }
  if (response?.code === 0) {
    ElMessage.success(response.message)
    return response.data
  }
  return response
}
```

### 修改错误处理

编辑 `app/plugins/api.ts` 或 `app/composables/useAuthFetch.ts`：

```typescript
onResponseError({ response }) {
  if (response.status === 403) {
    // 自定义 403 错误处理
    ElMessage.error('您没有权限执行此操作')
  }
}
```

## 💡 最佳实践

1. **页面数据加载**：使用 `useAuthFetch`，可以获得响应式状态
2. **用户操作**：使用 `$api`，代码更简洁
3. **错误处理**：使用 try-catch 捕获错误，显示友好提示
4. **Token 管理**：登录成功后立即调用 `userStore.login()`
5. **退出登录**：调用 `userStore.logout()` 会自动清除 token 和 cookie

## 🔐 SSG 模式注意事项

- Token 同时存储在 Pinia store（内存）和 cookie（持久化）中
- 静态页面加载后会自动从 cookie 恢复 token
- 页面刷新后 token 不会丢失

## 📞 支持

如有问题，请查看示例页面或文档。
