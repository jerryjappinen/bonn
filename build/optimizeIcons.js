// https://github.com/svg/svgo?tab=readme-ov-file#api-usage
const {
  // loadConfig,
  optimize
} = require('svgo')

const path = require('node:path')

const getFileList = require('./utils/getFileList')
const readFile = require('./utils/readFile')
const writeTextFile = require('./utils/writeTextFile')

// const config = await loadConfig()

const sourceDir = path.resolve(__dirname, '../icons/') + '/'
const filePaths = getFileList(sourceDir, 'svg')

filePaths.forEach((filePath) => {
  const svgString = readFile(filePath)
  const optimized = optimize(svgString)

  writeTextFile(filePath, optimized.data)
})
