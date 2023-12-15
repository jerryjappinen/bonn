import getMarkdownItOptions from './getMarkdownItOptions'

import md from 'markdown-it'

// Import markdown files
// https://www.npmjs.com/package/vite-plugin-markdown
export default (optionsInput) => {
  const { options, setup } = getMarkdownItOptions(optionsInput)

  // https://github.com/markdown-it/markdown-it#init-with-presets-and-options
  const markdownIt = md(options)

  setup(markdownIt)

  return markdownIt
}
