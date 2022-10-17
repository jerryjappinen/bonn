import { describe, it, expect } from 'vitest'

import isTest from '../../util/isTest'

describe.concurrent('isTest', () => {
  it('should work', () => {
    expect(isTest()).toEqual(true)
  })
})
