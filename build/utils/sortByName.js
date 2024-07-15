module.exports = function (arr) {
  return []
    .concat(arr)
    .sort((a, b) => {
      return a.localeCompare(
        b,
        undefined,
        {
          sensitivity: 'base'
        }
      )
    })
}
