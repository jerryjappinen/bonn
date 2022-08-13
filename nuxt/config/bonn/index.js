import isDev from '../../../util/isDev'

import getDevAliases from './getDevAliases'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default (options) => {
  const opts = options || {}

  const components = !!opts.components || (opts.components === false ? false : true)
  const composables = !!opts.composables || (opts.composables === false ? false : true)
  const icons = !!opts.icons || (opts.icons === false ? false : true)

  // Include library components in the compilation
  const modules = []
  const transpile = [
    'bonn'
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
