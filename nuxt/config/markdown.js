import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'

import viteMarkdownPlugin from 'vite-plugin-markdown'

import md from 'markdown-it'

// Import markdown files
// https://www.npmjs.com/package/vite-plugin-markdown
export default (options) => {
  const opts = options || {}

  // https://github.com/markdown-it/markdown-it#init-with-presets-and-options
  const markdownItOptions = md({
    html: true,
    linkify: true,
    typographer: false,

    // Override defaults
    ...opts
  })

  const markdownIt = md(markdownItOptions)

  // https://github.com/markdown-it/markdown-it#plugins-load
  if (opts.plugins) {
    compact(flatten([opts.plugins])).forEach((plugin) => {
      markdownIt.use(plugin)
    })
  }

  return {
    vite: {
      plugins: [
        viteMarkdownPlugin({
          mode: 'vue',
          markdownIt
        })
      ]
    }
  }
}
