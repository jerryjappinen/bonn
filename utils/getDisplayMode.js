import cssDisplayModes from './cssDisplayModes'
import windowExists from './windowExists'

export default () => {
  if (windowExists() && window.matchMedia) {
    for (let i = 0; i < cssDisplayModes.length; i++) {
      const displayMode = cssDisplayModes[i]
      if (window.matchMedia(`(display-mode: ${displayMode})`).matches) {
        return displayMode
      }
    }
  }

  return null
}
