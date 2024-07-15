const path = require('node:path')
const fs = require('node:fs')
const { globSync } = require('glob')

const iconsDir = path.resolve(__dirname, '../icons/') + '/'
const buildDir = path.resolve(__dirname, '../') + '/'

const iconIdsFilePath = 'iconIds.js'
const indexFilePath = 'icons.js'
const iconsDirFromBuildDir = './icons/'

function l (...args) {
  console.log(...args)
}

// Remove existing folder
// https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs
function removeFile (path) {
  fs.rmSync(
    path,
    {
      recursive: true,
      force: true
    },
    err => {
      if (err) {
        throw err
      }
    }
  )

  l('File cleared: ' + path)
}

function clearBuildDir () {
  removeFile(buildDir + iconIdsFilePath)
  removeFile(buildDir + indexFilePath)
}

function getIconIds () {
  const fileList = globSync(`${iconsDir}*.svg`)

  const ids = fileList.map((file) => {
    return file.replace(iconsDir, '').replace('.svg', '')
  })

  ids.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

  return ids
}

function writeTextFile (fullPath, content) {
  fs.writeFileSync(fullPath, content)
  console.log(`File saved: ${fullPath}`)
}

function composeIconIds (iconIds) {
  return `export default [
  ${iconIds.map(id => `'${id}'`).join(',\n  ')}
]
`
}

function composeIndex (iconIds) {
  return iconIds.map(id => `export { default as ${id} } from '${iconsDirFromBuildDir}${id}.js'`).join('\n') + '\n'
}

// Build process
function build () {
  const iconIds = getIconIds()

  clearBuildDir()
  writeTextFile(buildDir + iconIdsFilePath, composeIconIds(iconIds))
  writeTextFile(buildDir + indexFilePath, composeIndex(iconIds))
}

// Actually run the build
build()
