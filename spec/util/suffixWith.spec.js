import { describe, it, expect } from 'vitest'

import suffixWith from '../../util/suffixWith'

describe.concurrent('suffixWith', () => {
  it('should add suffix', () => {
    expect(suffixWith('foo', '/')).toEqual('foo/')
    expect(suffixWith('', '/')).toEqual('/')
  })

  it('should not add duplicates', () => {
    expect(suffixWith('foo/', '/')).toEqual('foo/')
    expect(suffixWith('foo////', '/')).toEqual('foo/')
    expect(suffixWith('///', '/')).toEqual('/')
    expect(suffixWith('/', '/')).toEqual('/')
  })

  it('should keep duplicates', () => {
    expect(suffixWith('foo/', '/', true)).toEqual('foo/')
    expect(suffixWith('foo////', '/', true)).toEqual('foo////')
  })

  it('should handle missing argument', () => {
    expect(suffixWith('')).toEqual('')
  })
})
