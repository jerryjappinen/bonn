// Behavioral base meta tags
export default (optionsInput) => {
  const themeColor = (optionsInput || {}).themeColor || optionsInput

  const head = {
    meta: []
  }

  // NOTE: should also be set in pwa/manifest
  if (themeColor) {
    head.meta.push({
      hid: 'theme-color',
      name: 'theme-color',
      content: themeColor
    })
  }

  return head
}
