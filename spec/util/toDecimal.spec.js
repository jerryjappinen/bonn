import { describe, it, expect } from 'vitest'

import toDecimal from '../../util/toDecimal'

describe.concurrent('toDecimal', () => {
  it('works with integers', () => {
    expect(toDecimal(0)).toEqual('0.00')
    expect(toDecimal(2)).toEqual('2.00')
    expect(toDecimal(3)).toEqual('3.00')
  })

  it('works with short floats', () => {
    expect(toDecimal(0.0)).toEqual('0.00')
    expect(toDecimal(0.1)).toEqual('0.10')
    expect(toDecimal(2.0)).toEqual('2.00')
    expect(toDecimal(2.2)).toEqual('2.20')
    expect(toDecimal(3.3)).toEqual('3.30')
  })

  it('works with long floats', () => {
    expect(toDecimal(0.000)).toEqual('0.00')
    expect(toDecimal(0.111)).toEqual('0.11')
    expect(toDecimal(0.119)).toEqual('0.12')
    expect(toDecimal(2.222)).toEqual('2.22')
    expect(toDecimal(2.200)).toEqual('2.20')
  })

  it('works with negative floats', () => {
    expect(toDecimal(-0.0)).toEqual('0.00')
    expect(toDecimal(-0.000)).toEqual('0.00')

    expect(toDecimal(-0.1)).toEqual('-0.10')
    expect(toDecimal(-2.0)).toEqual('-2.00')
    expect(toDecimal(-2.2)).toEqual('-2.20')
    expect(toDecimal(-3.3)).toEqual('-3.30')
    expect(toDecimal(-0.111)).toEqual('-0.11')
    expect(toDecimal(-0.119)).toEqual('-0.12')
    expect(toDecimal(-2.222)).toEqual('-2.22')
    expect(toDecimal(-2.200)).toEqual('-2.20')
  })

  it('works with any number of decimal points', () => {
    expect(toDecimal(1, 3)).toEqual('1.000')
    expect(toDecimal(2.987654, 4)).toEqual('2.9877')
    expect(toDecimal(3.22, 0)).toEqual('3')
  })
})
