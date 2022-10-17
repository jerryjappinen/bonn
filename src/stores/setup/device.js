import useCursor from '../../composables/useCursor'
import useNetwork from '../../composables/useNetwork'
import usePlatform from '../../composables/usePlatform'
import useTime from '../../composables/useTime'
import useViewport from '../../composables/useViewport'

// export default defineStore('device', () => { })

// Exports the setup function for this store
// defineStore must be called in the client app
export default (optionsInput) => {
  return () => {
    const options = optionsInput || {}

    const modules = {
      cursor: useCursor({ bind: false }),
      network: useNetwork({ bind: false }),
      platform: usePlatform(),
      time: useTime({ bind: false }),
      viewport: useViewport({ bind: false })
    }

    const run = (methodName, ...args) => {
      for (const key in modules) {
        if (modules[key][methodName]) {
          modules[key][methodName](...args)
        }
      }
    }

    const init = (...args) => {
      run('init', ...args)
    }

    const uninit = (...args) => {
      run('uninit', ...args)
    }

    if (options.bind || options.bind === undefined) {
      init()
    }

    // Device API
    return {
      init,
      uninit,

      ...modules
    }
  }
}
