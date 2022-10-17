import { describe, it, expect } from 'vitest'

import getRandomNumberGenerator from '../../src/util/getRandomNumberGenerator'

describe.concurrent('getRandomNumberGenerator', () => {
  it('should give random output on undefined', () => {
    expect(getRandomNumberGenerator()()).not.toEqual(getRandomNumberGenerator()())
    expect(getRandomNumberGenerator(undefined)()).not.toEqual(getRandomNumberGenerator(undefined)())
  })

  it('should give the same result with same number', () => {
    expect(getRandomNumberGenerator(0)()).toEqual(getRandomNumberGenerator(0)())
    expect(getRandomNumberGenerator(10)()).toEqual(getRandomNumberGenerator(10)())
  })

  it('should give the same result with same string', () => {
    expect(getRandomNumberGenerator('foo')()).toEqual(getRandomNumberGenerator('foo')())
  })
})
