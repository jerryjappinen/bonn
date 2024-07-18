// https://stackoverflow.com/questions/40201533/sort-version-dotted-number-strings-in-javascript
export default (arr) => {
  arr = arr.sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true })
  })

  return arr
}
