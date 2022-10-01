import { ref, computed, onMounted, onUnmounted } from 'vue'

import windowExists from '../util/windowExists'

export default (optionsInput) => {
  const options = optionsInput || {}

  const isOnline = ref(false)
  const isOffline = computed(() => {
    return !isOnline.value
  })

  // Life cycle
  const update = () => {
    isOnline.value = !!window.navigator.onLine
  }

  const init = () => {
    if (windowExists()) {
      window.addEventListener('online', update)
      window.addEventListener('offline', update)
      update()
    }
  }

  const uninit = () => {
    if (windowExists()) {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }

  if (options.bind || options.bind === undefined) {
    onMounted(init)
    onUnmounted(uninit)
  }

  return {
    init,
    uninit,

    isOnline,
    isOffline
  }
}
