import getMarkdownIt from '../../util/getMarkdownIt'

import viteMarkdownPlugin from 'vite-plugin-markdown'

// Import markdown files
// https://www.npmjs.com/package/vite-plugin-markdown
export default (args) => {
  const markdownIt = getMarkdownIt(...args)

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
