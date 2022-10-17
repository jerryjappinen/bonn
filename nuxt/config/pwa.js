// import compact from 'lodash-es/compact'
// import flatten from 'lodash-es/flatten'

// Add manifest.json and PWA functionality
// https://github.com/kevinmarrec/nuxt-pwa-module
// https://pwa.nuxtjs.org/
export default (optionsInput) => {
  const {
    icon,
    maskable,

    title,
    shortTitle,
    description,

    startUrl,
    rtl,
    lang,

    backgroundColor,
    themeColor,

    // fullscreen, standalone, minimal-ui, browser
    // https://developer.mozilla.org/en-US/docs/Web/Manifest/display
    display,

    // workbox (https://pwa.nuxtjs.org/workbox)
    offline
  } = (optionsInput || {})

  // NOTE: the scope of this module is quite large
  // Would be better to use each module individually in various helpers
  const conf = {
    modules: [
      '@kevinmarrec/nuxt-pwa'
    ],

    pwa: {
      // https://pwa.nuxtjs.org/manifest
      manifest: {
        name: title,
        shortName: shortTitle,
        description,
        start_url: startUrl,
        display: (display || 'minimal-ui'),
        background_color: backgroundColor,
        theme_color: themeColor,
        dir: rtl ? 'rtl' : 'ltr',
        lang
      },

      // https://pwa.nuxtjs.org/meta
      meta: false,

      // https://pwa.nuxtjs.org/workbox
      workbox: offline ? {} : false
    }
  }

  // FIXME: move this to assets?
  // How to use the icon module without the other modules?
  if (icon) {
    conf.pwa.icon = {
      fileName: '/' + (icon === true ? 'apple-touch-icon.png' : icon),
      purpose: (maskable || maskable === undefined) ? 'maskable' : 'any'
    }
  } else {
    conf.pwa.icon = false
  }

  return conf
}
