import mdPlugin, { Mode } from 'vite-plugin-markdown'
import getMarkdownIt from '../../utils/getMarkdownIt'

export default (...args) => {
  const markdownIt = getMarkdownIt(...args)

  // https://github.com/hmsk/vite-plugin-markdown
  return {
    vite: {
      plugins: [
        mdPlugin({
          mode: [Mode.HTML, Mode.MARKDOWN, Mode.TOC, Mode.VUE],
          markdownIt
        })
      ]
    }
  }
}
