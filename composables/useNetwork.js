import { ref, computed, onMounted, onUnmounted } from 'vue'

export default () => {

  // API
  const isOnline = ref(false)
  const isOffline = computed(() => {
    return !isOnline.value
  })

  // Life cycle
  const update = () => {
    isOnline.value = !!window.navigator.onLine
  }

  const init = () => {
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    update()
  }

  const uninit = () => {
    window.removeEventListener('online', update)
    window.removeEventListener('offline', update)
  }

  onMounted(init)
  onUnmounted(uninit)

  return {
    init,
    uninit,
    isOnline,
    isOffline
  }
}
