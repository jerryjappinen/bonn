import { describe, it, expect } from 'vitest'

import isArray from 'lodash-es/isArray'
import isPlainObject from 'lodash-es/isPlainObject'

import csvToJson from '../../utils/csvToJson'

const testString = `foo,bar,blah
row2,row2,row2`

const testStringWithHeaders = `column1,column2,column3
${testString}`

describe.concurrent('csvToJson', () => {
  const testJson = csvToJson(testString)
  const testJsonWithHeaders = csvToJson(testStringWithHeaders, true)

  it('should return array', () => {
    expect(isArray(testJson)).toBeTruthy()
    expect(isArray(testJsonWithHeaders)).toBeTruthy()
  })

  it('array should have the correct amount of rows', () => {
    expect(testJson.length).toEqual(2)
    expect(testJsonWithHeaders.length).toEqual(2)
  })

  it('should return arrays when not using headers', () => {
    expect(isArray(testJson[0])).toBeTruthy()
  })

  it('should return objects when using headers', () => {
    expect(isPlainObject(testJsonWithHeaders[0])).toBeTruthy()
  })
})
