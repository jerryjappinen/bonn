// import { addPlugin } from '@nuxt/kit'
// import { fileURLToPath } from 'node:url'

// State management with pinia
// https://pinia.vuejs.org/
export default (optionsInput) => {
  const {
    persist
  } = (optionsInput || {})

  // https://github.com/prazdevs/pinia-plugin-persistedstate/blob/main/docs/frameworks/nuxt-3.md
  const modules = [
    // async (inlineOptions, nuxt) => {
    //   console.log('inline module definition', nuxt.options.plugins)
    //   addPlugin({
    //     src: fileURLToPath(new URL('../plugins/pinia-persist', import.meta.url)),
    //     // filename: 'pinia-plugin-persistedstate.client.js' // [optional]
    //   })
    // },

    ['@pinia/nuxt', {

      // Pinia module options
      autoImports: ['defineStore']
    }]
  ]

  if (persist) {
    modules.push('@pinia-plugin-persistedstate/nuxt')
  }

  return {
    modules
  }
}
