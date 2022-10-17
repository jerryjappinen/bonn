import { describe, it, expect } from 'vitest'

import isEmail from '../../util/isEmail'

describe.concurrent('isEmail', () => {
  it('Fails with short TLD', () => {
    expect(isEmail('foo@bar.i')).toBeFalsy()
  })

  it('Fails with no TLD', () => {
    expect(isEmail('foo@bar')).toBeFalsy()
    expect(isEmail('foo@bar.')).toBeFalsy()
  })

  it('Fails with TLD only', () => {
    expect(isEmail('foo@.io')).toBeFalsy()
  })

  it('Fails with domain only', () => {
    expect(isEmail('bar.com')).toBeFalsy()
  })

  it('Fails with no username', () => {
    expect(isEmail('@bar.com')).toBeFalsy()
  })

  it('Fails with no domain', () => {
    expect(isEmail('foo@')).toBeFalsy()
  })

  it('Fails with no username', () => {
    expect(isEmail('@foobar.com')).toBeFalsy()
  })

  it('Passes with normal email', () => {
    expect(isEmail('foo@bar.io')).toBeTruthy()
  })

  it('Passes with short values', () => {
    expect(isEmail('f@b.io')).toBeTruthy()
  })
})
