// Behavioral base meta tags
export default (optionsInput) => {
  const {
    width,
    initialScale,
    themeColor
  } = optionsInput || {}

  const metaTags = [
    { charset: 'utf-8' },

    // Mobile
    {
      name: 'viewport',
      content: `width=${width || 'device-width'}, initial-scale=${initialScale || 1}`
    },

    // FIXME: make this adapt to theme color
    {
      hid: 'apple-mobile-web-app-status-bar-style',
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      hid: 'apple-mobile-web-app-capable',
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },

    // Meta data
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website'
    }
  ]

  // FIXME: should also generate manifest.json
  if (themeColor) {
    metaTags.push({ hid: 'theme-color', name: 'theme-color', content: themeColor })
  }

  return {
    meta: {
      meta: metaTags
    }
  }
}
