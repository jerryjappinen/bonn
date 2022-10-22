// Cover image for sharing
export default (optionsInput) => {
  const {
    title,
    baseUrl,
    path
  } = (optionsInput || {})

  if (coverImage) {
    const coverImagePath = (baseUrl || '') + '/' + (path || 'cover-image.png')

    // Twitter cards
    metaTags.push({
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    })

    metaTags.push({
      hid: 'twitter:image',
      name: 'twitter:image',
      content: coverImagePath
    })

    // Facebook (OpenGraph)
    metaTags.push({
      hid: 'og:image',
      property: 'og:image',
      content: coverImagePath
    })

    // Title is done with separate tags
    if (title) {
      metaTags.push({
        hid: 'twitter:image:alt',
        property: 'twitter:image:alt',
        content: title
      })

      metaTags.push({
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: title
      })
    }
  }

  // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#meta
  // https://v3.nuxtjs.org/api/composables/use-head/
  return {
    meta: {
      link: linkTags,
      meta: metaTags
    }
  }
}
