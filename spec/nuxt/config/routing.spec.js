import { describe, it, expect } from 'vitest'

// import isPlainObject from 'lodash-es/isPlainObject'

import routing from '../../../nuxt/config/routing'

describe.concurrent('routing config helper', () => {
  it('should not include base URL when not passed', () => {
    const { app } = routing()
    expect(app && app.baseURL).toBeFalsy()
  })

  it('should include base URL when passed', () => {
    const { app } = routing({
      baseUrl: 'https://domain.com'
    })
    expect(app && app.baseURL).toBeTruthy()
  })
})
