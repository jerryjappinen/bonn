import { describe, it, expect } from 'vitest'

import mergeConfigs from '../../../nuxt/config/mergeConfigs'

describe.concurrent('mergeConfigs', () => {
  it('should return object with no args', () => {
    expect(mergeConfigs()).toEqual({})
  })

  it('should return object with one arg', () => {
    expect(mergeConfigs({ foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('should return combined object with two args', () => {
    expect(mergeConfigs({ foo: 1 }, { bar: 2 })).toEqual({ foo: 1, bar: 2 })
  })

  it('should combined arrays recursively', () => {
    expect(mergeConfigs({ foo: { bar: [1] } }, { foo: { bar: [2] } })).toEqual({ foo: { bar: [1, 2] } })
  })
})
