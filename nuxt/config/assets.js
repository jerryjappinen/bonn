export default (optionsInput) => {
  const {
    longSiteTitle,
    baseUrl,

    coverImage,
    favicon,
    faviconIco,
    appleTouchIcon,
    maskIcon,
    maskIconColor,
    manifest
  } = (optionsInput || {})

  const linkTags = []
  const metaTags = []



  // Icons
  if (favicon) {
    const faviconPath = favicon === true ? 'favicon.svg' : favicon
    const faviconType = faviconPath.indexOf('.svg') > -1
      ? 'svg+xml'
      : 'png'

    linkTags.push({
      rel: 'icon',
      type: 'image/' + faviconType,
      href: '/' + faviconPath
    })
  }

  if (faviconIco) {
    linkTags.push({
      rel: 'alternate icon',
      href: '/' + (faviconIco === true ? 'favicon.ico' : faviconIco)
    })
  }

  if (maskIcon) {
    linkTags.push({
      rel: 'mask-icon',
      type: 'image/svg+xml',
      href: '/' + (maskIcon === true ? 'mask-icon.svg' : maskIcon),
      color: maskIconColor || '#000000',
    })
  }

  if (appleTouchIcon) {
    linkTags.push({
      rel: 'apple-touch-icon',
      href: '/' + (appleTouchIcon === true ? 'apple-touch-icon.png' : appleTouchIcon)
    })
  }



  // Cover image for sharing
  if (coverImage) {
    const coverImagePath = coverImage === true ? 'cover-image.png' : coverImage

    // Twitter cards
    metaTags.push({
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    })

    metaTags.push({
      hid: 'twitter:image',
      name: 'twitter:image',
      content: baseUrl + '/' + coverImagePath
    })

    metaTags.push({
      hid: 'twitter:image:alt',
      property: 'twitter:image:alt',
      content: longSiteTitle,
    })

    // Facebook (OpenGraph)
    metaTags.push({
      hid: 'og:image',
      property: 'og:image',
      content: baseUrl + '/' + coverImagePath
    })

    metaTags.push({
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: longSiteTitle
    })

  }



  // Web app manifest
  // FIXME: we should really generate the JSON file instead of manually configuring it
  if (manifest) {
    linkTags.push({
      rel: 'manifest',
      href: '/' + (manifest === true ? 'manifest.json' : manifest)
    })
  }



  // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#meta
  return {
    meta: {
      link: linkTags,
      meta: metaTags
    }
  }

}
