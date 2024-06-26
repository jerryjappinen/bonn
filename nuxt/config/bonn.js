import isDev from '../../utils/isDev'

import getDevAliases from './bonn/getDevAliases'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default (options) => {
  const opts = options || {}

  const components = !!opts.components || (opts.components !== false)
  const composables = !!opts.composables || (opts.composables !== false)
  const icons = !!opts.icons || (opts.icons !== false)
  const utils = !!opts.utils || (opts.utils !== false)

  // Include library components in the compilation
  const modules = []
  const transpile = [
    // 'bonn',
    // 'contentful-util',
    'prism-es6',
    'lodash-es',
    ...(opts.transpile || [])
  ]

  // Auto load bonn (will auto-import components)
  if (composables || components || icons) {
    modules.push(['bonn/nuxt', {
      components,
      composables,
      icons,
      utils,
      prefix: opts.prefix
    }])
  }

  // Only in dev mode when asked
  const alias = opts.dev && isDev()
    ? getDevAliases(opts.dev)
    : {}

  return {
    alias,
    build: {
      transpile
    },
    modules
  }
}
