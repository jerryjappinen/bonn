import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'

import md from 'markdown-it'
import mdAttrs from 'markdown-it-attrs'
import mdDeflist from 'markdown-it-deflist'
import mdTaskLists from 'markdown-it-task-lists'

// Import markdown files
// https://www.npmjs.com/package/vite-plugin-markdown
export default (optionsInput) => {
  const options = (optionsInput || {})

  // https://github.com/markdown-it/markdown-it#init-with-presets-and-options
  const markdownIt = md({
    html: true,
    linkify: true,
    typographer: false,

    // Override defaults
    ...options
  })

  // Default plugins
  markdownIt.use(mdAttrs, (options.attrs || {}))
  markdownIt.use(mdDeflist)
  markdownIt.use(mdTaskLists, {
    label: true,
    ...(options.taskLists || {})
  })

  // https://github.com/markdown-it/markdown-it#plugins-load
  if (options.plugins) {
    compact(flatten([options.plugins])).forEach((plugin) => {
      markdownIt.use(plugin)
    })
  }

  return markdownIt
}
