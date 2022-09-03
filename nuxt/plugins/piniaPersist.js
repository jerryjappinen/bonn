import { createNuxtPersistedState } from 'pinia-plugin-persistedstate/nuxt'

import { useCookie } from '#imports'

export default (optionsInput) => {
  return (nuxtApp) => {
    nuxtApp.$pinia.use(createNuxtPersistedState(useCookie, optionsInput))
  }
}
