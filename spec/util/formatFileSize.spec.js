import { describe, it, expect } from 'vitest'

import formatFileSize from '../../src/util/formatFileSize'

describe.concurrent('formatFileSize', () => {
  it('should be 0 kB in empty', () => {
    expect(formatFileSize(0)).toEqual('0 kB')
  })

  it('should return bytes with under 100', () => {
    expect(formatFileSize(99)).toEqual('99 B')
  })

  it('should return bytes under 1000', () => {
    expect(formatFileSize(999)).toEqual('999 B')
  })

  it('should return kB at 1000', () => {
    expect(formatFileSize(1000)).toEqual('1 kB')
  })

  it('should be 256 kB with 256 * 1024', () => {
    expect(formatFileSize(256 * 1024)).toEqual('256 kB')
  })

  it('should be 999 kB with 999 * 1024', () => {
    expect(formatFileSize(999 * 1024)).toEqual('999 kB')
  })

  it('should be 1 MB with 1000 * 1024', () => {
    expect(formatFileSize(1000 * 1024)).toEqual('1 MB')
  })
})
