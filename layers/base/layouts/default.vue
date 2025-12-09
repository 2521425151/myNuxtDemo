<script setup lang="ts">
import { ref } from 'vue';

const showLoginDialog = ref(false)

function handleLogin() {
  showLoginDialog.value = true
}

function handleLogout() {
  // 可以在这里添加登出后的逻辑，如跳转
}
</script>

<template>
  <div class="app-layout">
    <AppHeader @login="handleLogin" @logout="handleLogout">
      <template #nav>
        <NuxtLink to="/" class="nav-link">首页</NuxtLink>
        <NuxtLink to="/about" class="nav-link">关于</NuxtLink>
      </template>
    </AppHeader>
    
    <main class="app-main">
      <slot />
    </main>
    
    <AppFooter
      copyright="© 2025 Your Company. All rights reserved."
      :links="[
        { label: '隐私政策', url: '/privacy' },
        { label: '服务条款', url: '/terms' }
      ]"
    />
    
    <!-- 登录弹窗插槽 -->
    <slot name="login-dialog" :show="showLoginDialog" :close="() => showLoginDialog = false" />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  padding: 20px;
}

.nav-link {
  text-decoration: none;
  color: #606266;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #409eff;
}
</style>
