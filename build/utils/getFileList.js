const { globSync } = require('glob')

// const log = require('./log')

module.exports = function (dir, extensions) {
  return globSync(`${dir}*.${extensions || '*'}`)
}
