import isString from 'lodash-es/isString'
import omit from 'lodash-es/omit'

import svgLoader from 'vite-svg-loader'

import svgoConfig from './svgoConfig'

// The desired configuration format is a bit funky
// We convert into the final formatting here
const convertPluginsConfig = (conf) => {
  const svgoPlugins = []
  for (const pluginName in conf) {
    svgoPlugins.push({
      name: pluginName,
      params: conf[pluginName]
    })
  }

  return svgoPlugins
}

// https://github.com/svg/svgo
// https://www.npmjs.com/package/vite-svg-loader
export default (optionsInput) => {
  let config = {
    ...svgoConfig
  }

  if (optionsInput) {
    // Allow passing currentColor as string
    const normalizedOptionsInput = isString(optionsInput)
      ? { currentColor: optionsInput }
      : optionsInput

    // Allow passing currentColor on top level of options input
    if (normalizedOptionsInput.currentColor) {
      config.convertColors.currentColor = normalizedOptionsInput.currentColor
    }

    config = {
      ...config,
      ...omit(normalizedOptionsInput, ['currentColor'])
    }
  }

  return {
    vite: {
      plugins: [
        svgLoader({
          svgoConfig: {
            // multipass: true,
            plugins: convertPluginsConfig(config)
          }
        })
      ]
    }
  }
}
