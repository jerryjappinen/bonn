import { describe, it, expect } from 'vitest'

import isValidDate from '../../src/util/isValidDate'

describe.concurrent('isValidDate', () => {
  it('Fails with invalid date', () => {
    expect(isValidDate(new Date(''))).toBeFalsy()
    expect(isValidDate(new Date('foo'))).toBeFalsy()
  })

  it('Fails with string date', () => {
    expect(isValidDate('Sun Dec 01 2019 13:28:12 GMT+0200 (Eastern European Standard Time)')).toBeFalsy()
  })

  it('Fails with falsy value', () => {
    expect(isValidDate(null)).toBeFalsy()
    expect(isValidDate(false)).toBeFalsy()
    expect(isValidDate()).toBeFalsy()
  })

  it('Passes with empty new Date()', () => {
    expect(isValidDate(new Date())).toBeTruthy()
  })

  it('Passes with new Date()', () => {
    expect(isValidDate(new Date(1234))).toBeTruthy()
  })
})
