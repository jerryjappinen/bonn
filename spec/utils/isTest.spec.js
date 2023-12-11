import { describe, it, expect } from 'vitest'

import isTest from '../../utils/isTest'

describe.concurrent('isTest', () => {
  it('should work', () => {
    expect(isTest()).toEqual(true)
  })
})
