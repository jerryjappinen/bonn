export default (optionsInput) => {
  const {
    favicon,
    faviconIco,
    appleTouchIcon,
    maskIcon,
    maskIconColor,
    manifest
  } = (optionsInput || {})

  const linkTags = []

  // Icons
  if (favicon) {
    const faviconPath = favicon === true ? 'favicon.svg' : favicon
    const faviconType = faviconPath.includes('.svg')
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
      color: maskIconColor || '#000000'
    })
  }

  if (appleTouchIcon) {
    linkTags.push({
      rel: 'apple-touch-icon',
      href: '/' + (appleTouchIcon === true ? 'apple-touch-icon.png' : appleTouchIcon)
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
      link: linkTags
    }
  }
}
