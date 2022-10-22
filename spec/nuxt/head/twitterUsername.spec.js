import filter from 'lodash-es/filter'

import { describe, it, expect } from 'vitest'

import twitterUsername from '../../../nuxt/head/twitterUsername'

describe.concurrent('twitterUsername Nuxt head helper', () => {
  it('should not add tags when empty', () => {
    expect((twitterUsername().meta || []).length).toEqual(0)
  })

  it('should add site meta tag', () => {
    const head = twitterUsername('my-username')

    expect(filter(head.meta, ({ name, content }) => {
      return name === 'twitter:site' && content === '@my-username'
    }).length).toBeTruthy()
  })

  it('should not duplicate `@` sign', () => {
    const head = twitterUsername('@my-username')

    expect(filter(head.meta, ({ name, content }) => {
      return name === 'twitter:site' && content === '@my-username'
    }).length).toBeTruthy()
  })

  it('should add creator meta tag', () => {
    const head = twitterUsername({
      username: 'my-username',
      creator: true
    })

    expect(filter(head.meta, ({ name, content }) => {
      return name === 'twitter:creator' && content === '@my-username'
    }).length).toBeTruthy()
  })
})
