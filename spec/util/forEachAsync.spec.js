import { describe, it, expect } from 'vitest'

import forEachAsync from '../../src/util/forEachAsync'
import wait from '../../src/util/wait'

describe.concurrent('forEachAsync', () => {
  it('should wait all asynchronously', async () => {
    // jest.setTimeout(6000)

    const durations = [
      1000,
      2000,
      3000,
      4000
    ]

    const startTime = new Date()

    // Wait for each promise to resolve
    await forEachAsync(durations, wait)

    const endTime = new Date()
    // @ts-ignore
    const diff = endTime - startTime

    expect(Math.round((diff) / 1000)).toEqual(Math.max(...durations) / 1000)
  })

  it('should return object as object', async () => {
    // jest.setTimeout(6000)

    const {
      one,
      four
    } = await forEachAsync({
      one: 1000,
      four: 4000
    }, wait)

    expect(one).toEqual(true)
    expect(four).toEqual(true)
  })
})
