// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { ref, onMounted } from 'vue'

export default () => {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  return isMounted
}
