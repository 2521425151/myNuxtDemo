<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <el-header class="header">
      <div class="header-content">
        <div class="logo">
          <el-icon :size="28" color="#409EFF">
            <component :is="'Platform'" />
          </el-icon>
          <span class="logo-text">Nuxt App</span>
        </div>
        <el-button type="primary" link @click="navigateTo('/admin/dashboard')">
          管理后台
        </el-button>
      </div>
    </el-header>

    <!-- 主要内容 -->
    <el-main class="main-content">
      <el-space direction="vertical" :size="40" alignment="center" fill>
        <!-- 标题区域 -->
        <div class="hero-section">
          <h1 class="hero-title">
            欢迎使用
            <span class="gradient-text">Nuxt 4</span>
          </h1>
          <p class="hero-subtitle">
            现代化的全栈框架，助力构建高性能的 Web 应用
          </p>
        </div>

        <!-- 特性卡片 -->
        <el-row :gutter="24" class="features">
          <el-col :xs="24" :sm="8">
            <el-card shadow="hover" class="feature-card">
              <template #header>
                <div class="card-header">
                  <el-icon :size="32" color="#409EFF">
                    <component :is="'Lightning'" />
                  </el-icon>
                </div>
              </template>
              <h3 class="feature-title">极速开发</h3>
              <p class="feature-desc">
                热模块替换，即时反馈，提升开发效率
              </p>
            </el-card>
          </el-col>

          <el-col :xs="24" :sm="8">
            <el-card shadow="hover" class="feature-card">
              <template #header>
                <div class="card-header">
                  <el-icon :size="32" color="#9C27B0">
                    <component :is="'Tools'" />
                  </el-icon>
                </div>
              </template>
              <h3 class="feature-title">灵活扩展</h3>
              <p class="feature-desc">
                丰富的模块生态，满足各种业务需求
              </p>
            </el-card>
          </el-col>

          <el-col :xs="24" :sm="8">
            <el-card shadow="hover" class="feature-card">
              <template #header>
                <div class="card-header">
                  <el-icon :size="32" color="#673AB7">
                    <component :is="'CircleCheck'" />
                  </el-icon>
                </div>
              </template>
              <h3 class="feature-title">生产就绪</h3>
              <p class="feature-desc">
                SEO 优化，性能卓越，安全可靠
              </p>
            </el-card>
          </el-col>
        </el-row>

        <!-- CTA 按钮 -->
        <el-space :size="16">
          <el-button
            type="primary"
            size="large"
            round
            @click="navigateTo('/admin/dashboard')"
          >
            <el-icon class="mr-2">
              <component :is="'Right'" />
            </el-icon>
            进入管理后台
          </el-button>
          <el-button
            size="large"
            round
            @click="openLink('https://nuxt.com')"
          >
            了解更多
          </el-button>
        </el-space>
      </el-space>
    </el-main>

    <!-- 页脚 -->
    <el-footer class="footer">
      <el-text type="info">Powered by Nuxt 4 · Made with ❤️</el-text>
    </el-footer>
  </div>
</template>

<script setup lang="ts">
const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
}

.header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(135deg, #409EFF 0%, #9C27B0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
}

.hero-section {
  text-align: center;
}

.hero-title {
  font-size: 56px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 24px 0;
  animation: fade-in 0.6s ease-out;
}

.gradient-text {
  background: linear-gradient(135deg, #409EFF 0%, #9C27B0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 20px;
  color: #606266;
  margin: 0;
}

.features {
  width: 100%;
  max-width: 1000px;
}

.feature-card {
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
}

.card-header {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px 0;
}

.feature-desc {
  font-size: 14px;
  color: #606266;
  margin: 0;
  line-height: 1.6;
}

.footer {
  text-align: center;
  padding: 24px;
  background: transparent;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .main-content {
    padding: 40px 16px;
  }
}
</style>
