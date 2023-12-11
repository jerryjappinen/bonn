import { describe, it, expect } from 'vitest'

import removePrefix from '../../utils/removePrefix'

describe.concurrent('removePrefix', () => {
  it('should remove', () => {
    expect(removePrefix('/foo', '/')).toEqual('foo')
    expect(removePrefix('//foo', '/')).toEqual('foo')
    expect(removePrefix('///foo', '/')).toEqual('foo')
    expect(removePrefix('///', '/')).toEqual('')
    expect(removePrefix('/', '/')).toEqual('')
  })

  it('should not removePrefix', () => {
    expect(removePrefix('foo/', '/')).toEqual('foo/')
    expect(removePrefix('foo', 'foo')).toEqual('')
    expect(removePrefix('', '')).toEqual('')
    expect(removePrefix('')).toEqual('')
  })
})
