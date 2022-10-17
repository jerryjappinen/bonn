import { describe, it, expect } from 'vitest'

import now from '../../util/now'

describe.concurrent('now', () => {
  it('should be date', () => {
    expect(now()).toBeInstanceOf(Date)
  })
})
