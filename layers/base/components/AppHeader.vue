<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../composables/useUserStore';

const userStore = useUserStore()
const { isLoggedIn, userName } = storeToRefs(userStore)

const emit = defineEmits<{
  login: []
  logout: []
}>()

function handleLogout() {
  userStore.logout()
  emit('logout')
}
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-left">
        <NuxtLink to="/" class="logo">
          <slot name="logo">
            <span class="logo-text">Logo</span>
          </slot>
        </NuxtLink>
        <nav class="nav-menu">
          <slot name="nav">
            <NuxtLink to="/" class="nav-link">首页</NuxtLink>
          </slot>
        </nav>
      </div>
      
      <div class="header-right">
        <slot name="actions">
          <template v-if="isLoggedIn">
            <span class="user-name">{{ userName }}</span>
            <el-button type="primary" text @click="handleLogout">
              退出登录
            </el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="emit('login')">
              登录
            </el-button>
          </template>
        </slot>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
  height: 60px;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  text-decoration: none;
  color: inherit;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}

.nav-menu {
  display: flex;
  gap: 24px;
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

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-name {
  color: #303133;
  font-size: 14px;
}
</style>
