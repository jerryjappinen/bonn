import { describe, it, expect } from 'vitest'

import formatExcerpt from '../../src/util/formatExcerpt'

describe.concurrent('formatExcerpt', () => {
  it('Leaves short string untouched', () => {
    expect(formatExcerpt('Foo bar', 10)).toEqual('Foo bar')
  })

  it('Trims long string', () => {
    expect(formatExcerpt('Foobar', 3)).toEqual('Foo')
  })

  it('Trims based on line break', () => {
    expect(formatExcerpt('Foo bar\nblah', 10)).toEqual('Foo bar')
  })

  it('Respects cutoff even with line breaks', () => {
    expect(formatExcerpt('Foo bar\nblah', 3)).toEqual('Foo')
  })

  it('Trims whitespace from beginning', () => {
    expect(formatExcerpt(' Foo', 4)).toEqual('Foo')
  })

  it('Trims whitespace from beginning even when trimming', () => {
    expect(formatExcerpt(' Foo', 3)).toEqual('Foo')
  })

  it('Trims whitespace from end', () => {
    expect(formatExcerpt('Foo ', 4)).toEqual('Foo')
  })

  it('Trims whitespace from end even when trimming', () => {
    expect(formatExcerpt('Foo ', 3)).toEqual('Foo')
  })
})
