import { describe, it, expect } from 'vitest'

import trimWhitespace from '../../utils/trimWhitespace'

// Test cases
// These will be tested at the start, end and in the middle of the string
const whitespaceStrings = {
  space: ' ',
  spaces: '    ',
  tab: '\t',
  tabAndSpace1: ' \t',
  tabAndSpace2: ' \t',
  tabAndSpace3: ' \t ',
  tabAndMultipleSpaces1: '    \t',
  tabAndMultipleSpaces2: '    \t',
  tabAndMultipleSpaces3: '    \t    ',
  tabAndMultipleSpacesAndTabs1: '    \t',
  tabAndMultipleSpacesAndTabs2: '    \t',
  tabAndMultipleSpacesAndTabs3: '    \t    ',
  newline: '\n',
  newlines: '\n\n\n'
}

describe.concurrent('trimWhitespace with trailing whitespace', () => {
  // Expected result is the same for all these test cases
  const expectedResult = 'Foooo'

  // Test this with each of the test cases provided above
  for (const key in whitespaceStrings) {
    it('should trim ' + key, () => {
      // Whitespace is at the end of string
      expect(trimWhitespace(expectedResult + whitespaceStrings[key])).toEqual(expectedResult)
    })
  }
})

describe.concurrent('Util trimWhitespace with leading whitespace', () => {
  // Expected result is the same for all these test cases
  const expectedResult = 'Foooo'

  // Test this with each of the test cases provided above
  for (const key in whitespaceStrings) {
    it('should trim ' + key, () => {
      // Whitespace is at the start of string
      expect(trimWhitespace(whitespaceStrings[key] + expectedResult)).toEqual(expectedResult)
    })
  }
})

describe.concurrent('Util trimWhitespace with excess whitespace', () => {
  // Expected result is the same for all these test cases
  const partOne = 'Foo'
  const partTwo = 'oo'
  const expectedResult = partOne + ' ' + partTwo

  // Test this with each of the test cases provided above
  for (const key in whitespaceStrings) {
    it('should trim ' + key, () => {
      // Whitespace is injected in the middle
      expect(trimWhitespace(partOne + whitespaceStrings[key] + partTwo)).toEqual(expectedResult)
    })
  }
})
