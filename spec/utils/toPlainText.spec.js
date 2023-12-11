import { describe, it, expect } from 'vitest'

import toPlainText from '../../utils/toPlainText'

describe.concurrent('toPlainText', () => {
  it('Removes inline HTML', () => {
    expect(toPlainText('Foo <em>bar</em>')).toEqual('Foo bar')
  })

  it('Removes inline Markdown', () => {
    expect(toPlainText('Foo __bar__')).toEqual('Foo bar')
  })

  it('Removes Markdown headings', () => {
    expect(toPlainText('# Foo')).toEqual('Foo')
  })

  // it('Removes excess line breaks', () => {
  //   expect(toPlainText('Foo\n\n\n\n\nBar')).toEqual('Foo\n\nBar')
  // })
})
