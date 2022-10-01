// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { ref, computed, onMounted, onUnmounted } from 'vue'

import windowExists from '../util/windowExists'

export default () => {
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
    if (windowExists()) {
      window.addEventListener('mousemove', update)
    }
  }

  const uninit = () => {
    if (windowExists()) {
      window.removeEventListener('mousemove', update)
    }
  }

  // Automatically unit and uninit in components
  onMounted(init)
  onUnmounted(uninit)

  // Expose managed state as return value
  return {
    init,
    uninit,

    x,
    y,
    xy
  }
}
