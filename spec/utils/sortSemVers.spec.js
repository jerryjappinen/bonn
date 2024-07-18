import { describe, it, expect } from 'vitest'

import shuffle from 'lodash-es/shuffle'

import sortSemVers from '../../utils/sortSemVers'

const numbers = [
  0, 1, 5, 7,
  11, 17,
  21, 44, 89,
  109
]

// Generate a bunch of version numbers
const versions = []
for (let i = 0; i < numbers.length; i++) {
  // const v = []

  // Compose versions for comparison
  for (let j = 0; j < numbers.length; j++) {
    for (let k = 0; k < numbers.length; k++) {
      // v.push(numbers[i], numbers[j], numbers[k])
      versions.push(numbers[i] + '.' + numbers[j] + '.' + numbers[k])
    }
  }
}

// Generate a bunch of shuffled orders
const shuffledVersionLists = []
for (let n = 0; n < 30; n++) {
  shuffledVersionLists.push(shuffle(versions))
}

describe.concurrent('sortSemVers', () => {
  it('should work', async () => {
    for (let i = 0; i < shuffledVersionLists.length; i++) {
      expect(sortSemVers(shuffledVersionLists[i])).toStrictEqual(versions)
    }
  })
})
