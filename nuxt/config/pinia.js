// import { addPlugin } from '@nuxt/kit'
// import { fileURLToPath } from 'node:url'

// State management with pinia
// https://pinia.vuejs.org/
export default () => {
  return {
    modules: [
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
  }
}
