import { describe, it, expect } from 'vitest'

import forEachSync from '../../util/forEachSync'
import wait from '../../util/wait'

describe.concurrent('forEachSync', () => {
  it('should wait all synchronously', async () => {
    // jest.setTimeout(12000)

    const durations = [
      1000,
      2000,
      3000,
      4000
    ]

    const sum = 10000

    const startTime = new Date()

    // Wait for each promise to resolve
    const responses = await forEachSync(durations, async (duration) => {
      await wait(duration)
      return duration
    })

    const endTime = new Date()
    // @ts-ignore
    const diff = endTime - startTime

    expect(Math.round((diff) / 1000)).toEqual(sum / 1000)

    expect(responses[0] = durations[0])
    expect(responses[1] = durations[1])
    expect(responses[2] = durations[2])
    expect(responses[3] = durations[3])
  })
})
