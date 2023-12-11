// eslint-disable-next-line @typescript-eslint/no-var-requires
const es6 = require('./es6.cjs')

const eslintConfig = {
  ...es6
}

// https://github.com/nuxt/framework/discussions/2815
eslintConfig.env.browser = true

if (!eslintConfig.extends) {
  eslintConfig.extends = []
}

eslintConfig.extends.push('@nuxt/eslint-config')
// eslintConfig.extends.push('plugin:nuxt/recommended')

// eslintConfig.parserOptions.parser = '@typescript-eslint/parser'
// eslintConfig.plugins = ['@typescript-eslint/eslint-plugin', 'vue', 'nuxt']

// Rules

// Single-word component names can overlap with native elements, but this should not be a hard rule
// This library includes many single-word component names
eslintConfig.rules['vue/multi-word-component-names'] = 'off'

// NOTE: this rule is no longer valid in Vue 3, but still included in the original setup
// It will probably be removed from the defaults at some point
// https://eslint.vuejs.org/rules/no-v-for-template-key-on-child.html
eslintConfig.rules['vue/no-v-for-template-key'] = 'off'

module.exports = eslintConfig
