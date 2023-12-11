import { describe, it, expect } from 'vitest'

import getCurrentTimestamp from '../../utils/getCurrentTimestamp'

// Returns something like 2019-04-23T13:54:28.715Z
describe.concurrent('getCurrentTimestamp', () => {
  it('should return string', () => {
    expect(typeof getCurrentTimestamp()).toEqual('string')
  })

  it('should include time separator', () => {
    expect(getCurrentTimestamp().indexOf('T')).toEqual(10)
  })

  it('should include zulu', () => {
    expect(getCurrentTimestamp().indexOf('Z')).toEqual(23)
  })
})
