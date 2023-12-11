// import path from 'path'
import isPlainObject from 'lodash-es/isPlainObject'

import suffixWith from '../../../utils/suffixWith'

// import { fileURLToPath } from 'node:url'

// Link a package to a local source dir when running a bonn project
const envVarNames = {
  bonn: 'ALIAS_BONN'
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default (pathsInput) => {
  const paths = isPlainObject(pathsInput) ? pathsInput : {}
  const aliases = {}

  // Resolve path entered by user in their nuxt config correctly
  // This module is running from node_modules/bonn/nuxt.config/bonn/index.js
  // const joinPaths = (...paths) => {
  //   return paths.join('/')
  // }

  // Add an alias for each path that was set
  for (const packageName in envVarNames) {
    const packagePath = paths[packageName] || process.env[envVarNames[packageName]]
    if (packagePath) {
      // aliases[packageName] = path.resolve(__dirname, packagePath)
      aliases[packageName] = suffixWith(packagePath, '/')
    }
  }

  return aliases
}
