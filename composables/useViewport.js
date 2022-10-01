import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

import compact from 'lodash-es/compact'
import debounce from 'lodash-es/debounce'
import flattenDeep from 'lodash-es/flattenDeep'
import orderBy from 'lodash-es/orderBy'

import detectObtrusiveScrollbars from '../util/detectObtrusiveScrollbars'
import userPrefersDarkMode from '../util/userPrefersDarkMode'
import windowExists from '../util/windowExists'

// Scroll position or dimensions are updated at most once per this amount of ms
const debounceDelay = 10
const debounceOptions = {
  leading: true
}

export default (optionsInput) => {
  const options = optionsInput || {}

  const breakpointValues = ref([
    320,
    720,
    1280,
    1920
  ])

  const hasObtrusiveScrollbars = ref(false)
  const darkMode = ref(null)

  const width = ref(0)
  const height = ref(0)
  const scroll = ref(0)
  const scrollX = ref(0)

  const isScrollingDown = ref(false)
  const isScrollingUp = ref(false)

  let debouncedOnResize = null
  let debouncedOnScroll = null
  let darkModeMatchMediaObject = null

  // Computed

  const breakpoints = computed({
    get () {
      return breakpointValues
    },
    set (...values) {
      breakpointValues.value = orderBy(compact(flattenDeep(values)))
    }
  })

  const centerX = computed(() => {
    return width.value / 2
  })

  const centerY = computed(() => {
    return height.value / 2
  })

  const isScrolled = computed(() => {
    return scroll.value > 0
  })

  const isScrolledX = computed(() => {
    return scrollX.value > 0
  })

  const isLandscape = computed(() => {
    return width.value > height.value
  })

  const isPortrait = computed(() => {
    return !isLandscape.value
  })

  // Breakpoint indices
  // NOTE: user must match when they're exactly at a breakpoint

  const currentBreakpointRange = computed(() => {
    return [previousBreakpoint.value, nextBreakpoint.value]
  })

  const previousBreakpoint = computed(() => {
    for (let i = breakpoints.value.length - 1; i >= 0; i--) {
      if (width.value > breakpoints.value[i]) {
        // return breakpoints.value[i]
        return i
      }
    }
    return 0
  })

  const exactBreakpoint = computed(() => {
    for (let i = 0; i < breakpoints.value.length; i++) {
      if (width.value === breakpoints.value[i]) {
        // return breakpoints.value[i]
        return i
      }
    }
    return 0
  })

  // NOTE: we keep the exactBreakpoint as the inclusive upper bound
  const nextBreakpoint = computed(() => {
    if (exactBreakpoint.value) {
      return exactBreakpoint.value
    }

    for (let i = 0; i < breakpoints.value.length; i++) {
      if (width.value < breakpoints.value[i]) {
        // return breakpoints.value[i]
        return i
      }
    }
    return 0
  })

  // Helpers

  const getWidth = () => {
    return window.innerWidth
  }

  const getHeight = () => {
    return window.innerHeight
  }

  const getScrollX = () => {
    return (window.pageXOffset || window.document.scrollLeft || 0) - (window.document.clientLeft || 0)
  }

  const getScrollY = () => {
    return (window.pageYOffset || window.document.scrollTop || 0) - (window.document.clientTop || 0)
  }

  // Updaters

  // const onResizeStart = () => {
  //   if (!isResizing.value) {
  //     isResizing.value = true
  //   }
  // }

  // const onResizeEnd = () => {
  //   if (isResizing.value) {
  //     isResizing.value = false
  //   }
  // }

  const updateDarkMode = () => {
    darkMode.value = userPrefersDarkMode()
  }

  const updateDimensions = () => {
    width.value = getWidth()
    height.value = getHeight()

    // isResizing.value = false
  }

  const updateScrollValues = () => {
    scrollX.value = getScrollX()
    scroll.value = getScrollY()
  }

  // Life cycle

  // Update isScrolling
  watch(scroll, (newY, oldY) => {
    if (!isScrollingDown.value && newY > oldY) {
      isScrollingDown.value = true
      isScrollingUp.value = false
    } else if (!isScrollingUp.value && newY < oldY) {
      isScrollingDown.value = false
      isScrollingUp.value = true
    }
  })

  const init = () => {
    if (windowExists()) {
      updateDarkMode()
      updateDimensions()
      updateScrollValues()

      if (detectObtrusiveScrollbars()) {
        hasObtrusiveScrollbars.value = true
      }

      debouncedOnResize = debounce(updateDimensions, debounceDelay, debounceOptions)
      debouncedOnScroll = debounce(updateScrollValues, debounceDelay, debounceOptions)

      window.addEventListener('resize', debouncedOnResize)
      window.addEventListener('scroll', debouncedOnScroll)

      if (window.matchMedia) {
        darkModeMatchMediaObject = window.matchMedia('(prefers-color-scheme: dark)')
        darkModeMatchMediaObject.addEventListener('change', updateDarkMode)
      }
    }
  }

  const uninit = () => {
    if (windowExists()) {
      if (debouncedOnResize) {
        window.removeEventListener('resize', debouncedOnResize)
      }

      if (debouncedOnScroll) {
        window.removeEventListener('scroll', debouncedOnScroll)
      }

      if (darkModeMatchMediaObject) {
        darkModeMatchMediaObject.removeEventListener('change', updateDarkMode)
      }
    }
  }

  if (options.bind || options.bind === undefined) {
    onMounted(init)
    onUnmounted(uninit)
  }

  // API
  return {
    init,
    uninit,

    breakpoints,
    hasObtrusiveScrollbars,
    darkMode,
    width,
    height,
    scroll,
    scrollX,
    isScrollingDown,
    isScrollingUp,

    centerX,
    centerY,
    isScrolled,
    isScrolledX,
    isLandscape,
    isPortrait,
    currentBreakpointRange,
    previousBreakpoint,
    exactBreakpoint,
    nextBreakpoint
  }
}
