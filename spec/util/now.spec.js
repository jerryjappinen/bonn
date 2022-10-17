import { describe, it, expect } from 'vitest'

import now from '../../src/util/now'

describe.concurrent('now', () => {
  it('should be date', () => {
    expect(now()).toBeInstanceOf(Date)
  })
})
