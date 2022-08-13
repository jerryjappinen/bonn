import windowExists from './windowExists'

export default (urlOrElement) => {
  if (windowExists()) {
    // Check if URL or element is pointing to external domain
    const internalRegex = new RegExp(
      '^((((http:\\/\\/|https:\\/\\/)(www\\.)?)?' +
      window.location.hostname +
      ')|(localhost:\\d{4})|(\\/.*))(\\/.*)?$',
      ''
    )

    // Accept string or element
    let url = urlOrElement
    if (url.getAttribute) {
      url = url.getAttribute('href')
    }

    // Modify links if they're not internal
    if (internalRegex.test(url)) {
      return true
    }
  }

  return false
}
