import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json'
// import multi from '@rollup/plugin-multi-entry'
// import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'

import files from './files'

const srcDir = './src/'
const distDir = './'
const cjsFileExtension = 'js'

const external = []

const plugins = [
  // nodeResolve({
  //   preferBuiltins: true
  // }),
  // multi(), // Combine multiple files into one js file
  commonjs(),
  json(),

  // https://rollup-plugin-vue.vuejs.org/options.html
  vue({
    template: {
      isProduction: true
    }
  })
]

const getCjsConfig = (fileName) => {
  return {
    external,
    plugins,
    input: `${srcDir}${fileName}.js`,
    output: {
      // sourcemap: true,
      // dir: 'dist',
      format: 'cjs',
      // name: 'app',

      // Keep directory structure and files
      exports: 'named', // auto, default, named
      // preserveModules: true

      file: `${distDir}${fileName}.${cjsFileExtension}`
    }
  }
}

// https://www.npmjs.com/package/rollup-plugin-copy
const getCopyDirConfig = (dir) => {
  return {
    src: `${srcDir}${dir}/**/*`,
    dest: `${distDir}${dir}`,
    flatten: false
  }
}

const getCopyFileConfig = (fileName) => {
  return {
    src: `${srcDir}${fileName}`,
    dest: distDir,
    flatten: false
  }
}

export default [
  ...files.cjs.map(getCjsConfig),

  {
    // Have to output something for plugin to be run
    input: `${srcDir}files.js`,
    output: {
      format: 'cjs',
      exports: 'named',
      file: `${distDir}/__files.cjs`
    },

    // Copying happens here
    plugins: [
      copy({
        targets: [
          ...(files.copyDirs || []).map(getCopyDirConfig),
          ...(files.copyFiles || []).map(getCopyFileConfig)
        ]
      })
    ]
  }
]
