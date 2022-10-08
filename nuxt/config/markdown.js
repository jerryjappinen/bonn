import viteMarkdownPlugin from 'vite-plugin-markdown'
import getMarkdownIt from '../../util/getMarkdownIt'

// Import markdown files
// https://www.npmjs.com/package/vite-plugin-markdown
export default (...args) => {
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
