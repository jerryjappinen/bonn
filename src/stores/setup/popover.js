// import { ref, computed } from 'vue'
import { ref } from 'vue'

// Returns setup function
export default () => {
  return () => {
    const isOpen = ref(false)

    const markOpen = () => {
      if (!isOpen.value) {
        isOpen.value = true
      }
    }

    const markClosed = () => {
      if (isOpen.value) {
        isOpen.value = false
      }
    }

    return {
      isOpen,
      markOpen,
      markClosed
    }
  }
}
