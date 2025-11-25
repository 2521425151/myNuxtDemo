<template>
  <div class="api-demo">
    <h1>API 拦截器示例</h1>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>使用 useAuthFetch (推荐)</span>
        </div>
      </template>

      <div class="section">
        <el-button @click="fetchWithAuthFetch" type="primary">
          使用 useAuthFetch 请求
        </el-button>
        <div v-if="authFetchData" class="result">
          <pre>{{ authFetchData }}</pre>
        </div>
        <div v-if="authFetchError" class="error">
          错误: {{ authFetchError }}
        </div>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>使用 $api (插件方式)</span>
        </div>
      </template>

      <div class="section">
        <el-button @click="fetchWithApi" type="success">
          使用 $api 请求
        </el-button>
        <div v-if="apiData" class="result">
          <pre>{{ apiData }}</pre>
        </div>
        <div v-if="apiError" class="error">
          错误: {{ apiError }}
        </div>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Token 管理</span>
        </div>
      </template>

      <div class="section">
        <p>当前 Token: {{ userStore.token || '未设置' }}</p>
        <div class="button-group">
          <el-button @click="setToken" type="primary">
            设置 Token
          </el-button>
          <el-button @click="clearToken" type="danger">
            清除 Token
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/stores/user'

const userStore = useUserStore()
const { $api } = useNuxtApp()

// useAuthFetch 示例
const authFetchData = ref<any>(null)
const authFetchError = ref<string | null>(null)

async function fetchWithAuthFetch() {
  authFetchData.value = null
  authFetchError.value = null
  
  try {
    // 使用 useAuthFetch，会自动添加 token
    const { data, error } = await useAuthFetch('/api/user/profile')
    
    if (error.value) {
      authFetchError.value = error.value.message
    } else {
      authFetchData.value = data.value
    }
  } catch (err: any) {
    authFetchError.value = err.message
  }
}

// $api 示例
const apiData = ref<any>(null)
const apiError = ref<string | null>(null)

async function fetchWithApi() {
  apiData.value = null
  apiError.value = null
  
  try {
    // 使用 $api，会自动添加 token
    const data = await $api('/api/user/profile')
    apiData.value = data
  } catch (err: any) {
    apiError.value = err.message
  }
}

// Token 管理
function setToken() {
  userStore.login(
    {
      id: 1,
      name: '测试用户',
      email: 'test@example.com'
    },
    'your-test-token-here'
  )
}

function clearToken() {
  userStore.logout()
}
</script>

<style scoped>
.api-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-card {
  margin-bottom: 20px;
}

.card-header {
  font-weight: bold;
}

.section {
  padding: 10px 0;
}

.button-group {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.result {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.error {
  margin-top: 15px;
  padding: 10px;
  background-color: #fee;
  color: #c00;
  border-radius: 4px;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
