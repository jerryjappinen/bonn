// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { ref, computed, onMounted, onUnmounted } from 'vue'

import uniq from 'lodash-es/uniq'

import getBrowserLanguages from '../utils/getBrowserLanguages'
import windowExists from '../utils/windowExists'

export default (optionsInput) => {
  const options = optionsInput || {}

  const languagesFull = ref([])

  const languages = computed(() => {
    return uniq(languagesFull.value.map((lang) => {
      return lang.split('-')[0]
    }))
  })

  const language = computed(() => {
    return languages.value[0] || null
  })

  const languageFull = computed(() => {
    return languagesFull.value[0] || null
  })

  const update = () => {
    languagesFull.value = getBrowserLanguages()
  }

  const init = () => {
    if (windowExists()) {
      update()
      window.addEventListener('languagechange', update)
    }
  }

  const uninit = () => {
    if (windowExists()) {
      window.removeEventListener('languagechange', update)
    }
  }

  // Automatically init and uninit in components
  if (options.bind || options.bind === undefined) {
    onMounted(init)
    onUnmounted(uninit)
  }

  // Expose managed state as return value
  return {
    init,
    uninit,

    language,
    languages,
    languageFull,
    languagesFull
  }
}
