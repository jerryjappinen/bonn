import { computed, getCurrentInstance } from 'vue'

export default (modelValue) => {
  const { emit } = getCurrentInstance()

  const value = computed({

    get () {
      return modelValue
    },

    set (value) {
      emit('update:modelValue', value)
    }

  })

  return value
}
