import csv from './csv'

// https://github.com/vanillaes/csv
export default (csvData, parseHeaders, optionsInput) => {
  const opts = optionsInput || {}
  const rows = csv.parse(csvData, opts)

  if (parseHeaders && rows.length) {
    const columnNames = rows[0]
    const objects = []

    // Turn rows from arrays to keyed maps
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      const keyedRow = {}

      row.forEach((value, j) => {
        keyedRow[columnNames[j]] = value
      })

      objects.push(keyedRow)
    }

    return objects
  }

  return rows
}
