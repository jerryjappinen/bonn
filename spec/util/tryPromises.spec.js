import { describe, it, expect } from 'vitest'

import tryPromises from '../../src/util/tryPromises'
import wait from '../../src/util/wait'

const failingCallback = async () => {
  await wait(1)
  throw new Error('This error is intentional')
}

describe.concurrent('tryPromises', () => {
  it('should wait all asynchronously', async () => {
    const seconds = [1000, 2000]

    const startTime = new Date()
    await tryPromises(...seconds.map(wait))
    const endTime = new Date()

    // @ts-ignore
    const diff = endTime - startTime

    expect(Math.round((diff) / 1000)).toEqual(Math.max(...seconds) / 1000)
  })

  it('should go through with no error', async () => {
    await tryPromises(failingCallback())
  })

  it('should return undefined upon error', async () => {
    const results = await tryPromises(failingCallback())
    expect(results[0]).toBeUndefined()
  })
})
