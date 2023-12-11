import { describe, it, expect } from 'vitest'

import removeSuffix from '../../utils/removeSuffix'

describe.concurrent('removeSuffix', () => {
  it('should remove', () => {
    expect(removeSuffix('foo/', '/')).toEqual('foo')
    expect(removeSuffix('foo//', '/')).toEqual('foo')
    expect(removeSuffix('foo///', '/')).toEqual('foo')
    expect(removeSuffix('///', '/')).toEqual('')
    expect(removeSuffix('/', '/')).toEqual('')
  })

  it('should not removeSuffix', () => {
    expect(removeSuffix('/foo', '/')).toEqual('/foo')
    expect(removeSuffix('foo', 'foo')).toEqual('')
    expect(removeSuffix('', '')).toEqual('')
    expect(removeSuffix('')).toEqual('')
  })
})
