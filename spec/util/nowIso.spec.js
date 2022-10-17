import { describe, it, expect } from 'vitest'

import nowIso from '../../util/nowIso'

describe.concurrent('nowIso', () => {
  it('should be date', () => {
    expect(nowIso()).toBeTypeOf('string')
  })
})
