import { ref, computed, onMounted, onUnmounted } from 'vue'

import gamepadIsSupported from '../..//gamepadIsSupported'
import getGamepads from '../..//getGamepads'

import getInputData from './getInputData'
import getInputDataPlaceholder from './getInputDataPlaceholder'

const defaultDeadZone = 0.15

export default () => {
  const isSupported = ref(false)
  const gamepads = ref([])

  const mainLoopId = ref(null)
  const mainLoopStartTimestamp = ref(0)
  const mainLoopElapsed = ref(0)

  // NOTE: would be more powerful to set this per controller
  const settings = {
    leftStickInnerDeadzone: defaultDeadZone,
    leftStickOuterDeadzone: defaultDeadZone,
    rightStickInnerDeadzone: defaultDeadZone,
    rightStickOuterDeadzone: defaultDeadZone
  }

  const inputs = ref([
    getInputDataPlaceholder(),
    getInputDataPlaceholder(),
    getInputDataPlaceholder(),
    getInputDataPlaceholder()
  ])

  // Computed

  const connectedGamepads = computed(() => {
    const connectedGamepads = []

    for (let i = 0; i < gamepads.value.length; i++) {
      if (gamepads.value[i]) {
        connectedGamepads.push(gamepads.value[i])
      }
    }

    return connectedGamepads
  })

  const connectedGamepadIndices = computed(() => {
    return connectedGamepads.value.map((gamepad) => {
      return gamepad.index
    })
  })

  const firstConnectedGamepad = computed(() => {
    return connectedGamepads.value[0] || null
  })

  const firstConnectedGamepadInputs = computed(() => {
    return inputs.value[connectedGamepadIndices.value[0]] || null
  })

  const hasConnectedGamepads = computed(() => {
    return !!firstConnectedGamepad.value
  })

  // Actions

  const updateGamepadList = () => {
    gamepads.value = getGamepads()
  }

  const updateInputValues = () => {
    connectedGamepadIndices.value.forEach((i) => {
      const newInputValues = getInputData(gamepads.value[i], settings)

      // Update only changed values
      for (const inputKey in newInputValues) {
        if (inputs.value[i][inputKey] !== newInputValues[inputKey]) {
          inputs.value[i][inputKey] = newInputValues[inputKey]
        }
      }
    })
  }

  // Update loop

  const startMainLoop = () => {
    mainLoopId.value = window.requestAnimationFrame(mainLoopCallback)
  }

  const endMainLoop = () => {
    if (mainLoopId.value) {
      window.cancelAnimationFrame(mainLoopId.value)
      mainLoopId.value = null
    }

    mainLoopStartTimestamp.value = 0
    mainLoopElapsed.value = 0
  }

  const mainLoopCallback = (timestamp) => {
    updateGamepadList()

    // First frame
    if (!mainLoopStartTimestamp.value) {
      mainLoopStartTimestamp.value = timestamp

    // Consecutive frames
    } else {
      mainLoopElapsed.value = timestamp - mainLoopStartTimestamp.value
    }

    // Frame routine
    updateInputValues()

    // Order next frame
    startMainLoop()
  }

  // API

  const onGamepadConnected = () => {
    updateGamepadList()

    if (hasConnectedGamepads.value && !mainLoopId.value) {
      startMainLoop()
    }
  }

  const onGamepadDisconnected = () => {
    updateGamepadList()

    if (!hasConnectedGamepads.value && mainLoopId.value) {
      endMainLoop()
    }
  }

  onMounted(() => {
    if (gamepadIsSupported()) {
      isSupported.value = true

      updateGamepadList()

      window.addEventListener('gamepadconnected', onGamepadConnected)
      window.addEventListener('gamepaddisconnected', onGamepadDisconnected)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('gamepadconnected', onGamepadConnected)
    window.removeEventListener('gamepaddisconnected', onGamepadDisconnected)

    updateGamepadList()
    endMainLoop()
  })

  return {
    isSupported,
    gamepads,

    inputs,
    connectedGamepads,
    connectedGamepadIndices,
    firstConnectedGamepad,
    firstConnectedGamepadInputs,
    hasConnectedGamepads
  }
}
