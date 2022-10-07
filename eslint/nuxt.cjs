const es6 = require('./es6.cjs')

const eslintConfig = {
  ...es6
}

// https://github.com/nuxt/framework/discussions/2815
eslintConfig.env.browser = true

if (!eslintConfig.extends) {
  eslintConfig.extends = []
}

eslintConfig.extends.push('@nuxtjs/eslint-config-typescript')
eslintConfig.extends.push('plugin:nuxt/recommended')

eslintConfig.parserOptions.parser = '@typescript-eslint/parser'

eslintConfig.plugins = ['@typescript-eslint', 'vue', 'nuxt']

module.exports = eslintConfig
