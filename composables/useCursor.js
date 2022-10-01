// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { ref, computed, onMounted, onUnmounted } from 'vue'

import windowExists from '../util/windowExists'

export default () => {
  console.log('useCursor setup', windowExists())

  const x = ref(0)
  const y = ref(0)

  const xy = computed(() => {
    return [x, y]
  })

  const update = ({ clientX, clientY }) => {
    x.value = clientX
    y.value = clientY
  }

  const init = () => {
    console.log('useCursor init', windowExists())

    if (windowExists()) {
      window.addEventListener('mousemove', update)
    }
  }

  const uninit = () => {
    console.log('useCursor uninit', windowExists())

    if (windowExists()) {
      window.removeEventListener('mousemove', update)
    }
  }

  // Automatically unit and uninit in components
  onMounted(() => {
    console.log('useCursor mounted')
    init()
  })
  onUnmounted(() => {
    console.log('useCursor unmounted')
    uninit()
  })

  // Expose managed state as return value
  return {
    init,
    uninit,

    x,
    y,
    xy
  }
}
