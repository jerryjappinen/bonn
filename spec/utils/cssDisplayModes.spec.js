import { describe, it, expect } from 'vitest'

import isArray from 'lodash-es/isArray'

import cssDisplayModes from '../../utils/cssDisplayModes'

// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode
describe.concurrent('cssDisplayModes', () => {
  it('Is non-empty array', () => {
    expect(cssDisplayModes).toBeTruthy()
    expect(isArray(cssDisplayModes)).toBeTruthy()
    expect(cssDisplayModes.length === 6).toBeTruthy()
  })
})
