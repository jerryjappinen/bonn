import { defineNuxtPlugin } from '@nuxt/kit'
import { createNuxtPersistedState } from 'pinia-plugin-persistedstate/nuxt'

import { useCookie } from '#imports'

export default () => {
  return defineNuxtPlugin((nuxtApp) => {
    nuxtApp.$pinia.use(createNuxtPersistedState(useCookie))
  })
}
