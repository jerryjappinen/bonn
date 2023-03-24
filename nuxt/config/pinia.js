// import { addPlugin } from '@nuxt/kit'
// import { fileURLToPath } from 'node:url'

// State management with pinia
// https://pinia.vuejs.org/
export default (optionsInput) => {
  const {
    persist
  } = (optionsInput || {})

  // Pinia module options
  const modules = [
    ['@pinia/nuxt', {
      autoImports: ['defineStore']
    }]
  ]

  // https://github.com/prazdevs/pinia-plugin-persistedstate/blob/main/docs/frameworks/nuxt-3.md
  if (persist) {
    modules.push('@pinia-plugin-persistedstate/nuxt')
  }

  return {
    modules
  }
}
