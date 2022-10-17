import { describe, it, expect } from 'vitest'

import prefixWith from '../../src/util/prefixWith'

describe.concurrent('prefixWith', () => {
  it('should add suffix', () => {
    expect(prefixWith('foo', '/')).toEqual('foo/')
    expect(prefixWith('', '/')).toEqual('/')
  })

  it('should not add duplicates', () => {
    expect(prefixWith('/foo', '/')).toEqual('/foo')
    expect(prefixWith('////foo', '/')).toEqual('/foo')
    expect(prefixWith('///', '/')).toEqual('/')
    expect(prefixWith('/', '/')).toEqual('/')
  })

  it('should keep duplicates', () => {
    expect(prefixWith('/foo', '/', true)).toEqual('/foo')
    expect(prefixWith('////foo', '/', true)).toEqual('////foo')
  })

  it('should handle missing argument', () => {
    expect(prefixWith('')).toEqual('')
  })
})
