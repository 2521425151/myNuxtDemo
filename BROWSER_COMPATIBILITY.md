# 浏览器兼容性说明

## 支持的浏览器

本项目采用**现代浏览器兼容策略（方案1）**，支持以下浏览器：

### 桌面浏览器
- ✅ **Chrome** 61+ (2017年9月)
- ✅ **Firefox** 60+ (2018年5月)
- ✅ **Safari** 10.1+ (2017年3月)
- ✅ **Edge** 16+ (2017年10月)

### 移动浏览器
- ✅ **iOS Safari** 10.3+ (2017年3月)
- ✅ **Android Chrome** 61+ (2017年9月)

## 不支持的浏览器

- ❌ **Internet Explorer 11** 及以下版本
  - 原因：不支持 ES Modules (`<script type="module">`)
  - 微软已于 2022年6月15日 停止支持 IE 11
  - 全球市场份额 < 0.5%

## 技术细节

### 代码转译
- JavaScript 转译为 **ES2015 (ES6)** 语法
- 包含必要的 polyfills：
  - Promise
  - Array methods (from, includes, iterator)
  - Object methods (assign, keys)
  - String methods (includes)

### CSS 兼容性
- 目标：Chrome 61+
- 使用 `-webkit-` 前缀处理特殊属性
- 支持 Flexbox、Grid 等现代布局

### 构建优化
- 使用 `@vitejs/plugin-legacy` 进行代码转译
- 自动注入必要的 polyfills
- 支持 modulepreload polyfill

## 覆盖率

根据 [Can I Use](https://caniuse.com/) 数据：
- 全球浏览器覆盖率：**>95%**
- 中国浏览器覆盖率：**>98%**

## 如何测试

### 本地测试
```bash
# 构建生产版本
yarn generate

# 预览
npx serve .output/public
```

### 浏览器测试
在以下浏览器中打开应用进行测试：
- Chrome 61-70（旧版本）
- Firefox 60-70（旧版本）
- Safari 10.1-12（旧版本）

### 在线测试工具
- [BrowserStack](https://www.browserstack.com/)
- [LambdaTest](https://www.lambdatest.com/)

## 降级提示

如果用户使用不支持的浏览器访问，建议添加提示：

```html
<!-- 在 app.vue 或 layouts/default.vue 中添加 -->
<div v-if="isOldBrowser" class="browser-warning">
  您的浏览器版本过旧，可能无法正常使用本网站。
  建议升级到最新版本的 Chrome、Firefox 或 Safari。
</div>
```

## 更新日志

- **2024-11-26**: 采用方案1，支持现代浏览器（Chrome 61+）
- 不再支持 IE 11

## 参考资料

- [ES Modules 浏览器支持](https://caniuse.com/es6-module)
- [Vite Legacy Plugin](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)
- [Browserslist](https://browsersl.ist/)
