import filter from 'lodash-es/filter'

import { describe, it, expect } from 'vitest'

import facebookAppId from '../../../nuxt/head/facebookAppId'

describe.concurrent('facebookAppId Nuxt head helper', () => {
  it('should not add tags when empty', () => {
    expect((facebookAppId().meta || []).length).toEqual(0)
  })

  it('should add meta tag', () => {
    const head = facebookAppId('my-app-id')

    expect(filter(head.meta, ({ property, content }) => {
      return property === 'fb:app_id' && content === 'my-app-id'
    }).length).toBeTruthy()
  })
})
