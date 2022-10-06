import flatten from 'lodash-es/flatten'

import whitespaceCharacters from './whitespaceCharacters'

// https://stackoverflow.com/questions/26156292/trim-specific-character-from-a-string
export default (str, ...charactersInput) => {
  let start = 0
  let end = str.length

  const characters = charactersInput.length
    ? flatten(charactersInput)
    : whitespaceCharacters

  while (start < end && characters.indexOf(str[start]) >= 0) {
    ++start
  }

  while (end > start && characters.indexOf(str[end - 1]) >= 0) {
    --end
  }

  return (start > 0 || end < str.length) ? str.substring(start, end) : str
}
