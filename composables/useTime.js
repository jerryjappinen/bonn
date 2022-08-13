import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export default () => {
  const current = ref(new Date())
  const intervalDuration = ref(100) // ms

  // You can listen to these to only get an update when you need it
  const currentMillisecond = computed(() => {
    return current.value.getMilliseconds()
  })

  const currentSecond = computed(() => {
    return current.value.getSeconds()
  })

  const currentMinute = computed(() => {
    return current.value.getMinutes()
  })

  const currentHour = computed(() => {
    return current.value.getHours()
  })

  const currentDate = computed(() => {
    return new Date(current.value.toDateString())
  })



  // Actions

  let loop = null

  const setIntervalDuration = (ms) => {
    intervalDuration.value = ms
  }

  const update = () => {
    current.value = new Date()
  }

  const startLoop = () => {
    update()
    endLoop()
    loop = setInterval(update, intervalDuration.value)
  }

  const endLoop = () => {
    if (loop) {
      clearInterval(loop)
      loop = null
    }
  }



  // Life cycle
  const init = startLoop
  const uninit = endLoop

  watch(intervalDuration, startLoop)

  onMounted(init)
  onUnmounted(uninit)



  // API

  return {
    init,
    uninit,

    current,

    currentMillisecond,
    currentSecond,
    currentMinute,
    currentHour,
    currentDate,

    intervalDuration,
    setIntervalDuration,

    startLoop,
    endLoop
  }
}
