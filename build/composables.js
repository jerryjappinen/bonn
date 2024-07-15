const path = require('node:path')

// const log = require('./log')
const getFileList = require('./utils/getFileList')
const removeFile = require('./utils/removeFile')
const sortByName = require('./utils/sortByName')
const writeTextFile = require('./utils/writeTextFile')

// Conf
const sourceDir = path.resolve(__dirname, '../composables/') + '/'
const buildDir = path.resolve(__dirname, '../') + '/'

const indexFilePath = 'composables.js'
const sourceDirFromBuildDir = './composables/'

// Build logic
function getIds () {
  const fileList = getFileList(sourceDir, 'js')

  const ids = fileList.map((file) => {
    return file.replace(sourceDir, '').replace('.js', '')
  })

  return sortByName(ids)
}

function clearBuildDir () {
  removeFile(buildDir + indexFilePath)
}

function composeIndex (ids) {
  return ids.map((id) => {
    return `export { default as ${id} } from '${sourceDirFromBuildDir}${id}'`
  }).join('\n') + '\n'
}

// Build process
function build () {
  const ids = getIds()

  clearBuildDir()
  writeTextFile(buildDir + indexFilePath, composeIndex(ids))
}

// Actually run the build
build()
