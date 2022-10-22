import { createNuxtPersistedState } from 'pinia-plugin-persistedstate/nuxt'

export default defineNuxtPlugin((optionsInput) => {
  return (nuxtApp) => {
    // `useCookie` is auto imported in Nuxt
    nuxtApp.$pinia.use(createNuxtPersistedState(useCookie, optionsInput))
  }
})
