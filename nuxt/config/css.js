import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'

// SCSS preprocessing setup
// e.g. css({ global: 'styles/index.scss', inline: 'body { color: red; }', external: 'https://...css' })
export default (optionsInput) => {
  const {
    global,
    inline,
    external
  } = (optionsInput || {})

  // Links to static CSS files
  let externalLinkTags = []
  if (external) {
    externalLinkTags = compact(flatten([external])).map((href) => {
      return { href, rel: 'stylesheet' }
    })
  }

  // This goes into Nuxt, which needs list of file paths
  let globalFiles = []
  if (global) {
    globalFiles = compact(flatten([global])).map((path) => {
      return '@/' + path
    })
  }

  // This goes into Nuxt, which needs list of file paths
  let inlineFiles = []
  if (inline) {
    inlineFiles = compact(flatten([inline])).map((css) => {
      return {
        type: 'text/css',
        children: css
      }
    })
  }

  return {
    css: globalFiles,
    link: externalLinkTags,

    // Global style tags (currently not supported)
    meta: {
      style: inlineFiles
    }

  }
}
