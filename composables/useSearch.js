import { ref, isRef, unref, computed, watch, onMounted, onUnmounted } from 'vue'

import mapValues from 'lodash-es/mapValues'

// https://fusejs.io/
import Fuse from 'fuse.js'

const defaultOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  // keys: []
}

// https://fusejs.io/api/options.html
const configKeys = [
  'keys',
  'isCaseSensitive',
  'includeScore',
  'shouldSort',
  'includeMatches',
  'findAllMatches',
  'minMatchCharLength',
  'location',
  'threshold',
  'distance',
  'useExtendedSearch',
  'ignoreLocation',
  'ignoreFieldNorm',
  'fieldNormWeight'
]

export default (optionsInput) => {
  const options = {
    ...defaultOptions,
    ...(optionsInput || {})
  }

  const fuse = ref(null)
  const data = isRef(options.data) ? options.data : ref(options.data || [])

  const config = computed(() => {
    const c = {}

    configKeys.forEach((key) => {
      if (options[key]) {
        c[key] = isRef(options[key]) ? options[key] : ref(options[key])
      }
    })

    return c
  })

  const init = () => {
    fuse.value = new Fuse(data.value, mapValues(config.value, unref))
  }

  const uninit = () => {
    fuse.value = null
  }

  // Loading behavior

  if (!options.loadManually) {
    onMounted(init)
    onUnmounted(uninit)
  }

  // Watchers

  watch(config, init, {
    deep: true
  })

  watch(data, (newData) => {
    if (fuse.value) {
      fuse.value.setCollection(newData)
    }
  })

  return {
    init,
    uninit,

    // https://fusejs.io/api/methods.html
    search (...args) {
      return fuse.value.search(...args)
    },

    getIndex () {
      return fuse.value.getIndex()
    },

    parseIndex: Fuse.parseIndex,

    fuse,
    data,
    config
  }
}
