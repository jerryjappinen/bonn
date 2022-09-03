import { describe, it, expect } from 'vitest'

import isSuffixed from '../../util/isSuffixed'

describe.concurrent('isSuffixed', () => {
  it('should detect', () => {
    expect(isSuffixed('foo/', '/')).toBeTruthy()
    expect(isSuffixed('foo//', '/')).toBeTruthy()
    expect(isSuffixed('foo///', '/')).toBeTruthy()
    expect(isSuffixed('///', '/')).toBeTruthy()
    expect(isSuffixed('/', '/')).toBeTruthy()
  })

  it('should not detect', () => {
    expect(isSuffixed('/', '')).toBeFalsy()
    expect(isSuffixed('foo')).toBeFalsy()
    expect(isSuffixed('', '')).toBeFalsy()
    expect(isSuffixed('')).toBeFalsy()
    expect(isSuffixed()).toBeFalsy()
    expect(isSuffixed()).toBeFalsy()
  })
})
