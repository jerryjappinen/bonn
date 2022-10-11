import { ref, isRef, watch } from 'vue'

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
  keys: []
}

export default (optionsInput) => {
  const options = {
    ...defaultOptions,
    ...(optionsInput || {})
  }

  const fuse = ref(null)
  const data = isRef(options.data) ? options.data : ref(options.data || [])

  // Options
  // https://fusejs.io/api/options.html
  const isCaseSensitive = isRef(options.isCaseSensitive) ? options.isCaseSensitive : ref(options.isCaseSensitive)
  const includeScore = isRef(options.includeScore) ? options.includeScore : ref(options.includeScore)
  const shouldSort = isRef(options.shouldSort) ? options.shouldSort : ref(options.shouldSort)
  const includeMatches = isRef(options.includeMatches) ? options.includeMatches : ref(options.includeMatches)
  const findAllMatches = isRef(options.findAllMatches) ? options.findAllMatches : ref(options.findAllMatches)
  const minMatchCharLength = isRef(options.minMatchCharLength) ? options.minMatchCharLength : ref(options.minMatchCharLength)
  const location = isRef(options.location) ? options.location : ref(options.location)
  const threshold = isRef(options.threshold) ? options.threshold : ref(options.threshold)
  const distance = isRef(options.distance) ? options.distance : ref(options.distance)
  const useExtendedSearch = isRef(options.useExtendedSearch) ? options.useExtendedSearch : ref(options.useExtendedSearch)
  const ignoreLocation = isRef(options.ignoreLocation) ? options.ignoreLocation : ref(options.ignoreLocation)
  const ignoreFieldNorm = isRef(options.ignoreFieldNorm) ? options.ignoreFieldNorm : ref(options.ignoreFieldNorm)
  const fieldNormWeight = isRef(options.fieldNormWeight) ? options.fieldNormWeight : ref(options.fieldNormWeight)
  const keys = isRef(options.keys) ? options.keys : ref(options.keys)

  const init = () => {
    fuse.value = new Fuse(data.value, {
      isCaseSensitive,
      includeScore,
      shouldSort,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      location,
      threshold,
      distance,
      useExtendedSearch,
      ignoreLocation,
      ignoreFieldNorm,
      fieldNormWeight,
      keys
    })
  }

  const uninit = () => {
    fuse.value = null
  }

  watch(keys, init)

  watch(data, (newData) => {
    if (fuse.value) {
      fuse.value.setCollection(newData)
    }
  })

  if (options.bind || options.bind === undefined) {
    init()
  }

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

    isCaseSensitive,
    includeScore,
    shouldSort,
    includeMatches,
    findAllMatches,
    minMatchCharLength,
    location,
    threshold,
    distance,
    useExtendedSearch,
    ignoreLocation,
    ignoreFieldNorm,
    fieldNormWeight,
    keys
  }
}
