// Viewport adjustments (especially on mobile)
export default (optionsInput) => {
  const {
    width,
    initialScale,
    appleStatusBarStyle,
    webAppCapable
  } = (optionsInput || {})

  const head = {
    meta: [

      {
        name: 'viewport',
        content: `width=${width || 'device-width'}, initial-scale=${initialScale || 1}`
      },

      // `default` || `black-translucent` || `black`
      // https://medium.com/appscope/changing-the-ios-status-bar-of-your-progressive-web-app-9fc8fbe8e6ab
      {
        hid: 'apple-mobile-web-app-status-bar-style',
        name: 'apple-mobile-web-app-status-bar-style',
        content: appleStatusBarStyle || 'black-translucent'
      }
    ]
  }

  // FIXME: this should be combined with manifest.json behavior
  if (webAppCapable) {
    head.meta.push({
      hid: 'apple-mobile-web-app-capable',
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    })
  }

  return head
}
