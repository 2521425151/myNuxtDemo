// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // Vue 规则
      'vue/multi-word-component-names': 'off', // 允许单词组件名
      'vue/no-v-html': 'warn', // 警告使用 v-html
      'vue/require-default-prop': 'off', // 不强制 prop 默认值
      'vue/require-prop-types': 'warn', // 警告缺少 prop 类型
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1
      }],

      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'warn', // 警告使用 any
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],

      // 通用规则
      'no-console': ['warn', { allow: ['warn', 'error'] }], // 警告 console.log
      'no-debugger': 'warn', // 警告 debugger
      'prefer-const': 'error', // 优先使用 const
      'no-var': 'error', // 禁止使用 var
      'object-shorthand': 'error', // 对象简写
      'quote-props': ['error', 'as-needed'], // 按需引号
      'quotes': ['error', 'single', { avoidEscape: true }], // 单引号
      'semi': ['error', 'never'], // 不使用分号
      'comma-dangle': ['error', 'never'], // 不使用尾随逗号
      'indent': ['error', 2], // 2 空格缩进
      'eol-last': ['error', 'always'], // 文件末尾空行
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // 最多一个空行
      'arrow-parens': ['error', 'as-needed'], // 箭头函数参数括号
      'space-before-function-paren': ['error', 'always'] // 函数括号前空格
    }
  }
)
