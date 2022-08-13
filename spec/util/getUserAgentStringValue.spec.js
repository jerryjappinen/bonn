import { describe, it, expect } from 'vitest'

import getUserAgentStringValue from '../../util/getUserAgentStringValue'

describe.concurrent('getUserAgentStringValue', () => {
  const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.456.789 Safari/537.36'

  it('should return null when no match', () => {
    expect(getUserAgentStringValue(ua, 'foo')).toEqual(null)
  })

  it('should return null when value is missing', () => {
    expect(getUserAgentStringValue(ua + ' foo', 'foo')).toEqual(null)
    expect(getUserAgentStringValue(ua + ' foo/', 'foo')).toEqual(null)
  })

  it('should return value from beginning', () => {
    expect(getUserAgentStringValue('foo/bar ' + ua, 'foo')).toEqual('bar')
  })

  it('should return value from end', () => {
    expect(getUserAgentStringValue(ua + ' foo/bar', 'foo')).toEqual('bar')
  })

  it('should include slashes', () => {
    expect(getUserAgentStringValue(ua + ' foo/bar/bar/bar', 'foo')).toEqual('bar/bar/bar')
  })
})
