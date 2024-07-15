const fs = require('node:fs')

const log = require('./log')

// Remove existing folder
// https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs
module.exports = function (path) {
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

  log('File cleared: ' + path)
}
