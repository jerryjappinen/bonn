import { createNuxtPersistedState } from 'pinia-plugin-persistedstate/nuxt'

export default (optionsInput) => {
  return (nuxtApp) => {
    nuxtApp.$pinia.use(createNuxtPersistedState(useCookie, optionsInput))
  }
}
