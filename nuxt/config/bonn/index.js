import isDev from '../../../util/isDev'

import getDevAliases from './getDevAliases'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default (options) => {
  const opts = options || {}

  const components = !!opts.components || (opts.components !== false)
  const composables = !!opts.composables || (opts.composables !== false)
  const icons = !!opts.icons || (opts.icons !== false)

  // Include library components in the compilation
  const modules = []
  const transpile = [
    // 'bonn',
    'lodash-es',
    ...(opts.transpile || [])
  ]

  // Auto load bonn (will auto-import components)
  if (composables || components || icons) {
    modules.push(['bonn/nuxt', {
      components,
      composables,
      icons,
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
