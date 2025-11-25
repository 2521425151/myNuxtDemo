<template>
  <div class="pinia-demo">
    <h1>Pinia Store 示例</h1>

    <!-- Counter Store 示例 -->
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Counter Store (Options API 风格)</span>
        </div>
      </template>

      <div class="counter-section">
        <p>当前计数: <strong>{{ counterStore.count }}</strong></p>
        <p>双倍计数: <strong>{{ counterStore.doubleCount }}</strong></p>
        <p>计数 + 1: <strong>{{ counterStore.countPlusOne }}</strong></p>

        <div class="button-group">
          <el-button @click="counterStore.increment()">
            增加
          </el-button>
          <el-button @click="counterStore.decrement()">
            减少
          </el-button>
          <el-button @click="counterStore.incrementBy(5)">
            增加 5
          </el-button>
          <el-button @click="counterStore.reset()" type="danger">
            重置
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- User Store 示例 -->
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>User Store (Composition API 风格)</span>
        </div>
      </template>

      <div class="user-section">
        <div v-if="userStore.isLoggedIn">
          <p>欢迎, <strong>{{ userStore.userName }}</strong>!</p>
          <p>邮箱: {{ userStore.userEmail }}</p>
          <el-button @click="handleLogout" type="warning">
            退出登录
          </el-button>
        </div>

        <div v-else>
          <p>未登录</p>
          <el-button @click="handleLogin" type="primary">
            登录
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- Store 状态持久化示例 -->
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Store 信息</span>
        </div>
      </template>

      <div class="info-section">
        <p>Counter Store ID: {{ counterStore.$id }}</p>
        <p>User Store ID: {{ userStore.$id }}</p>
        <el-button @click="logStoreState">
          在控制台打印 Store 状态
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~~/stores/counter'
import { useUserStore } from '~~/stores/user'

const counterStore = useCounterStore()
const userStore = useUserStore()

function handleLogin() {
  userStore.login({
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com'
  })
}

function handleLogout() {
  userStore.logout()
}

function logStoreState() {
  console.log('Counter Store State:', counterStore.$state)
  console.log('User Store State:', {
    user: userStore.user,
    isLoggedIn: userStore.isLoggedIn
  })
}
</script>

<style scoped>
.pinia-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.counter-section,
.user-section,
.info-section {
  padding: 10px 0;
}

.button-group {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

p {
  margin: 10px 0;
}

strong {
  color: #409eff;
}
</style>
