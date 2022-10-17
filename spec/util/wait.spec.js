import { describe, it, expect } from 'vitest'

import wait from '../../util/wait'

describe.concurrent('Util wait', () => {
  it('should wait for seconds', async () => {
    // jest.setTimeout(3000)

    const startTime = new Date()
    await wait(2000)
    const endTime = new Date()

    // @ts-ignore
    expect(Math.round((endTime - startTime) / 1000)).toEqual(2)
  })
})
