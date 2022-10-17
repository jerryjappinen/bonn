import { describe, it, expect } from 'vitest'

import formatInitials from '../../src/util/formatInitials'

// Returns something like 2019-04-23T13:54:28.715Z
describe.concurrent('formatInitials', () => {
  it('should return string', () => {
    expect(typeof formatInitials('Foo Bar')).toEqual('string')
  })

  it('should return falsy as falsy', () => {
    expect(formatInitials(null)).toEqual(null)
    expect(formatInitials(false)).toEqual(false)
    expect(formatInitials(0)).toEqual(0)
  })

  it('should return number as string', () => {
    expect(formatInitials(1)).toEqual('1')
    expect(formatInitials(123)).toEqual('12')
  })

  it('should pick first letters', () => {
    expect(formatInitials('Foobar')).toEqual('FO')
  })

  it('should respect space', () => {
    expect(formatInitials('Foo Bar')).toEqual('FB')
  })

  it('should respect dash', () => {
    expect(formatInitials('foo-bar')).toEqual('FB')
  })

  it('should respect underline', () => {
    expect(formatInitials('foo-bar')).toEqual('FB')
  })
})
