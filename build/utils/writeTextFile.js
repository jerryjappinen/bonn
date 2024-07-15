const fs = require('node:fs')

const log = require('./log')

module.exports = function (fullPath, content) {
  fs.writeFileSync(fullPath, content)

  log(`File saved: ${fullPath}`)
}
