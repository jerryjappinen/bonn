import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json'
// import multi from '@rollup/plugin-multi-entry'
// import { nodeResolve } from '@rollup/plugin-node-resolve'

import files from './files'

const external = []

const plugins = [
  // nodeResolve({
  //   preferBuiltins: true
  // }),
  // multi(), // Combine multiple files into one js file
  commonjs(),
  json()
]

const getCjsConfig = (fileName) => {
  return {
    external,
    plugins,
    input: `${fileName}.js`,
    output: {
      // sourcemap: true,
      // dir: 'dist',
      format: 'cjs',
      // name: 'app',

      // Keep directory structure and files
      exports: 'named', // auto, default, named
      // preserveModules: true

      file: `dist/${fileName}.cjs`
    }
  }
}

// https://www.npmjs.com/package/rollup-plugin-copy
const getCopyDirConfig = (dir) => {
  return {
    src: `${dir}/**/*`,
    dest: `dist/${dir}`,
    flatten: false
  }
}

const getCopyFileConfig = (fileName) => {
  return {
    src: `${fileName}`,
    dest: 'dist/',
    flatten: false
  }
}

export default [
  ...files.cjs.map(getCjsConfig),

  {
    // Have to output something for plugin to be run
    input: './files.js',
    output: {
      format: 'cjs',
      exports: 'named',
      file: 'dist/files.cjs'
    },

    // Copying happens here
    plugins: [
      copy({
        targets: [
          ...files.copyDirs.map(getCopyDirConfig),
          ...files.copyFiles.map(getCopyFileConfig)
        ]
      })
    ]
  }
]
