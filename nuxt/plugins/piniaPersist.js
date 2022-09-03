import { createNuxtPersistedState } from 'pinia-plugin-persistedstate/nuxt'

import { useCookie } from '#imports'

export default (nuxtApp) => {
  nuxtApp.$pinia.use(createNuxtPersistedState(useCookie))
}
