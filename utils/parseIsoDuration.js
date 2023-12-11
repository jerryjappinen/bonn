const regex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/

export default (string) => {
  const matches = string.match(regex)
  const sign = matches[1] === undefined ? '+' : '-'

  return {
    sign,
    signMultiplier: sign === '-' ? -1 : 1,
    years: matches[2] === undefined ? 0 : parseInt(matches[2]),
    months: matches[3] === undefined ? 0 : parseInt(matches[3]),
    weeks: matches[4] === undefined ? 0 : parseInt(matches[4]),
    days: matches[5] === undefined ? 0 : parseInt(matches[5]),
    hours: matches[6] === undefined ? 0 : parseInt(matches[6]),
    minutes: matches[7] === undefined ? 0 : parseInt(matches[7]),
    seconds: matches[8] === undefined ? 0 : parseInt(matches[8])
  }
}
