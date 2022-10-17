import { describe, it, expect } from 'vitest'

import trimAny from '../../src/util/trimAny'

describe.concurrent('trimAny', () => {
  it('should trim whitespace by default', () => {
    expect(trimAny(`

    foo     bar

    `)).toEqual('foo     bar')
  })

  it('should trim specified character', () => {
    expect(trimAny('  foo__', '_')).toEqual('  foo')
    expect(trimAny('__foo  ', '_')).toEqual('foo  ')
    expect(trimAny('__foo__', '_')).toEqual('foo')
  })

  it('should trim specified characters', () => {
    const chars = ['_', '-', '/', '\\']

    expect(trimAny('  foo__', ...chars)).toEqual('  foo')
    expect(trimAny('  foo__', chars)).toEqual('  foo')

    expect(trimAny('/ foo_-', ...chars)).toEqual(' foo')
    expect(trimAny('/ foo_-', chars)).toEqual(' foo')
  })
})
