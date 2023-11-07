// import { addPlugin } from '@nuxt/kit'
// import { fileURLToPath } from 'node:url'

// State management with pinia
// https://pinia.vuejs.org/
export default (optionsInput) => {
  const {
    persist,
    storesDirs
  } = (optionsInput || {})

  // Pinia module options
  const moduleOptions = {}
  if (storesDirs) {
    moduleOptions.storesDirs = storesDirs
  }

  const modules = [
    ['@pinia/nuxt', moduleOptions]
  ]

  // https://github.com/prazdevs/pinia-plugin-persistedstate/blob/main/docs/frameworks/nuxt-3.md
  if (persist) {
    modules.push('@pinia-plugin-persistedstate/nuxt')
  }

  return {
    modules
  }
}
