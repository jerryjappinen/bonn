import { ref, computed, onMounted, onUnmounted } from 'vue'

import windowExists from '../util/windowExists'

export default () => {
  // API
  const isInited = ref(false)
  const isOnline = ref(false)
  const isOffline = computed(() => {
    return !isOnline.value
  })

  // Life cycle
  const update = () => {
    isOnline.value = !!window.navigator.onLine
  }

  const init = () => {
    if (windowExists() && !isInited.value) {
      isInited.value = true
      window.addEventListener('online', update)
      window.addEventListener('offline', update)
      update()
    }
  }

  const uninit = () => {
    if (isInited.value) {
      isInited.value = false
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }

  onMounted(init)
  onUnmounted(uninit)

  init()

  return {
    init,
    uninit,
    isInited,

    isOnline,
    isOffline
  }
}
