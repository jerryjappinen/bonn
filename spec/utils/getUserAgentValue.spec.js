import { describe, it, expect } from 'vitest'

import getUserAgentValue from '../../utils/getUserAgentValue'

describe.concurrent('getUserAgentValue', () => {
  const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.456.789 Safari/537.36'

  it('should return null when no match', () => {
    expect(getUserAgentValue(ua, 'foo')).toEqual(null)
  })

  it('should return null when value is missing', () => {
    expect(getUserAgentValue(ua + ' foo', 'foo')).toEqual(null)
    expect(getUserAgentValue(ua + ' foo/', 'foo')).toEqual(null)
  })

  it('should return value from beginning', () => {
    expect(getUserAgentValue('foo/bar ' + ua, 'foo')).toEqual('bar')
  })

  it('should return value from end', () => {
    expect(getUserAgentValue(ua + ' foo/bar', 'foo')).toEqual('bar')
  })

  it('should include slashes', () => {
    expect(getUserAgentValue(ua + ' foo/bar/bar/bar', 'foo')).toEqual('bar/bar/bar')
  })
})
