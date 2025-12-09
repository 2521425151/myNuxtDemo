<script setup lang="ts">
interface Props {
  copyright?: string
  links?: Array<{ label: string; url: string }>
}

withDefaults(defineProps<Props>(), {
  copyright: `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  links: () => []
})
</script>

<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <slot>
          <div class="footer-links" v-if="links.length">
            <a
              v-for="link in links"
              :key="link.url"
              :href="link.url"
              class="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </div>
          <p class="copyright">{{ copyright }}</p>
        </slot>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: #f5f7fa;
  border-top: 1px solid #e4e7ed;
  padding: 24px 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.footer-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: #606266;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #409eff;
}

.copyright {
  color: #909399;
  font-size: 12px;
  margin: 0;
}
</style>
