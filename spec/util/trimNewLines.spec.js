import { describe, it, expect } from 'vitest'

import trimNewLines from '../../util/trimNewLines'

// Test cases
// These will be tested at the start, end and in the middle of the string
const newlineStrings = {
  whitespace: ' ',
  newline: '\n',
  newlines2: '\n\n',
  newlines3: '\n\n\n'
}

describe.concurrent('trimNewLines', () => {
  it('should not touch string with no new lines', () => {
    expect(trimNewLines('Foo')).toEqual('Foo')
  })

  it('should keep leading whitespace', () => {
    expect(trimNewLines('  foo')).toEqual('  foo')
  })

  it('should keep trailing whitespace', () => {
    expect(trimNewLines('foo  ')).toEqual('foo  ')
  })
})

describe.concurrent('Util trimNewLines with trailing new line', () => {
  // Expected result is the same for all these test cases
  const expectedResult = 'Foooo'

  // Test this with each of the test cases provided above
  for (const key in newlineStrings) {
    it('should trim ' + key, () => {
      // New line is at the end of string
      expect(trimNewLines(expectedResult + newlineStrings[key]))
        .toEqual(expectedResult + ' ')
    })
  }
})

describe.concurrent('Util trimNewLines with leading new line', () => {
  // Expected result is the same for all these test cases
  const expectedResult = 'Foooo'

  // Test this with each of the test cases provided above
  for (const key in newlineStrings) {
    it('should trim ' + key, () => {
      // New line is at the start of string
      expect(trimNewLines(newlineStrings[key] + expectedResult))
        .toEqual(' ' + expectedResult)
    })
  }
})

describe.concurrent('Util trimNewLines with excess new line', () => {
  // Expected result is the same for all these test cases
  const partOne = 'Foo'
  const partTwo = 'oo'
  const expectedResult = partOne + ' ' + partTwo

  // Test this with each of the test cases provided above
  for (const key in newlineStrings) {
    it('should trim ' + key, () => {
      // New line is injected in the middle
      expect(trimNewLines(partOne + newlineStrings[key] + partTwo))
        .toEqual(expectedResult)
    })
  }
})
