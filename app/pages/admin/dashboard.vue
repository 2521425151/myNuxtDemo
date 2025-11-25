<template>
  <div class="dashboard">
    <el-page-header title="后台管理" content="欢迎来到后台管理系统" />
    
    <el-row :gutter="20" style="margin-top: 30px;">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon :size="48" color="#409EFF">
              <User />
            </el-icon>
            <div class="stat-info">
              <div class="stat-label">用户总数</div>
              <div class="stat-value">1,234</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon :size="48" color="#67C23A">
              <Document />
            </el-icon>
            <div class="stat-info">
              <div class="stat-label">文章数量</div>
              <div class="stat-value">567</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon :size="48" color="#E6A23C">
              <ChatDotRound />
            </el-icon>
            <div class="stat-info">
              <div class="stat-label">评论数量</div>
              <div class="stat-value">890</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon :size="48" color="#F56C6C">
              <TrendCharts />
            </el-icon>
            <div class="stat-info">
              <div class="stat-label">访问量</div>
              <div class="stat-value">12,345</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Document, ChatDotRound, TrendCharts } from '@element-plus/icons-vue'

definePageMeta({
  layout: 'admin'
})
</script>

<style scoped>
.stat-card {
  margin-bottom: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}
</style>
