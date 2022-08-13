// Site titles and descriptions
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#meta
export default (optionsInput) => {
  const {
    siteAuthor,
    siteTitle,
    longSiteTitle,
    siteDescription,
    facebookAppId,
    twitterUsername
  } = optionsInput || {}

  const title = longSiteTitle || siteTitle || siteDescription || siteAuthor
  const metaTags = []

  if (title) {
    metaTags.push({ hid: 'og:title', name: 'og:title', content: title })
    metaTags.push({ hid: 'twitter:title', name: 'twitter:title', content: title })
  }

  if (siteAuthor) {
    metaTags.push({ hid: 'author', name: 'author', content: siteAuthor })
  }

  if (siteDescription) {
    metaTags.push({ hid: 'description', name: 'description', content: siteDescription })

    if (siteDescription !== title) {
      metaTags.push({
        hid: 'twitter:description',
        name: 'twitter:description',
        content: siteDescription,
      })

      metaTags.push({
        hid: 'og:description',
        property: 'og:description',
        content: siteDescription,
      })
    }

  }

  if (facebookAppId) {
    metaTags.push({ hid: 'fb:app_id', property: 'fb:app_id', content: facebookAppId })
  }

  if (twitterUsername) {
    metaTags.push({ hid: 'twitter:site', name: 'twitter:site', content: '@' + twitterUsername })
  }

  return {
    meta: {
      title,
      meta: metaTags
    }
  }
}
