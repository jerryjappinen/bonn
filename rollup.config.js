import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
// import multi from '@rollup/plugin-multi-entry'
// import { nodeResolve } from '@rollup/plugin-node-resolve'

import files from './files'

const plugins = [
  // nodeResolve({
  //   preferBuiltins: true
  // }),
  // multi(), // Combine multiple files into one js file
  commonjs(),
  json()
]

const external = [
  // 'window'
]

const getConfigObject = (fileName) => {
  return {
    input: `${fileName}`,
    plugins,
    external,
    output: {
      // sourcemap: true,
      // dir: 'dist',
      format: 'cjs',
      // name: 'app',

      // Keep directory structure and files
      exports: 'auto', // auto, default, named
      // preserveModules: true

      file: `dist/${fileName}.js`
    }
  }
}

export default files.map(getConfigObject)
