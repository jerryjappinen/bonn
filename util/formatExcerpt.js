import toPlainText from './toPlainText'
import trimWhitespace from './trimWhitespace'

export default (string, cutoff) => {
  const formatted = toPlainText(string)

  // FIXME: find a sentence break close by
  // FIXME: find a word break close by
  // Default to line break
  let i = formatted.indexOf('\n')
  if (i < 0 || i > cutoff) {
    i = cutoff || 200
  }

  return trimWhitespace(formatted).slice(0, i).trim()
}
