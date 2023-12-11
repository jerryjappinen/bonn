import { describe, it, expect } from 'vitest'

import isPrefixed from '../../utils/isPrefixed'

describe.concurrent('isPrefixed', () => {
  it('should detect', () => {
    expect(isPrefixed('/foo', '/')).toBeTruthy()
    expect(isPrefixed('//foo', '/')).toBeTruthy()
    expect(isPrefixed('///foo', '/')).toBeTruthy()
    expect(isPrefixed('///', '/')).toBeTruthy()
    expect(isPrefixed('/', '/')).toBeTruthy()
  })

  it('should not detect', () => {
    expect(isPrefixed('/', '')).toBeFalsy()
    expect(isPrefixed('foo')).toBeFalsy()
    expect(isPrefixed('', '')).toBeFalsy()
    expect(isPrefixed('')).toBeFalsy()
    expect(isPrefixed()).toBeFalsy()
    expect(isPrefixed()).toBeFalsy()
  })
})
