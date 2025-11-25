<template>
  <div class="content-page">
    <el-page-header title="后台管理" content="内容管理" />
    
    <el-card :style="{ marginTop: '20px' }">
      <template #header>
        <div class="card-header">
          <span>文章列表</span>
          <el-button type="primary" :icon="Plus">新建文章</el-button>
        </div>
      </template>
      
      <el-table :data="articles" stripe :style="{ width: '100%' }">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'published' ? 'success' : 'info'">
              {{ row.status === 'published' ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" size="small" :icon="Edit">编辑</el-button>
            <el-button type="danger" size="small" :icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="10"
        :total="50"
        layout="total, prev, pager, next"
        :style="{ marginTop: '20px', justifyContent: 'center' }"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete, Plus } from '@element-plus/icons-vue'

definePageMeta({
  layout: 'admin'
})

const currentPage = ref(1)

const articles = ref([
  { id: 1, title: 'Vue 3 最佳实践', author: '张三', category: '技术', status: 'published', date: '2024-01-15' },
  { id: 2, title: 'Nuxt 3 入门指南', author: '李四', category: '教程', status: 'published', date: '2024-01-14' },
  { id: 3, title: 'Element Plus 使用技巧', author: '王五', category: '技术', status: 'draft', date: '2024-01-13' },
])
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
