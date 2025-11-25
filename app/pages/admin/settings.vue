<template>
  <div class="settings-page">
    <el-page-header title="后台管理" content="系统设置" />
    
    <el-card style="margin-top: 20px;">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本设置" name="basic">
          <el-form :model="basicForm" label-width="120px" style="max-width: 600px;">
            <el-form-item label="网站名称">
              <el-input v-model="basicForm.siteName" />
            </el-form-item>
            <el-form-item label="网站描述">
              <el-input v-model="basicForm.siteDesc" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="联系邮箱">
              <el-input v-model="basicForm.email" />
            </el-form-item>
            <el-form-item label="开启维护模式">
              <el-switch v-model="basicForm.maintenance" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存设置</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="安全设置" name="security">
          <el-form :model="securityForm" label-width="120px" style="max-width: 600px;">
            <el-form-item label="启用验证码">
              <el-switch v-model="securityForm.captcha" />
            </el-form-item>
            <el-form-item label="登录失败次数">
              <el-input-number v-model="securityForm.maxLoginAttempts" :min="3" :max="10" />
            </el-form-item>
            <el-form-item label="会话超时(分钟)">
              <el-input-number v-model="securityForm.sessionTimeout" :min="5" :max="120" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="通知设置" name="notification">
          <el-form :model="notificationForm" label-width="120px" style="max-width: 600px;">
            <el-form-item label="邮件通知">
              <el-switch v-model="notificationForm.email" />
            </el-form-item>
            <el-form-item label="短信通知">
              <el-switch v-model="notificationForm.sms" />
            </el-form-item>
            <el-form-item label="系统通知">
              <el-switch v-model="notificationForm.system" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'admin'
})

const activeTab = ref('basic')

const basicForm = ref({
  siteName: '我的网站',
  siteDesc: '这是一个基于 Nuxt 3 和 Element Plus 的管理系统',
  email: 'admin@example.com',
  maintenance: false
})

const securityForm = ref({
  captcha: true,
  maxLoginAttempts: 5,
  sessionTimeout: 30
})

const notificationForm = ref({
  email: true,
  sms: false,
  system: true
})

const handleSave = () => {
  ElMessage.success('设置已保存')
}

const handleReset = () => {
  ElMessage.info('设置已重置')
}
</script>

<style scoped>
/* 样式由 Element Plus 组件提供 */
</style>
