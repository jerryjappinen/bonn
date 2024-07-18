import { describe, it, expect } from 'vitest'

import getBasename from '../../utils/getBasename'

describe.concurrent('getBasename', () => {
  it('should split path', () => {
    expect(getBasename('foo')).toEqual('foo')
    expect(getBasename('foo.txt')).toEqual('foo.txt')
    expect(getBasename('foo/')).toEqual('foo')
    expect(getBasename('foo.txt/')).toEqual('foo.txt')

    expect(getBasename('/foo')).toEqual('foo')
    expect(getBasename('/foo.txt')).toEqual('foo.txt')
    expect(getBasename('/foo/')).toEqual('foo')
    expect(getBasename('/foo.txt/')).toEqual('foo.txt')

    expect(getBasename('jbjbj/foo')).toEqual('foo')
    expect(getBasename('jbjbj/foo.txt')).toEqual('foo.txt')
    expect(getBasename('jbjbj/foo/')).toEqual('foo')
    expect(getBasename('jbjbj/foo.txt/')).toEqual('foo.txt')
  })
})
