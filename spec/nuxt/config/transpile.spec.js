import { describe, it, expect } from 'vitest'

import transpile from '../../../nuxt/config/transpile'

describe.concurrent('transpile config helper', () => {
  it('should add one arg', () => {
    expect(transpile('foo')).toEqual({
      build: {
        transpile: ['foo']
      }
    })
  })

  it('should add list of args', () => {
    expect(transpile('foo', 'bar')).toEqual({
      build: {
        transpile: ['foo', 'bar']
      }
    })
  })

  it('should add arrays', () => {
    expect(transpile(['foo', 'bar'], 'baz')).toEqual({
      build: {
        transpile: ['foo', 'bar', 'baz']
      }
    })
  })
})
