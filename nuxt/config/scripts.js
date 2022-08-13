import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'

// Global script tags
// Each src should be either a string or an object with src attribute, and possibly others
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
export default (...srcs) => {
  const scriptTags = compact(flatten(srcs)).map((value) => {

    // String value
    if (typeof value === 'string') {
      return {
        async: true,
        src: value
      }
    }

    // Object with `src`
    return {
      async: true,
      ...value
    }
  })

  return {
    meta: {
      script: scriptTags
    }
  }
}
