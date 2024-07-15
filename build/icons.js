const path = require('node:path')

// const log = require('./log')
const getFileList = require('./utils/getFileList')
const readFile = require('./utils/readFile')
const sortByName = require('./utils/sortByName')
const writeTextFile = require('./utils/writeTextFile')

// Conf
const sourceDir = path.resolve(__dirname, '../icons/') + '/'
const buildDir = path.resolve(__dirname, '../') + '/'

const iconIdsFilePath = 'iconIds.js'
const iconSheetFilePath = 'iconSheet.js'

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

const iconIds = `export default [
  ${ids.map(id => `'${id}'`).join(',\n  ')}
]` + '\n'

const iconSheet = `export default {
  ${ids.map(id => `${id}: \`${readFile(sourceDir + id + '.svg').trim()}\``).join(',\n  ')}
}` + '\n'

writeTextFile(buildDir + iconIdsFilePath, iconIds)
writeTextFile(buildDir + iconSheetFilePath, iconSheet)
