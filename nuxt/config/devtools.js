// https://github.com/nuxt/devtools?tab=readme-ov-file#module-options
export default (config) => {
  // Turn off
  if (config === false || config === null || config === 0) {
    return {
      devtools: {
        enabled: false
      }
    }
  }

  // Enable with defaults
  if (!config || config === true) {
    return {
      devtools: {
        enabled: true
      }
    }
  }

  // Assume Object passed
  return {
    devtools: config
  }
}
