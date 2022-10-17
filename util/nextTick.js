import windowExists from './windowExists'

export default (callback) => {
  if (windowExists() && window.requestAnimationFrame) {
    const rafId = window.requestAnimationFrame(callback)

    return () => {
      return window.cancelAnimationFrame(rafId)
    }
  }

  const timeout = setTimeout(callback, 1)

  return () => {
    return clearTimeout(timeout)
  }
}
