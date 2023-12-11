import { describe, it, expect } from 'vitest'

import trimAllWhitespace from '../../utils/trimAllWhitespace'

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

describe.concurrent('trimAllWhitespace with trailing whitespace', () => {
  // Expected result is the same for all these test cases
  const expectedResult = 'Foooo'

  // Test this with each of the test cases provided above
  for (const key in whitespaceStrings) {
    it('should trim ' + key, () => {
      // Whitespace is at the end of string
      expect(
        trimAllWhitespace(
          whitespaceStrings[key] +
          '       ' +
          expectedResult +
          '       ' +
          expectedResult +
          '       ' +
          whitespaceStrings[key]
        )
      ).toEqual(expectedResult + expectedResult)
    })
  }
})
