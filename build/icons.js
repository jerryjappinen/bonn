const path = require('node:path')

// const log = require('./log')
const getFileList = require('./utils/getFileList')
const removeFile = require('./utils/removeFile')
const sortByName = require('./utils/sortByName')
const writeTextFile = require('./utils/writeTextFile')

// Conf
const sourceDir = path.resolve(__dirname, '../icons/') + '/'
const buildDir = path.resolve(__dirname, '../') + '/'

const iconIdsFilePath = 'iconIds.js'
const indexFilePath = 'icons.js'
const sourceDirFromBuildDir = './icons/'

// Build logic
function getIds () {
  const fileList = getFileList(sourceDir, 'svg')

  const ids = fileList.map((file) => {
    return file.replace(sourceDir, '').replace('.svg', '')
  })

  return sortByName(ids)
}

function clearBuildDir () {
  removeFile(buildDir + iconIdsFilePath)
  removeFile(buildDir + indexFilePath)
}

function composeIconIds (iconIds) {
  return `export default [
  ${iconIds.map(id => `'${id}'`).join(',\n  ')}
]` + '\n'
}

function composeIndex (iconIds) {
  return iconIds.map((id) => {
    return `export { default as ${id} } from '${sourceDirFromBuildDir}${id}.svg'`
  }).join('\n') + '\n'
}

// Build process
function build () {
  const ids = getIds()

  clearBuildDir()
  writeTextFile(buildDir + iconIdsFilePath, composeIconIds(ids))
  writeTextFile(buildDir + indexFilePath, composeIndex(ids))
}

// Actually run the build
build()
