// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import {
  getCurrentInstance,
  ref,
  watch,
  onMounted,
  isRef,
  isReactive,
  unref
} from 'vue'

import { differenceInCalendarDays } from 'date-fns'
import debounce from 'lodash-es/debounce'
import isDate from 'lodash-es/isDate'

import windowExists from '../utils/windowExists'

// Helpers
const prefix = 'vue-persist-'
const expirationCutoff = 14 // days
const storageDelay = 1000 // ms

const timestampIsFresh = (date) => {
  return Math.abs(differenceInCalendarDays(date, new Date())) < expirationCutoff
}

const getPersistKey = (instance, input) => {
  const componentName = instance.type.__name
  const componentInstanceId = instance.uid

  if (input) {
    const inputVal = unref(input)

    if (inputVal === true) {
      return componentName
    }

    return inputVal
  }

  return componentName + '-' + componentInstanceId
}

// Set a property to automatically store in and load from localStorage
// This makes UI persistence very easy
export default (persistData, persistKeyInput, loadManually) => {
  const instance = getCurrentInstance()
  const persistKey = getPersistKey(instance, persistKeyInput)

  // Storage

  // NOTE: undefined will not be stored
  // If you want to override older values explicitly, you must use null
  const storePersistData = debounce(function () {
    if (persistData.value !== undefined) {
      // Add item to store
      window.localStorage.setItem(
        prefix + persistKey.value,

        // Value to store
        JSON.stringify({
          timestamp: new Date(),
          data: persistData.value
        })

      )
    }
  }, storageDelay)

  const clearByKey = (key) => {
    if (windowExists()) {
      window.localStorage.removeItem(prefix + key)
    }
  }

  const clearPersistData = () => {
    return clearByKey(persistKey.value)
  }

  const loadPersistData = () => {
    if (windowExists()) {
      if (persistKey && persistData) {
        const key = prefix + persistKey.value

        // Load serialized data from localStorage
        // NOTE: this is a synchronous operation, theoretically it might slow things down
        const stored = window.localStorage.getItem(key)

        if (stored) {
          try {
            const parsed = JSON.parse(stored)

            // We found data in local storage, let's load it up
            if (parsed && parsed.timestamp && parsed.data) {
              // Needs a valid timestamp
              const storedDate = new Date(parsed.timestamp)
              if (isDate(storedDate) && timestampIsFresh(storedDate)) {
                // Pass on the data that was found and fire an event
                persistData.value = parsed.data
                persistLoaded.value = true
                instance.emit('persistLoaded', parsed.data)
              }
            }

            // Remove items if parsing leads to errors
          } catch (error) {
            // FIXME: keeping this here until gated content is testes
            // eslint-disable-next-line no-console
            console.warn(error)

            window.localStorage.removeItem(key)
          }
        }

        // Emit loaded event with null value
        if (!persistLoaded.value) {
          persistLoaded.value = true
          instance.emit('persistLoaded', null)
        }
      }
    }
  }

  // Props
  const persistLoaded = ref(false)

  // Watchers
  if (windowExists() && persistKey) {
    if (isRef(persistKey) || isReactive(persistKey)) {
      watch(persistKey, storePersistData)
    }

    watch(persistData, storePersistData)
  }

  // Lifecycle
  if (!loadManually) {
    onMounted(loadPersistData)
  }

  // Expose managed state as return value
  return {
    data: persistData,
    isLoaded: persistLoaded,
    key: persistKey,
    clear: clearPersistData
  }
}
