export default (optionsInput) => {
  const {
    favicon,
    faviconIco,
    appleTouchIcon,
    maskIcon,
    maskIconColor
  } = (optionsInput || {})

  // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#meta
  const head = {
    link: []
  }

  // Icons
  if (favicon) {
    const faviconPath = favicon === true ? 'favicon.svg' : favicon
    const faviconType = faviconPath.includes('.svg')
      ? 'svg+xml'
      : 'png'

    head.link.push({
      rel: 'icon',
      type: 'image/' + faviconType,
      href: '/' + faviconPath
    })
  }

  if (faviconIco) {
    head.link.push({
      rel: 'alternate icon',
      href: '/' + (faviconIco === true ? 'favicon.ico' : faviconIco)
    })
  }

  if (maskIcon) {
    head.link.push({
      rel: 'mask-icon',
      type: 'image/svg+xml',
      href: '/' + (maskIcon === true ? 'mask-icon.svg' : maskIcon),
      color: maskIconColor || '#000000'
    })
  }

  if (appleTouchIcon) {
    head.link.push({
      rel: 'apple-touch-icon',
      href: '/' + (appleTouchIcon === true ? 'apple-touch-icon.png' : appleTouchIcon)
    })
  }

  return head
}
