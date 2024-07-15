const fs = require('node:fs')

// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
module.exports = function (path) {
  try {
    const data = fs.readFileSync(path, 'utf8')
    return data
  } catch (err) {
    console.error(err)
  }

  return ''
}
