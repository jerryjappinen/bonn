import { describe, it, expect } from 'vitest'

import isDev from '../../src/util/isDev'
import isTest from '../../src/util/isTest'

describe.concurrent('isDev', () => {
  it('should be true in test env', () => {
    expect(isDev()).toEqual(true)
  })

  it('should not be true in test env if isTest() is used', () => {
    expect(isDev() && !isTest()).toEqual(false)
  })
})
