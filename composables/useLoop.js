import frameLoop from '../util/frameLoop'

import { ref } from 'vue'

// {
//   fps,
//   frameInterval,
//   onEvaluation,
//   onUpdate,
//   onRender,
//   onPlay,
//   onPause,
//   onReset,
//   onSetOptions
// }
export default (options) => {
  const isPlaying = ref()
  const fps = ref()
  const frameTime = ref()
  const lastEvaluationTime = ref()
  const lastUpdateTime = ref()
  const lastRenderTime = ref()
  const lastStartTime = ref()

  const updateRefs = () => {
    isPlaying.value = getIsPlaying()
    fps.value = getFps()
    frameTime.value = getFrameTime()
    lastEvaluationTime.value = getLastEvaluationTime()
    lastUpdateTime.value = getLastUpdateTime()
    lastRenderTime.value = getLastRenderTime()
    lastStartTime.value = getLastStartTime()
  }

  const getWrappedCallback = (callbackName) => {
    return (...args) => {
      updateRefs()
      if (options[callbackName]) {
        options[callbackName](...args)
      }
    }
  }

  updateRefs()

  const loop = frameLoop({
    ...options,
    onUpdate: getWrappedCallback('onUpdate'),
    onPlay: getWrappedCallback('onPlay'),
    onPause: getWrappedCallback('onPause'),
    onSetOptions: getWrappedCallback('onSetOptions')
  })

  return {
    ...loop,

    isPlaying,
    fps,
    frameTime,
    lastEvaluationTime,
    lastUpdateTime,
    lastRenderTime,
    lastStartTime
  }
}
