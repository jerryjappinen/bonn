import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'

// SCSS preprocessing setup
// e.g. scss({ global: 'styles/index.scss', shared: 'styles/mixins.scss', external: 'https://...css' })
export default (optionsInput) => {
  const {
    global,
    shared,
    external
  } = optionsInput || {}

  // This goes into Nuxt, which needs list of file paths
  let globalFiles = []
  if (global) {
    globalFiles = compact(flatten([global])).map((path) => {
      return '@/' + path
    })
  }

  // This goes into vite, which needs SCSS code as string
  let sharedFiles = []
  if (shared) {
    sharedFiles = compact(flatten([shared])).map((path) => {
      return `@import '@/${path}';`
    })
  }

  // Links to static CSS files
  let externalLinkTags = []
  if (external) {
    externalLinkTags = compact(flatten([external])).map((href) => {
      return { href, rel: 'stylesheet' }
    })
  }

  return {
    css: globalFiles,
    link: externalLinkTags,

    // Global style tags (currently not supported)
    // meta: {
    //   style: [
    //     {
    //       type: 'text/css',
    //       children: ':root { color: red }'
    //     }
    //   ]
    // },

    // Inject shared SCSS into components
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
}
