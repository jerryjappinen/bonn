import { ref } from 'vue'
import frameLoop from '../util/frameLoop'

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

  const getWrappedCallback = (callbackName) => {
    return (...args) => {
      updateRefs()
      if (options[callbackName]) {
        options[callbackName](...args)
      }
    }
  }

  const loop = frameLoop({
    ...options,
    onUpdate: getWrappedCallback('onUpdate'),
    onPlay: getWrappedCallback('onPlay'),
    onPause: getWrappedCallback('onPause'),
    onSetOptions: getWrappedCallback('onSetOptions')
  })

  const updateRefs = () => {
    isPlaying.value = loop.getIsPlaying()
    fps.value = loop.getFps()
    frameTime.value = loop.getFrameTime()
    lastEvaluationTime.value = loop.getLastEvaluationTime()
    lastUpdateTime.value = loop.getLastUpdateTime()
    lastRenderTime.value = loop.getLastRenderTime()
    lastStartTime.value = loop.getLastStartTime()
  }

  updateRefs()

  return {
    loop,

    isPlaying,
    fps,
    frameTime,
    lastEvaluationTime,
    lastUpdateTime,
    lastRenderTime,
    lastStartTime
  }
}
