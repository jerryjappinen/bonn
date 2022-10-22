export default (optionsInput) => {
  const path = (optionsInput || {}).path || optionsInput

  return {
    meta: {
      link: [
        {
          rel: 'manifest',
          href: '/' + (path || 'manifest.json')
        }
      ]
    }
  }
}
