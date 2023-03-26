import { describe, it, expect } from 'vitest'

import isEmpty from 'lodash-es/isEmpty'

import robots from '../../../nuxt/config/robots'

describe.concurrent('robots config helper', () => {
  it('should include no routes', () => {
    const conf = robots()
    expect(isEmpty(conf.robots.routes)).toBeTruthy()
  })
})
