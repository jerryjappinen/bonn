import { describe, it, expect } from 'vitest'

// import isPlainObject from 'lodash-es/isPlainObject'

import sitemap from '../../../src/nuxt/config/sitemap'

describe.concurrent('sitemap config helper', () => {
  it('should not include base URL when not passed', () => {
    const { app } = sitemap()
    expect(app && app.baseURL).toBeFalsy()
  })

  // FIXME: baseURL seems to be broken in Nuxt currently
  // it('should include base URL when passed', () => {
  //   const { app } = sitemap({
  //     baseUrl: 'https://domain.com'
  //   })
  //   expect(app && app.baseURL).toBeTruthy()
  // })
})
