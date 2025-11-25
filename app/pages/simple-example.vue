<template>
  <div class="simple-example">
    <h1>API 拦截器使用示例</h1>

    <!-- 登录/登出 -->
    <el-card>
      <template #header>
        <span>认证状态</span>
      </template>
      <el-button v-if="!userStore.token" @click="login" type="primary">
        点击登录
      </el-button>
      <el-button v-else @click="logout" type="danger">
        退出登录
      </el-button>
      <p v-if="userStore.token" style="margin-top: 10px;">
        Token: {{ userStore.token.substring(0, 30) }}...
      </p>
    </el-card>

    <!-- 示例 1: 使用 $api（用户操作） -->
    <el-card style="margin-top: 20px;">
      <template #header>
        <span>示例 1: 使用 $api（推荐用于按钮点击、表单提交）</span>
      </template>
      
      <div class="button-group">
        <el-button @click="getUserData" type="primary" :loading="loading1">
          获取数据
        </el-button>
        <el-button @click="testError401" type="warning">
          测试 401 错误
        </el-button>
        <el-button @click="testError500" type="danger">
          测试 500 错误
        </el-button>
      </div>
      
      <div v-if="userData" class="result-box">
        <h3>响应数据：</h3>
        <pre>{{ userData }}</pre>
      </div>
      
      <div v-if="error1" class="error-box">
        <p>❌ 错误: {{ error1 }}</p>
      </div>
    </el-card>

    <!-- 示例 2: 使用 useAuthFetch（页面数据） -->
    <el-card style="margin-top: 20px;">
      <template #header>
        <span>示例 2: 使用 useAuthFetch（推荐用于页面数据加载）</span>
      </template>
      
      <el-button @click="fetchPageData" type="primary" :loading="loading2">
        加载页面数据
      </el-button>
      
      <div v-if="pending" class="loading-box">
        <p>⏳ 加载中...</p>
      </div>
      
      <div v-else-if="pageData" class="result-box">
        <h3>页面数据：</h3>
        <pre>{{ pageData }}</pre>
      </div>
      
      <div v-if="error2" class="error-box">
        <p>❌ 错误: {{ error2 }}</p>
      </div>
    </el-card>

    <!-- 示例 3: 提交表单 -->
    <el-card style="margin-top: 20px;">
      <template #header>
        <span>示例 3: 表单提交（统一错误处理）</span>
      </template>
      
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" type="success" :loading="submitting">
            提交表单
          </el-button>
        </el-form-item>
      </el-form>
      
      <div v-if="submitResult" class="result-box">
        <h3>提交结果：</h3>
        <pre>{{ submitResult }}</pre>
      </div>
    </el-card>

    <!-- 控制台提示 -->
    <el-card style="margin-top: 20px;">
      <template #header>
        <span>💡 提示</span>
      </template>
      <p>打开浏览器控制台查看统一的请求日志和错误处理：</p>
      <ul>
        <li>✅ 成功请求会显示绿色日志</li>
        <li>❌ 失败请求会显示红色日志</li>
        <li>🔒 401 错误会自动退出登录并跳转</li>
        <li>⚠️ 其他错误会显示统一的错误提示</li>
      </ul>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/stores/user'

const userStore = useUserStore()
const { $api } = useNuxtApp()

// 登录
function login() {
  userStore.login(
    { id: 1, name: '测试用户', email: 'test@example.com' },
    'my-secret-token-12345'
  )
  console.log('✅ 登录成功，Token 已设置')
}

// 登出
function logout() {
  userStore.logout()
  userData.value = null
  pageData.value = null
  submitResult.value = null
  error1.value = null
  error2.value = null
  console.log('👋 已退出登录')
}

// ============ 示例 1: 使用 $api ============
const userData = ref<any>(null)
const error1 = ref<string | null>(null)
const loading1 = ref(false)

async function getUserData() {
  loading1.value = true
  error1.value = null
  userData.value = null
  
  try {
    // $api 会自动添加 token 和统一处理错误
    userData.value = await $api('/api/user/profile')
    console.log('✅ 数据获取成功')
  } catch (error: any) {
    error1.value = error.message || '请求失败'
    console.error('❌ 数据获取失败:', error1.value)
  } finally {
    loading1.value = false
  }
}

// 测试 401 错误
async function testError401() {
  loading1.value = true
  error1.value = null
  
  try {
    await $api('/api/unauthorized')
  } catch (error: any) {
    error1.value = error.message || '请求失败'
  } finally {
    loading1.value = false
  }
}

// 测试 500 错误
async function testError500() {
  loading1.value = true
  error1.value = null
  
  try {
    await $api('/api/server-error')
  } catch (error: any) {
    error1.value = error.message || '请求失败'
  } finally {
    loading1.value = false
  }
}

// ============ 示例 2: 使用 useAuthFetch ============
const pageData = ref<any>(null)
const error2 = ref<string | null>(null)
const pending = ref(false)
const loading2 = ref(false)

async function fetchPageData() {
  loading2.value = true
  pending.value = true
  error2.value = null
  
  try {
    // useAuthFetch 返回响应式数据
    const { data, error } = await useAuthFetch('/api/posts')
    
    if (error.value) {
      error2.value = error.value.message || '请求失败'
      console.error('❌ 页面数据加载失败:', error2.value)
    } else {
      pageData.value = data.value
      console.log('✅ 页面数据加载成功')
    }
  } catch (error: any) {
    error2.value = error.message || '请求失败'
  } finally {
    pending.value = false
    loading2.value = false
  }
}

// ============ 示例 3: 表单提交 ============
const formData = ref({
  name: '',
  email: ''
})
const submitResult = ref<any>(null)
const submitting = ref(false)

async function submitForm() {
  if (!formData.value.name || !formData.value.email) {
    alert('请填写完整信息')
    return
  }
  
  submitting.value = true
  
  try {
    // POST 请求，$api 会自动添加 token 和统一处理错误
    submitResult.value = await $api('/api/user/update', {
      method: 'POST',
      body: formData.value
    })
    
    console.log('✅ 表单提交成功')
    alert('提交成功！')
    
    // 清空表单
    formData.value = { name: '', email: '' }
  } catch (error: any) {
    const message = error.message || '请求失败'
    console.error('❌ 表单提交失败:', message)
    alert('提交失败: ' + message)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.simple-example {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.result-box {
  margin-top: 15px;
  padding: 15px;
  background-color: #f0f9ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
}

.error-box {
  margin-top: 15px;
  padding: 15px;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  color: #cf1322;
}

.loading-box {
  margin-top: 15px;
  padding: 15px;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 4px;
  color: #d48806;
}

pre {
  margin: 10px 0 0 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 12px;
}

h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #666;
}

ul {
  margin: 10px 0;
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>
