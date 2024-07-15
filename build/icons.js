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

// Build logic
function getIds () {
  const fileList = getFileList(sourceDir, 'svg')

  const ids = fileList.map((file) => {
    return file.replace(sourceDir, '').replace('.svg', '')
  })

  return sortByName(ids)
}

// Build process
const ids = getIds()

removeFile(buildDir + iconIdsFilePath)

const fileContent = `export default [
${ids.map(id => `'${id}'`).join(',\n  ')}
]` + '\n'

writeTextFile(buildDir + iconIdsFilePath, fileContent)
