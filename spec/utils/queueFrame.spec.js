import { describe, it, expect } from 'vitest'

import queueFrame from '../../utils/queueFrame'
import wait from '../../utils/wait'

describe.concurrent('queueFrame', () => {
  it('should run asynchronously', async () => {
    let a = false

    queueFrame(() => {
      a = true
    })

    expect(a).toEqual(false)

    await wait(5)

    expect(a).toEqual(true)
  })

  it('can be canceled', async () => {
    let a = false

    const cancel = queueFrame(() => {
      a = true
    })

    cancel()

    await wait(5)

    expect(a).toEqual(false)
  })
})
