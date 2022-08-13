// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
    window.addEventListener('mousemove', update)
  }

  const uninit = () => {
    window.removeEventListener('mousemove', update)
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
