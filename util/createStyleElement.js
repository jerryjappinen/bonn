import windowExists from './windowExists'

export default (css) => {
  if (windowExists()) {
    const head = window.document.head || window.document.getElementsByTagName('head')[0]
    const styleElement = window.document.createElement('style')

    head.appendChild(styleElement)

    styleElement.type = 'text/css'
    styleElement.appendChild(window.document.createTextNode(css))

    return styleElement
  }

  return null
}
