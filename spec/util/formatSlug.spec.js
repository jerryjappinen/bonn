import { describe, it, expect } from 'vitest'

import formatSlug from '../../util/formatSlug'

describe.concurrent('formatSlug', () => {
  it('should slice to 64 chars', () => {
    expect(formatSlug('fooo'.repeat(16 * 10))).toEqual('fooo'.repeat(16))
  })

  it('lowercases uppercase', () => {
    expect(formatSlug('Fooo')).toEqual('fooo')
    expect(formatSlug('fooo')).toEqual('fooo')
    expect(formatSlug('FOOBar')).toEqual('foobar')
  })

  it('removes special characters', () => {
    expect(formatSlug('foo-bar')).toEqual('foobar')
    expect(formatSlug('foo_bar')).toEqual('foobar')
    expect(formatSlug('foo&#$^&(@*!$&(*$)++_#!bar')).toEqual('foobar')
  })

  it('retains numbers special characters', () => {
    expect(formatSlug('foo-1bar')).toEqual('foo1bar')
    expect(formatSlug('foo_2bar')).toEqual('foo2bar')
    expect(formatSlug('foo3bar')).toEqual('foo3bar')
  })

  it('stringifies numbers', () => {
    expect(formatSlug(212)).toEqual('212')
    expect(formatSlug(-212)).toEqual('212')
  })
})
