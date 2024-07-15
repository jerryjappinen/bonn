const path = require('node:path')

// const log = require('./log')
const getFileList = require('./utils/getFileList')
const removeFile = require('./utils/removeFile')
const sortByName = require('./utils/sortByName')
const writeTextFile = require('./utils/writeTextFile')

const dirs = [
  'composables',
  'icons',
  'utils'
]

// Build logic
function getFilenames (sourceDir) {
  const fileList = getFileList(sourceDir, '{svg,js}')

  const ids = fileList.map((file) => {
    return file.replace(sourceDir, '')
  })

  return sortByName(ids)
}

function composeIndex (sourceDirFromBuildDir, filenames) {
  return filenames.map((filename) => {
    return `export { default as ${filename.replace('.js', '').replace('.svg', '')} } from '${sourceDirFromBuildDir}${filename}'`
  }).join('\n') + '\n'
}

// Build process
function build () {
  dirs.forEach((dir) => {
    const sourceDir = path.resolve(__dirname, `../${dir}/`) + '/'
    const buildDir = path.resolve(__dirname, '../') + '/'

    const indexFilePath = `${dir}.js`
    const sourceDirFromBuildDir = `./${dir}/`

    const filenames = getFilenames(sourceDir)

    removeFile(buildDir + indexFilePath)
    writeTextFile(buildDir + indexFilePath, composeIndex(sourceDirFromBuildDir, filenames))
  })
}

// Actually run the build
build()
