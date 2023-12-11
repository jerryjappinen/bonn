import { describe, it, expect } from 'vitest'

import nowIso from '../../utils/nowIso'

describe.concurrent('nowIso', () => {
  it('should be date', () => {
    expect(nowIso()).toBeTypeOf('string')
  })
})
