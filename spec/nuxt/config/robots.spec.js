import { describe, it, expect } from 'vitest'

import isEmpty from 'lodash-es/isEmpty'

import robots from '../../../nuxt/config/robots'

const path = 'path/to/robots/conf.js'

// https://nuxt.com/modules/robots#configpath
const rule1 = { UserAgent: '*' }
const rule2 = { Disallow: '/' }
const rule3 = { BlankLine: true }
const rule4 = { Comment: 'Comment here' }
const rule5 = {
  UserAgent: '*',
  Disallow: ''
}

describe.concurrent('robots config helper', () => {
  it('should include no rules by default', () => {
    const conf = robots()
    expect(isEmpty(conf.robots.rules)).toBeTruthy()
  })

  it('should accept config path', () => {
    const conf = robots(path)

    expect(conf.robots.configPath).toEqual(path)
    expect(isEmpty(conf.robots.rules)).toBeTruthy()
  })

  it('should ignore rules when using configPath', () => {
    const conf = robots(path, rule1, rule2)
    expect(isEmpty(conf.robots.rules)).toBeTruthy()
  })

  it('should accept individual rule', () => {
    const conf = robots(rule5)
    expect(conf.robots.rules).toEqual([rule5])
  })

  it('should accept multiple rules', () => {
    const conf = robots(rule1, rule2, rule3, rule4)
    expect(conf.robots.rules).toEqual([rule1, rule2, rule3, rule4])
  })
})
