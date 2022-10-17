import flatten from 'lodash-es/flatten'

import whitespaceCharacters from './whitespaceCharacters'

// https://stackoverflow.com/questions/26156292/trim-specific-character-from-a-string
export default (str, ...charactersInput) => {
  let start = 0
  let end = str.length

  const characters = charactersInput.length
    ? flatten(charactersInput)
    : whitespaceCharacters

  while (start < end && characters.includes(str[start])) {
    ++start
  }

  while (end > start && characters.includes(str[end - 1])) {
    --end
  }

  return (start > 0 || end < str.length) ? str.substring(start, end) : str
}
