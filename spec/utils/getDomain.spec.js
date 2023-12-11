import { describe, it, expect } from 'vitest'

import getDomain from '../../utils/getDomain'

describe.concurrent('getDomain', () => {
  const params = '?foo=bar&bar=foo'

  it('should work', () => {
    expect(getDomain('ftp://www.foo.com')).toEqual('foo.com')
    expect(getDomain('https://www.foo.com')).toEqual('foo.com')
    expect(getDomain('http://www.foo.com')).toEqual('foo.com')
    expect(getDomain('www.foo.com/')).toEqual('foo.com')
    expect(getDomain('www.foo.com')).toEqual('foo.com')
    expect(getDomain('api.foo.com')).toEqual('api.foo.com')
    expect(getDomain('foo.com')).toEqual('foo.com')
    expect(getDomain('foo')).toEqual('foo')
    expect(getDomain(false)).toEqual(false)
    expect(getDomain(null)).toEqual(null)
    expect(getDomain()).toEqual(undefined)
  })

  it('should work with params', () => {
    expect(getDomain('ftp://www.foo.com' + '/' + params)).toEqual('foo.com')
    expect(getDomain('https://www.foo.com' + '/' + params)).toEqual('foo.com')
    expect(getDomain('http://www.foo.com' + '/' + params)).toEqual('foo.com')
    expect(getDomain('www.foo.com' + '/' + params)).toEqual('foo.com')
    expect(getDomain('api.foo.com' + '/' + params)).toEqual('api.foo.com')
    expect(getDomain('foo.com' + '/' + params)).toEqual('foo.com')
    expect(getDomain('foo' + '/' + params)).toEqual('foo')
  })
})
