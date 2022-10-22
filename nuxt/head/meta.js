// Site titles and descriptions
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#meta
export default (optionsInput) => {
  const {
    author,
    title,
    longTitle,
    description,
    type
  } = (optionsInput || {})

  const resolvedTitle = longTitle || title || description || author

  const head = {
    meta: [

      // Basic meta data
      {
        hid: 'og:type',
        property: 'og:type',
        content: type || 'website'
      }
    ]
  }

  if (resolvedTitle) {
    head.title = resolvedTitle

    head.meta.push({ hid: 'og:title', name: 'og:title', content: resolvedTitle })
    head.meta.push({ hid: 'twitter:title', name: 'twitter:title', content: resolvedTitle })
  }

  if (author) {
    head.meta.push({ hid: 'author', name: 'author', content: author })
  }

  if (description) {
    head.meta.push({ hid: 'description', name: 'description', content: description })

    if (description !== resolvedTitle) {
      head.meta.push({
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      })

      head.meta.push({
        hid: 'og:description',
        property: 'og:description',
        content: description
      })
    }
  }

  return head
}
