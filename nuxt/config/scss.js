import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'

import css from './css'
import mergeConfigs from './mergeConfigs'

// SCSS preprocessing setup
// e.g. scss({ global: 'styles/index.scss', shared: 'styles/mixins.scss', external: 'https://...css' })
export default (optionsInput) => {
  const { shared } = (optionsInput || {})

  // This goes into vite, which needs SCSS code as string
  let sharedFiles = []
  if (shared) {
    sharedFiles = compact(flatten([shared])).map((path) => {
      return `@import '@/${path}';`
    })
  }

  return mergeConfigs(

    // Various CSS options support SCSS too
    css(optionsInput),

    // Inject shared SCSS into components
    {
      vite: {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: sharedFiles.join('\n') + '\n'
            }
          }
        }
      }
    }
  )
}
