import createStyleElement from './createStyleElement'
import windowExists from './windowExists'

// Detection test
const testClassname = 'obtrusive-scrollbar-test-123'

const detectionTestCss = `.${testClassname} {
  overscroll-behavior: contain;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  scrollbar-width: thin;
}

.${testClassname}::-webkit-scrollbar-thumb:vertical {
  min-height: 1rem;
}

.${testClassname}::-webkit-scrollbar-thumb:horizontal {
  min-width: 1rem;
}`

// Check body if scrollbars use up screen real estate
// https://www.filamentgroup.com/lab/scrollbars/
// https://codepen.io/zachleat/pen/oNvprpX
export default () => {
  if (windowExists()) {
    // Make a test element
    const parent = window.document.createElement('div')
    parent.setAttribute('style', 'width:30px;height:30px;')

    // NOTE: consumer repo must get CSS
    parent.classList.add(testClassname)
    const styleElement = createStyleElement(detectionTestCss)

    const child = window.document.createElement('div')
    child.setAttribute('style', 'width:100%;height:40px')
    parent.appendChild(child)
    window.document.body.appendChild(parent)

    // Measure the child element, if it is not
    // 30px wide the scrollbars are obtrusive.
    const scrollbarWidth = 30 - parent.firstChild.clientWidth

    // Clean up
    window.document.body.removeChild(parent)
    window.document.head.removeChild(styleElement)

    if (scrollbarWidth > 0) {
      return true
    }
  }

  return false
}
