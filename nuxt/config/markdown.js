import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'

import getMarkdownItOptions from '../../utils/getMarkdownItOptions'

export default (...optionsInput) => {
  const { options, setup } = getMarkdownItOptions(...optionsInput)

  return {
    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/] // <--
      }),
      Markdown({
        markdownItOptions: options,
        markdownItSetup: setup
      })
    ]
  }
}
