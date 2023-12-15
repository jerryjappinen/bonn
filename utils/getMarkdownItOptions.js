import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'

// import md from 'markdown-it'
import mdAttrs from 'markdown-it-attrs'
import mdDeflist from 'markdown-it-deflist'
import mdFootnote from 'markdown-it-footnote'
import mdTaskLists from 'markdown-it-task-lists'

// Import markdown files
export default (optionsInput) => {
  const options = {
    html: true,
    linkify: true,
    typographer: false,

    // Override defaults
    ...(optionsInput || {})
  }

  function setup (markdownIt) {
    // Default plugins
    markdownIt.use(mdAttrs, (options.attrs || {}))
    markdownIt.use(mdDeflist)
    markdownIt.use(mdFootnote)
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

  return {
    options,
    setup
  }
}
